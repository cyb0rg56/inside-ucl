import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEmploymentInfo } from '@/hooks/use-employment-info';
import { formatDate, formatText } from '@/lib/format';
import type { EmploymentInfo } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(info: EmploymentInfo): Row[] {
  return [
    { key: 'assignment_number', label: 'Assignment Number', value: formatText(info.assignment_number) },
    { key: 'job_title', label: 'Job Title', value: formatText(info.job_title) },
    { key: 'position', label: 'Position', value: formatText(info.position) },
    { key: 'department', label: 'Department', value: formatText(info.department_name) },
    { key: 'location', label: 'Location', value: formatText(info.location) },
    { key: 'status', label: 'Assignment Status', value: formatText(info.assignment_status) },
    { key: 'category', label: 'Employment Category', value: formatText(info.employment_category) },
    { key: 'work_hours', label: 'Work Hours', value: info.work_hours ? `${info.work_hours} / ${info.frequency ?? 'Week'}` : formatText(null) },
    { key: 'work_pattern', label: 'Work Pattern', value: formatText(info.work_pattern) },
    { key: 'grade', label: 'Grade', value: formatText(info.grade) },
    { key: 'line_manager', label: 'Line Manager', value: formatText(info.line_manager_name) },
    { key: 'change_reason', label: 'Change Reason', value: formatText(info.change_reason) },
    { key: 'business_group', label: 'Business Group', value: formatText(info.business_group) },
    { key: 'people_group', label: 'People Group', value: formatText(info.people_group) },
    { key: 'payroll', label: 'Payroll', value: formatText(info.payroll) },
    { key: 'locale', label: 'Locale', value: formatText(info.deprived_locale) },
    { key: 'date_of_joining', label: 'Date of Joining', value: formatDate(info.date_of_joining) },
    { key: 'start_date', label: 'Effective Start Date', value: formatDate(info.effective_start_date) },
    { key: 'end_date', label: 'Effective End Date', value: formatDate(info.effective_end_date) },
    { key: 'last_updated', label: 'Last Updated', value: formatDate(info.last_update_date) },
  ];
}

export default function ContractDetailsScreen() {
  const { data, isLoading, error, reload } = useEmploymentInfo();
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const sectionTitleColor = useThemeColor({}, 'textSecondary');

  if (isLoading) {
    return <ScreenLoader label="Loading contract details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Contract details are unavailable.'}
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
          <DetailRow label="Status" value="No contract details found." isLast />
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
      {data.map((info, index) => {
        const rows = buildRows(info);
        return (
          <DetailCard key={info.assignment_number}>
            {data.length > 1 && (
              <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
                {info.primary ? 'Primary Assignment' : `Assignment ${index + 1}`}
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
