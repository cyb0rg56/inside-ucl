import { ScrollView, StyleSheet } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEdiDetails } from '@/hooks/use-edi-details';
import { formatCodeName, formatDate, formatText } from '@/lib/format';
import type { EdiDetails } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(details: EdiDetails): Row[] {
  return [
    { key: 'religion', label: 'Religion', value: formatCodeName(details.religion) },
    { key: 'sexual_orientation', label: 'Sexual Orientation', value: formatCodeName(details.sexual_orientation) },
    { key: 'gender_code', label: 'Gender', value: formatText(details.gender_code) },
    { key: 'same_gender_at_birth', label: 'Same Gender at Birth', value: formatText(details.same_gender_at_birth_code) },
    { key: 'gender_description', label: 'Gender Description', value: formatText(details.gender_description) },
    { key: 'info_category', label: 'Information Category', value: formatText(details.pei_information_category) },
    { key: 'last_updated', label: 'Last Updated', value: formatDate(details.last_updated) },
  ];
}

export default function EDIScreen() {
  const { data, isLoading, error, reload } = useEdiDetails();
  const backgroundColor = useThemeColor({}, 'groupedBackground');

  if (isLoading) {
    return <ScreenLoader label="Loading EDI details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'EDI details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  const rows = buildRows(data);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <DetailCard>
        {rows.map((row, index) => (
          <DetailRow
            key={row.key}
            label={row.label}
            value={row.value}
            isLast={index === rows.length - 1}
          />
        ))}
      </DetailCard>
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
  },
});
