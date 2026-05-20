import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

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
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const titleColor = useThemeColor({}, 'text');
  const messageColor = useThemeColor({}, 'danger');
  const retryButtonColor = useThemeColor({}, 'primary');
  const retryButtonPressedColor = useThemeColor({}, 'primaryPressed');
  const retryButtonTextColor = useThemeColor({}, 'onPrimary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
      {message ? <Text style={[styles.message, { color: messageColor }]}>{message}</Text> : null}
      {onRetry ? (
        <Pressable
          style={({ pressed }) => [
            styles.retryButton,
            { backgroundColor: pressed ? retryButtonPressedColor : retryButtonColor },
          ]}
          onPress={onRetry}
          android_ripple={{ color: retryButtonPressedColor }}
        >
          <Text style={[styles.retryButtonText, { color: retryButtonTextColor }]}>{retryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
  },
  retryButton: {
    marginTop: 6,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  retryButtonText: {
    fontWeight: '600',
  },
});
