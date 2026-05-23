import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SettingsFieldGroup } from '@/components/native/settings-field-group';
import { ThemedView } from '@/components/themed-view';
import { useBiometrics } from '@/hooks/use-biometrics';
import { useAuth } from '@/lib/auth/auth-context';

export default function SettingsTab() {
  const { user, signOut } = useAuth();
  const { available, enabled, toggle } = useBiometrics();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <SettingsFieldGroup
          userName={user?.name ?? user?.email ?? 'Unknown user'}
          userEmail={user?.email}
          biometricsAvailable={available}
          biometricsEnabled={enabled}
          onBiometricsToggle={toggle}
          onSignOut={() => {
            void signOut();
          }}
        />
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
  },
});
