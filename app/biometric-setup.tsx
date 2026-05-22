import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  authenticateWithBiometrics,
  markBiometricPromptShown,
  setBiometricsEnabled,
} from '@/lib/biometrics';

export default function BiometricSetupScreen() {
  const router = useRouter();

  const dismiss = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);

  const handleEnable = useCallback(async () => {
    const success = await authenticateWithBiometrics();
    if (!success) return;
    await setBiometricsEnabled(true);
    await markBiometricPromptShown();
    dismiss();
  }, [dismiss]);

  const handleSkip = useCallback(async () => {
    await markBiometricPromptShown();
    dismiss();
  }, [dismiss]);

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={56} color="#1D3557" />
          </View>
          <ThemedText type="title" style={styles.heading}>
            Enable Biometric Login
          </ThemedText>
          <ThemedText style={styles.description}>
            Use Face ID or Touch ID to quickly and securely access Inside UCL
            without signing in each time.
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleEnable}
            style={({ pressed }) => [
              styles.enableButton,
              pressed && styles.enableButtonPressed,
            ]}
          >
            <ThemedText style={styles.enableLabel}>Enable</ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={handleSkip}
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
          >
            <ThemedText type="link" style={styles.skipLabel}>
              Not now
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(29, 53, 87, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heading: {
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  enableButton: {
    backgroundColor: '#1D3557',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  enableButtonPressed: {
    opacity: 0.8,
  },
  enableLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonPressed: {
    opacity: 0.6,
  },
  skipLabel: {
    fontSize: 16,
  },
});
