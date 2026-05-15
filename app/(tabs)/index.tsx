import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/lib/auth/auth-context';

export default function HomeTab() {
  const { user } = useAuth();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.content}>
          <ThemedText type="title">
            {user?.name ? `Welcome, ${user.name.split(' ')[0]}` : 'Welcome'}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            You&apos;re signed in to Inside UCL.
          </ThemedText>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 16,
    gap: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
});
