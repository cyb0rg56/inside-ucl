import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import 'react-native-reanimated';

import { BiometricLockOverlay } from '@/components/biometric-lock-overlay';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/lib/auth/auth-context';
import {
  authenticateWithBiometrics,
  hasBiometricPromptBeenShown,
  isBiometricsAvailable,
  isBiometricsEnabled,
} from '@/lib/biometrics';

// Ensure the auth session completes on cold-start deep links before any
// screen mounts. Must run at module-load time.
WebBrowser.maybeCompleteAuthSession();

export const unstable_settings = {
  anchor: '(tabs)',
};

// Keep the splash up until we know whether the user has a stored session.
void SplashScreen.preventAutoHideAsync();

type ProtectedRouteState = {
  /** True when the lock overlay should block the rest of the app. */
  showLockOverlay: boolean;
  /** Re-trigger the native biometric prompt (used by the overlay's button). */
  retryBiometrics: () => void;
};

function useProtectedRoute(): ProtectedRouteState {
  const { isInitializing, isAuthenticated } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();

  const [biometricLocked, setBiometricLocked] = useState(true);
  // null = we haven't checked yet, true/false = we know whether biometrics
  // are enabled. Gating the splash on this lets us avoid flashing the lock
  // overlay (or the index page) on cold start.
  const [biometricsRequired, setBiometricsRequired] = useState<boolean | null>(
    null
  );

  // Refs so the AppState listener (registered once) always sees the latest
  // values without re-subscribing on every render.
  const biometricLockedRef = useRef(biometricLocked);
  biometricLockedRef.current = biometricLocked;
  const biometricsRequiredRef = useRef<boolean | null>(null);
  const promptInFlight = useRef(false);

  const enrollmentPrompted = useRef(false);
  const initialUnlockHandled = useRef(false);
  const hasRunInitialCheck = useRef(false);

  const ensureUnlocked = useCallback(async () => {
    if (promptInFlight.current) return;
    promptInFlight.current = true;
    try {
      const enabled = await isBiometricsEnabled();
      biometricsRequiredRef.current = enabled;
      setBiometricsRequired(enabled);
      if (!enabled) {
        setBiometricLocked(false);
        return;
      }
      const success = await authenticateWithBiometrics();
      if (success) {
        setBiometricLocked(false);
      }
    } finally {
      promptInFlight.current = false;
    }
  }, []);

  // When the user is not authenticated we never gate behind biometrics —
  // the login screen has to be reachable.
  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) {
      setBiometricLocked(false);
      biometricsRequiredRef.current = null;
      setBiometricsRequired(null);
      hasRunInitialCheck.current = false;
      initialUnlockHandled.current = false;
    }
  }, [isInitializing, isAuthenticated]);

  // Run the biometric gate once when auth init completes and we have a user.
  useEffect(() => {
    if (isInitializing || !isAuthenticated) return;
    if (hasRunInitialCheck.current) return;
    hasRunInitialCheck.current = true;
    void ensureUnlocked();
  }, [ensureUnlocked, isAuthenticated, isInitializing]);

  // Re-lock on background and re-prompt on foreground. We listen for
  // 'background' only (not 'inactive') so the transient inactive state that
  // iOS reports while the native biometric prompt is on screen doesn't cause
  // a re-lock loop.
  useEffect(() => {
    if (!isAuthenticated) return;
    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (next === 'background') {
        if (biometricsRequiredRef.current) {
          setBiometricLocked(true);
        }
      } else if (next === 'active') {
        if (biometricLockedRef.current) {
          void ensureUnlocked();
        }
      }
    });
    return () => sub.remove();
  }, [ensureUnlocked, isAuthenticated]);

  // Route to login / home based on auth, but only once we're past the
  // biometric gate so we never push an authenticated screen behind the lock.
  useEffect(() => {
    if (isInitializing || biometricLocked) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/login' as never);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [biometricLocked, isAuthenticated, isInitializing, router, segments]);

  // After the first successful biometric unlock of this app launch, send
  // the user to the app's main index.
  useEffect(() => {
    if (biometricLocked || !isAuthenticated) return;
    if (initialUnlockHandled.current) return;
    initialUnlockHandled.current = true;
    const inAuthGroup = segments[0] === '(auth)';
    if (!inAuthGroup) {
      router.replace('/');
    }
  }, [biometricLocked, isAuthenticated, router, segments]);

  // First-run enrollment prompt for users who haven't opted in yet.
  useEffect(() => {
    if (isInitializing || biometricLocked || !isAuthenticated) return;
    if (enrollmentPrompted.current) return;

    const inAuthGroup = segments[0] === '(auth)';
    if (inAuthGroup) return;

    enrollmentPrompted.current = true;

    (async () => {
      const [available, alreadyEnabled, alreadyPrompted] = await Promise.all([
        isBiometricsAvailable(),
        isBiometricsEnabled(),
        hasBiometricPromptBeenShown(),
      ]);
      if (available && !alreadyEnabled && !alreadyPrompted) {
        setTimeout(() => router.push('/biometric-setup'), 500);
      }
    })();
  }, [biometricLocked, isAuthenticated, isInitializing, router, segments]);

  // Hide the splash once we have enough information to render the correct
  // first frame: either we're unauthenticated (login), or we've finished the
  // biometrics check and either the overlay or the index will paint.
  useEffect(() => {
    if (isInitializing) return;
    if (isAuthenticated && biometricsRequired === null) return;
    void SplashScreen.hideAsync();
  }, [isInitializing, isAuthenticated, biometricsRequired]);

  return {
    showLockOverlay:
      !isInitializing &&
      isAuthenticated &&
      biometricsRequired === true &&
      biometricLocked,
    retryBiometrics: () => {
      void ensureUnlocked();
    },
  };
}

function RootNavigator() {
  const { showLockOverlay, retryBiometrics } = useProtectedRoute();

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
        <Stack.Screen name="biometric-setup" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      {showLockOverlay ? (
        <BiometricLockOverlay onRetry={retryBiometrics} />
      ) : null}
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
