import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/lib/auth/auth-context';
import { personQueries } from '@/lib/queries/person';
import { formatCodeName, formatDate, formatList, formatText } from '@/lib/format';
import type { Address, Phone } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildAddressRows(address: Address, index: number): Row[] {
  const prefix = `addr_${index}`;
  return [
    { key: `${prefix}_type`, label: 'Address Type', value: formatCodeName(address.type) },
    { key: `${prefix}_line`, label: 'Address', value: formatList(address.line) },
    { key: `${prefix}_town`, label: 'Town or City', value: formatText(address.town_or_city) },
    { key: `${prefix}_county`, label: 'County', value: formatCodeName(address.county) },
    { key: `${prefix}_postcode`, label: 'Postcode', value: formatText(address.postcode) },
    { key: `${prefix}_country`, label: 'Country', value: formatCodeName(address.country) },
    { key: `${prefix}_from`, label: 'Date From', value: formatDate(address.date_from) },
    { key: `${prefix}_to`, label: 'Date To', value: formatDate(address.date_to) },
  ];
}

function buildPhoneRows(phone: Phone, index: number): Row[] {
  const prefix = `phone_${index}`;
  return [
    { key: `${prefix}_type`, label: 'Phone Type', value: formatCodeName(phone.type) },
    { key: `${prefix}_number`, label: 'Phone Number', value: formatText(phone.phone_number) },
    { key: `${prefix}_from`, label: 'Date From', value: formatDate(phone.date_from) },
    { key: `${prefix}_to`, label: 'Date To', value: formatDate(phone.date_to) },
  ];
}

export default function ContactDetailsScreen() {
  const { isAuthenticated } = useAuth();
  const { data, isPending, error, refetch } = useQuery({
    ...personQueries.contactDetails(),
    enabled: isAuthenticated,
  });
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const sectionTitleColor = useThemeColor({}, 'textSecondary');

  if (isPending) {
    return <ScreenLoader label="Loading contact details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Contact details are unavailable.'}
        onRetry={() => void refetch()}
      />
    );
  }

  const addresses = data.address_collection?.address ?? [];
  const phones = data.phone_collection?.phone ?? [];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <DetailCard>
        <DetailRow label="Email" value={formatText(data.email)} isLast={addresses.length === 0 && phones.length === 0} />
      </DetailCard>

      {addresses.map((address, index) => {
        const rows = buildAddressRows(address, index);
        return (
          <DetailCard key={address.identifier} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
              {address.is_primary_address ? 'Primary Address' : `Address ${index + 1}`}
            </Text>
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

      {phones.map((phone, index) => {
        const rows = buildPhoneRows(phone, index);
        return (
          <DetailCard key={phone.identifier} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
              {`Phone ${phones.length > 1 ? index + 1 : ''}`}
            </Text>
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
  section: {
    marginTop: 0,
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
