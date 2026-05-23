import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { UCL_BLUE } from '@/constants/theme';

type BiometricLockOverlayProps = {
  onRetry: () => void;
};

export function BiometricLockOverlay({ onRetry }: BiometricLockOverlayProps) {
  return (
    <View style={styles.root} pointerEvents="auto">
      <ThemedView style={styles.background}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Ionicons name="lock-closed" size={56} color={UCL_BLUE} />
            </View>
            <ThemedText type="title" style={styles.heading}>
              Inside UCL is locked
            </ThemedText>
            <ThemedText style={styles.description}>
              Authenticate with Face ID, Touch ID or your device passcode to
              continue.
            </ThemedText>
          </View>

          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Unlock with biometrics"
              onPress={onRetry}
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
            >
              <Ionicons name="finger-print" size={20} color="#fff" />
              <ThemedText style={styles.buttonLabel}>Unlock</ThemedText>
            </Pressable>
          </View>
        </SafeAreaView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    zIndex: 9999,
    elevation: 9999,
  },
  background: {
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
    alignItems: 'center',
    backgroundColor: 'rgba(13, 104, 207, 0.1)',
    borderRadius: 48,
    height: 96,
    justifyContent: 'center',
    marginBottom: 24,
    width: 96,
  },
  heading: {
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
    textAlign: 'center',
  },
  actions: {
    gap: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: UCL_BLUE,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingVertical: 16,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
