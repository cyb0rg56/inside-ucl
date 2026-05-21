import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/lib/auth/auth-context';
import { authenticateWithBiometrics, isBiometricsEnabled } from '@/lib/biometrics';

// Ensure the auth session completes on cold-start deep links before any
// screen mounts. Must run at module-load time.
WebBrowser.maybeCompleteAuthSession();

export const unstable_settings = {
  anchor: '(tabs)',
};

// Keep the splash up until we know whether the user has a stored session.
void SplashScreen.preventAutoHideAsync();

function useProtectedRoute() {
  const { isInitializing, isAuthenticated } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();
  const [biometricLocked, setBiometricLocked] = useState(true);
  const biometricChecked = useRef(false);

  // Biometric gate: runs once on cold start when authenticated.
  useEffect(() => {
    if (isInitializing || !isAuthenticated || biometricChecked.current) return;
    biometricChecked.current = true;

    (async () => {
      const enabled = await isBiometricsEnabled();
      if (enabled) {
        const success = await authenticateWithBiometrics();
        if (!success) {
          // Keep locked — user can retry by reopening the app.
          return;
        }
      }
      setBiometricLocked(false);
    })();
  }, [isInitializing, isAuthenticated]);

  // If biometrics not applicable, unlock immediately.
  useEffect(() => {
    if (isInitializing) return;
    if (!isAuthenticated) {
      setBiometricLocked(false);
      return;
    }
  }, [isInitializing, isAuthenticated]);

  useEffect(() => {
    if (isInitializing || biometricLocked) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/login' as never);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [isAuthenticated, isInitializing, biometricLocked, router, segments]);

  useEffect(() => {
    if (!isInitializing && !biometricLocked) {
      void SplashScreen.hideAsync();
    }
  }, [isInitializing, biometricLocked]);
}

function RootNavigator() {
  useProtectedRoute();

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
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
