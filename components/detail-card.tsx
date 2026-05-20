import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type DetailCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function DetailCard({ children, style }: DetailCardProps) {
  const backgroundColor = useThemeColor({}, 'surface');

  return <View style={[styles.card, { backgroundColor }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
});
