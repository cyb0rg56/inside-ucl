import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

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
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const borderColor = useThemeColor({}, 'border');
  const labelColor = useThemeColor({}, 'textSecondary');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');
  const signOutBg = useThemeColor({ light: '#FEE2E2', dark: '#3F1D1D' }, 'background');
  const signOutColor = useThemeColor({}, 'danger');

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
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text style={[styles.sectionLabel, { color: labelColor }]}>Signed in as</Text>
      <View style={[styles.card, { backgroundColor: surfaceColor }]}>
        <View style={styles.userBlock}>
          <Text style={[styles.userName, { color: textColor }]}>{userName}</Text>
          {userEmail ? (
            <Text style={[styles.userEmail, { color: labelColor }]}>{userEmail}</Text>
          ) : null}
        </View>
        <View style={[styles.divider, { backgroundColor: borderColor }]} />
        <Pressable
          accessibilityRole="button"
          onPress={onPressSignOut}
          style={({ pressed }) => [
            styles.signOutButton,
            { backgroundColor: signOutBg },
            pressed && { opacity: 0.85 },
          ]}
          android_ripple={{ color: borderColor }}
        >
          <Text style={[styles.signOutLabel, { color: signOutColor }]}>Sign out</Text>
        </Pressable>
      </View>

      {biometricsAvailable ? (
        <>
          <View style={styles.sectionSpacer} />
          <View style={[styles.card, { backgroundColor: surfaceColor }]}>
            <View style={styles.switchRow}>
              <Text style={[styles.switchLabel, { color: textColor }]}>
                Use Face ID / Touch ID
              </Text>
              <Switch value={biometricsEnabled} onValueChange={onBiometricsToggle} />
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSpacer: {
    height: 24,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  userBlock: {
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 15,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
  switchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  switchLabel: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
  },
  signOutButton: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    marginTop: 4,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  signOutLabel: {
    fontWeight: '600',
  },
});
