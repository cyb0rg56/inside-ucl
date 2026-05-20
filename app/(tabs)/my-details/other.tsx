import { StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function OtherDetailsScreen() {
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const textColor = useThemeColor({}, 'textSecondary');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.placeholder, { color: textColor }]}>Other Details coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  placeholder: {
    fontSize: 16,
  },
});
