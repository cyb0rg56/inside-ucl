import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as WebBrowser from 'expo-web-browser';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/lib/auth/auth-context';

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

  useEffect(() => {
    if (isInitializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      // Typed routes don't expose group-prefixed paths; the login screen
      // lives at app/(auth)/login.tsx which Expo Router resolves correctly.
      router.replace('/login' as never);
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/');
    }
  }, [isAuthenticated, isInitializing, router, segments]);

  useEffect(() => {
    if (!isInitializing) {
      void SplashScreen.hideAsync();
    }
  }, [isInitializing]);
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
