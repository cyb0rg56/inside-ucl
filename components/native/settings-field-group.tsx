import { Button, FieldGroup, Host, ListItem, Switch } from '@expo/ui';
import { Alert, StyleSheet } from 'react-native';

type SettingsFieldGroupProps = {
  userName: string;
  userEmail?: string | null;
  biometricsAvailable: boolean;
  biometricsEnabled: boolean;
  onBiometricsToggle: (value: boolean) => void;
  onSignOut: () => void;
};

export function SettingsFieldGroup({
  userName,
  userEmail,
  biometricsAvailable,
  biometricsEnabled,
  onBiometricsToggle,
  onSignOut,
}: SettingsFieldGroupProps) {
  const onPressSignOut = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: onSignOut,
      },
    ]);
  };

  return (
    <Host style={styles.host} useViewportSizeMeasurement>
      <FieldGroup>
        <FieldGroup.Section title="Signed in as">
          <ListItem supportingText={userEmail ?? undefined}>{userName}</ListItem>
          <Button label="Sign out" variant="filled" onPress={onPressSignOut} />
        </FieldGroup.Section>

        {biometricsAvailable ? (
          <FieldGroup.Section>
            <Switch
              label="Use Face ID / Touch ID"
              value={biometricsEnabled}
              onValueChange={onBiometricsToggle}
            />
          </FieldGroup.Section>
        ) : null}
      </FieldGroup>
    </Host>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
});
