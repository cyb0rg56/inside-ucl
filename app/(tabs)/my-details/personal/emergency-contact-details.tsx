import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEmergencyContacts } from '@/hooks/use-emergency-contacts';
import { formatText } from '@/lib/format';
import type { EmergencyContact } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildContactRows(contact: EmergencyContact): Row[] {
  const rows: Row[] = [
    { key: 'full_name', label: 'Full Name', value: formatText(contact.full_name) },
    { key: 'relationship', label: 'Relationship', value: formatText(contact.relationship) },
    { key: 'email', label: 'Email', value: formatText(contact.email_address) },
  ];

  const phones = contact.phone_collection?.phone ?? [];
  for (const phone of phones) {
    rows.push({
      key: `phone_${phone.phone_number_id}`,
      label: 'Phone',
      value: formatText(phone.phone_number),
    });
  }

  const addr = contact.address;
  if (addr) {
    const addressLines = [addr.address_line_1, addr.address_line_2, addr.address_line_3]
      .filter(Boolean)
      .join(', ');
    rows.push(
      { key: 'address', label: 'Address', value: formatText(addressLines || null) },
      { key: 'town', label: 'Town or City', value: formatText(addr.town_or_city) },
      { key: 'postcode', label: 'Postcode', value: formatText(addr.postcode) },
    );
  }

  rows.push(
    { key: 'shared_residence', label: 'Shared Residence', value: contact.shared_residence_flag ? 'Yes' : 'No' },
    { key: 'primary', label: 'Primary Contact', value: contact.is_primary_contact ? 'Yes' : 'No' },
  );

  return rows;
}

export default function EmergencyContactDetailsScreen() {
  const { data, isLoading, error, reload } = useEmergencyContacts();
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const sectionTitleColor = useThemeColor({}, 'textSecondary');

  if (isLoading) {
    return <ScreenLoader label="Loading emergency contacts..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Emergency contact details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  if (data.length === 0) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <DetailCard>
          <DetailRow label="Status" value="No emergency contacts found." isLast />
        </DetailCard>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {data.map((contact, index) => {
        const rows = buildContactRows(contact);
        return (
          <DetailCard key={contact.con_relationship_id}>
            {data.length > 1 && (
              <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
                {contact.is_primary_contact ? 'Primary Contact' : `Contact ${index + 1}`}
              </Text>
            )}
            {rows.map((row, rowIndex) => (
              <DetailRow
                key={row.key}
                label={row.label}
                value={row.value}
                isLast={rowIndex === rows.length - 1}
              />
            ))}
          </DetailCard>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
