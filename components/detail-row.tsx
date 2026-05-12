import { StyleSheet, Text, View } from 'react-native';

type DetailRowProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

export function DetailRow({ label, value, isLast = false }: DetailRowProps) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value} selectable>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomColor: '#E5E7EB',
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
    color: '#6B7280',
  },
  value: {
    fontSize: 16,
    color: '#111827',
  },
});
