import {
  refreshAsync,
  type TokenResponse,
} from 'expo-auth-session';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

import { setAccessTokenProvider } from '../api';
import {
  ENTRA_CLIENT_ID,
  ENTRA_DISCOVERY,
  ENTRA_REDIRECT_URI,
  ENTRA_SCOPES,
} from './config';
import { decodeIdToken, type EntraIdTokenClaims } from './jwt';
import {
  clearSession,
  loadSession,
  saveSession,
  type StoredAuthSession,
} from './token-store';

/** Treat tokens as expired this many ms before their actual expiry. */
const EXPIRY_LEEWAY_MS = 60_000;

export type AuthUser = {
  id: string;
  name?: string;
  email?: string;
  tenantId?: string;
  claims: EntraIdTokenClaims;
};

export type AuthState = {
  /** True while we are restoring a session from secure storage. */
  isInitializing: boolean;
  /** True when we have a non-expired access token (or one we can refresh). */
  isAuthenticated: boolean;
  /** Profile parsed from the most recent ID token, if any. */
  user: AuthUser | null;
  /** Last sign-in / refresh error, if any. */
  error: Error | null;
};

export type AuthContextValue = AuthState & {
  /**
   * Persist a fresh token response from the login screen. Returns the
   * derived user profile, if the ID token contained recognisable claims.
   */
  completeSignIn: (tokenResponse: TokenResponse) => Promise<AuthUser | null>;
  /**
   * Returns a valid access token, refreshing silently if the current one is
   * within the expiry leeway. Returns `null` when the user is signed out or
   * the refresh failed (in which case the session is cleared).
   */
  getAccessToken: () => Promise<string | null>;
  /** Clear the local session and reset auth state. */
  signOut: () => Promise<void>;
  /** Reset the last error (e.g. after the user dismisses an error banner). */
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toAuthUser(idToken: string | undefined): AuthUser | null {
  if (!idToken) return null;
  const claims = decodeIdToken(idToken);
  if (!claims) return null;
  const id = claims.oid ?? claims.sub;
  if (!id) return null;
  return {
    id,
    name: claims.name,
    email: claims.email ?? claims.preferred_username,
    tenantId: claims.tid,
    claims,
  };
}

function isExpired(session: StoredAuthSession): boolean {
  return Date.now() >= session.expiresAt - EXPIRY_LEEWAY_MS;
}

function sessionFromTokenResponse(tokenResponse: TokenResponse): StoredAuthSession {
  const issuedAtSec = tokenResponse.issuedAt ?? Math.floor(Date.now() / 1000);
  const expiresInSec = tokenResponse.expiresIn ?? 3600;
  return {
    accessToken: tokenResponse.accessToken,
    refreshToken: tokenResponse.refreshToken,
    idToken: tokenResponse.idToken,
    expiresAt: (issuedAtSec + expiresInSec) * 1000,
    scope: tokenResponse.scope,
    tokenType: tokenResponse.tokenType,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<StoredAuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Coalesce concurrent refresh calls so we only ever have one in flight.
  const refreshInFlight = useRef<Promise<StoredAuthSession | null> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const restored = await loadSession();
        if (cancelled) return;
        if (restored) {
          setSession(restored);
          setUser(toAuthUser(restored.idToken));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback(async (next: StoredAuthSession) => {
    await saveSession(next);
    setSession(next);
    setUser(toAuthUser(next.idToken));
  }, []);

  const clearLocal = useCallback(async () => {
    await clearSession();
    setSession(null);
    setUser(null);
  }, []);

  const refreshTokens = useCallback(
    async (currentRefreshToken: string): Promise<StoredAuthSession | null> => {
      if (refreshInFlight.current) {
        return refreshInFlight.current;
      }
      const promise = (async () => {
        try {
          const response = await refreshAsync(
            {
              clientId: ENTRA_CLIENT_ID,
              refreshToken: currentRefreshToken,
              scopes: ENTRA_SCOPES,
            },
            { tokenEndpoint: ENTRA_DISCOVERY.tokenEndpoint }
          );
          const next = sessionFromTokenResponse(response);
          // Entra ID may not echo the refresh token; keep the previous one.
          if (!next.refreshToken) {
            next.refreshToken = currentRefreshToken;
          }
          await persist(next);
          return next;
        } catch (err) {
          await clearLocal();
          setError(err instanceof Error ? err : new Error(String(err)));
          return null;
        } finally {
          refreshInFlight.current = null;
        }
      })();
      refreshInFlight.current = promise;
      return promise;
    },
    [clearLocal, persist]
  );

  const getAccessToken = useCallback(async (): Promise<string | null> => {
    if (!session) return null;
    if (!isExpired(session)) return session.accessToken;
    if (!session.refreshToken) {
      await clearLocal();
      return null;
    }
    const next = await refreshTokens(session.refreshToken);
    return next?.accessToken ?? null;
  }, [clearLocal, refreshTokens, session]);

  // Make the latest token resolver available to `apiFetch` so module-level
  // callers can attach the Bearer header without consuming the React context.
  useEffect(() => {
    setAccessTokenProvider(getAccessToken);
    return () => setAccessTokenProvider(null);
  }, [getAccessToken]);

  const completeSignIn = useCallback(
    async (tokenResponse: TokenResponse): Promise<AuthUser | null> => {
      const next = sessionFromTokenResponse(tokenResponse);
      await persist(next);
      setError(null);
      return toAuthUser(next.idToken);
    },
    [persist]
  );

  const signOut = useCallback(async () => {
    await clearLocal();
    setError(null);
  }, [clearLocal]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated =
      !!session && (!isExpired(session) || !!session.refreshToken);
    return {
      isInitializing,
      isAuthenticated,
      user,
      error,
      completeSignIn,
      getAccessToken,
      signOut,
      clearError,
    };
  }, [
    clearError,
    completeSignIn,
    error,
    getAccessToken,
    isInitializing,
    session,
    signOut,
    user,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside <AuthProvider>.');
  }
  return ctx;
}

export { ENTRA_CLIENT_ID, ENTRA_DISCOVERY, ENTRA_REDIRECT_URI, ENTRA_SCOPES };
