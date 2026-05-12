import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type ScreenLoaderProps = {
  label?: string;
  color?: string;
};

export function ScreenLoader({ label, color = '#2563EB' }: ScreenLoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
      {label ? <Text style={styles.label}>{label}</Text> : null}
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
  label: {
    fontSize: 16,
    color: '#6B7280',
  },
});
