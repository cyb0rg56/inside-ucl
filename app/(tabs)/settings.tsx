import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/lib/auth/auth-context';

export default function SettingsTab() {
  const { user, signOut } = useAuth();

  const onPressSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: () => {
          void signOut();
        },
      },
    ]);
  };

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.section}>
          <ThemedText type="subtitle">Signed in as</ThemedText>
          <ThemedText style={styles.primary}>
            {user?.name ?? user?.email ?? 'Unknown user'}
          </ThemedText>
          {user?.email ? (
            <ThemedText style={styles.secondary}>{user.email}</ThemedText>
          ) : null}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onPressSignOut}
          style={({ pressed }) => [styles.signOutButton, pressed && styles.signOutPressed]}
        >
          <ThemedText style={styles.signOutLabel}>Sign out</ThemedText>
        </Pressable>
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
    paddingTop: 16,
    gap: 24,
  },
  section: {
    gap: 4,
  },
  primary: {
    fontSize: 18,
    fontWeight: '600',
  },
  secondary: {
    opacity: 0.7,
  },
  signOutButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
  },
  signOutPressed: {
    opacity: 0.8,
  },
  signOutLabel: {
    color: '#B91C1C',
    fontWeight: '600',
  },
});
