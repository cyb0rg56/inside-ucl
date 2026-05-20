import { StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type DetailRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

export function DetailRow({ label, value, isLast = false }: DetailRowProps) {
  const borderColor = useThemeColor({}, 'border');
  const labelColor = useThemeColor({}, 'textSecondary');
  const valueColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.row, { borderBottomColor: borderColor }, isLast && styles.rowLast]}>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
      <Text style={[styles.value, { color: valueColor }]} selectable>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 4,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 13,
  },
  value: {
    fontSize: 16,
  },
});
