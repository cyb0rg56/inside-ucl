import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type ScreenLoaderProps = {
  label?: string;
  color?: string;
};

export function ScreenLoader({ label, color }: ScreenLoaderProps) {
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const themeIndicatorColor = useThemeColor({}, 'primary');
  const indicatorColor = color ?? themeIndicatorColor;
  const labelColor = useThemeColor({}, 'textSecondary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size="large" color={indicatorColor} />
      {label ? <Text style={[styles.label, { color: labelColor }]}>{label}</Text> : null}
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
  label: {
    fontSize: 16,
  },
});
