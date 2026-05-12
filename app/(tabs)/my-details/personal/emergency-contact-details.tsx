import { StyleSheet, Text, View } from 'react-native';

export default function EmergencyContactDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Emergency Contact Details coming soon.</Text>
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
