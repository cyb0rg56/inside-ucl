import {
  exchangeCodeAsync,
  ResponseType,
  useAuthRequest,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/lib/auth/auth-context';
import {
  assertEntraConfigured,
  ENTRA_CLIENT_ID,
  ENTRA_DISCOVERY,
  ENTRA_REDIRECT_URI,
  ENTRA_SCOPES,
} from '@/lib/auth/config';

// Required so the auth session completes cleanly when the browser redirects
// back to the app on web / Expo Go.
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const { completeSignIn, error: contextError, clearError } = useAuth();
  const [isExchanging, setIsExchanging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: ENTRA_CLIENT_ID,
      scopes: ENTRA_SCOPES,
      redirectUri: ENTRA_REDIRECT_URI,
      responseType: ResponseType.Code,
      usePKCE: true,
      extraParams: {
        // Force account picker so users on shared devices can switch identities.
        prompt: 'select_account',
      },
    },
    ENTRA_DISCOVERY
  );

  // Exchange the auth code for tokens whenever the browser flow resolves.
  useEffect(() => {
    if (!response) return;

    if (response.type === 'error') {
      const err = response.error;
      const message =
        err?.description ?? (err as { message?: string } | null)?.message ?? 'Sign-in failed.';
      setLocalError(message);
      return;
    }
    if (response.type !== 'success') {
      return;
    }
    const code = response.params.code;
    const codeVerifier = request?.codeVerifier;
    if (!code || !codeVerifier) {
      setLocalError('Sign-in response was missing required parameters.');
      return;
    }

    let cancelled = false;
    (async () => {
      setIsExchanging(true);
      setLocalError(null);
      try {
        const tokenResponse = await exchangeCodeAsync(
          {
            clientId: ENTRA_CLIENT_ID,
            code,
            redirectUri: ENTRA_REDIRECT_URI,
            scopes: ENTRA_SCOPES,
            extraParams: { code_verifier: codeVerifier },
          },
          { tokenEndpoint: ENTRA_DISCOVERY.tokenEndpoint }
        );
        if (cancelled) return;
        await completeSignIn(tokenResponse);
      } catch (err) {
        if (cancelled) return;
        setLocalError(err instanceof Error ? err.message : 'Sign-in failed.');
      } finally {
        if (!cancelled) {
          setIsExchanging(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [response, request, completeSignIn]);

  const onPressSignIn = useCallback(async () => {
    try {
      assertEntraConfigured();
      setLocalError(null);
      clearError();
      await promptAsync();
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Sign-in failed.');
    }
  }, [clearError, promptAsync]);

  const displayedError = localError ?? contextError?.message ?? null;
  const isBusy = isExchanging || !request;

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.brand}>
            <View style={styles.logoBadge}>
              <ThemedText style={styles.logoText}>UCL</ThemedText>
            </View>
            <ThemedText type="title" style={styles.heading}>
              Inside UCL
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign in with your UCL account to access your details, payslips
              and more.
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Sign in with Microsoft"
              onPress={onPressSignIn}
              disabled={isBusy}
              style={({ pressed }) => [
                styles.signInButton,
                pressed && styles.signInButtonPressed,
                isBusy && styles.signInButtonDisabled,
              ]}
            >
              {isExchanging ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <MicrosoftLogo />
                  <ThemedText style={styles.signInLabel}>
                    Sign in with Microsoft
                  </ThemedText>
                </>
              )}
            </Pressable>

            {displayedError ? (
              <ThemedText style={styles.error} accessibilityRole="alert">
                {displayedError}
              </ThemedText>
            ) : null}
          </View>

          <ThemedText style={styles.footnote}>
            By signing in you agree to UCL&apos;s acceptable use policy.
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function MicrosoftLogo() {
  return (
    <View style={styles.msLogo}>
      <View style={[styles.msTile, { backgroundColor: '#F25022' }]} />
      <View style={[styles.msTile, { backgroundColor: '#7FBA00' }]} />
      <View style={[styles.msTile, { backgroundColor: '#00A4EF' }]} />
      <View style={[styles.msTile, { backgroundColor: '#FFB900' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 48,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  brand: {
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 22,
    backgroundColor: '#0a7ea4',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0a7ea4',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 6,
  },
  logoText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heading: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    maxWidth: 320,
  },
  actions: {
    gap: 16,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#2F2F2F',
    paddingVertical: 14,
    borderRadius: 12,
    minHeight: 52,
  },
  signInButtonPressed: {
    opacity: 0.85,
  },
  signInButtonDisabled: {
    opacity: 0.6,
  },
  signInLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  msLogo: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
  },
  msTile: {
    width: 9,
    height: 9,
  },
  error: {
    color: '#B91C1C',
    textAlign: 'center',
  },
  footnote: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
  },
});
