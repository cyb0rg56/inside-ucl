import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useDisabilityDetails } from '@/hooks/use-disability-details';
import { formatDate, formatText } from '@/lib/format';
import type { DisabilityDetail } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(detail: DisabilityDetail): Row[] {
  return [
    { key: 'disability_id', label: 'Disability ID', value: formatText(detail.disability_id) },
    { key: 'category_code', label: 'Category Code', value: formatText(detail.disability_category_code) },
    { key: 'status_code', label: 'Status Code', value: formatText(detail.status_code) },
    { key: 'reason_code', label: 'Reason Code', value: formatText(detail.reason_code) },
    { key: 'description', label: 'Description', value: formatText(detail.description) },
    { key: 'degree', label: 'Degree', value: formatText(detail.degree) },
    { key: 'quota_fte', label: 'Quota FTE', value: formatText(detail.quota_fte) },
    { key: 'effective_date', label: 'Effective Date', value: formatDate(detail.effective_date) },
    { key: 'effective_end_date', label: 'Effective End Date', value: formatDate(detail.effective_end_date) },
    { key: 'registration_date', label: 'Registration Date', value: formatDate(detail.registration_date) },
    { key: 'registration_exp_date', label: 'Registration Expiry Date', value: formatDate(detail.registration_exp_date) },
    { key: 'assessment_due_date', label: 'Assessment Due Date', value: formatDate(detail.assessment_due_date) },
    { key: 'last_updated', label: 'Last Updated', value: formatDate(detail.last_updated) },
  ];
}

export default function DisabilityScreen() {
  const { data, isLoading, error, reload } = useDisabilityDetails();

  if (isLoading) {
    return <ScreenLoader label="Loading disability details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Disability details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  if (data.length === 0) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
      >
        <DetailCard>
          <DetailRow label="Status" value="No disability records found." isLast />
        </DetailCard>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {data.map((detail, index) => {
        const rows = buildRows(detail);
        return (
          <DetailCard key={detail.disability_id} style={index > 0 ? styles.section : undefined}>
            {data.length > 1 && (
              <Text style={styles.sectionTitle}>Record {index + 1}</Text>
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
    backgroundColor: '#F2F2F7',
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
    color: '#6B7280',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
