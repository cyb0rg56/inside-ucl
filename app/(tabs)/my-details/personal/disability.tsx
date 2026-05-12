import { StyleSheet, Text, View } from 'react-native';

export default function DisabilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Disability coming soon.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#6B7280',
  },
});
