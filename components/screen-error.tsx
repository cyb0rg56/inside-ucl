import { Pressable, StyleSheet, Text, View } from 'react-native';

type ScreenErrorProps = {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
};

export function ScreenError({
  title = 'Something went wrong',
  message,
  retryLabel = 'Try again',
  onRetry,
}: ScreenErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {onRetry ? (
        <Pressable
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
          onPress={onRetry}
          android_ripple={{ color: '#1D4ED8' }}
        >
          <Text style={styles.retryButtonText}>{retryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    color: '#B91C1C',
  },
  retryButton: {
    marginTop: 6,
    borderRadius: 8,
    backgroundColor: '#2563EB',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  retryButtonPressed: {
    backgroundColor: '#1D4ED8',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
