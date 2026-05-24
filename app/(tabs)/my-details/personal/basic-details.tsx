import { useQuery } from '@tanstack/react-query';
import { ScrollView, StyleSheet } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useAuth } from '@/lib/auth/auth-context';
import { personQueries } from '@/lib/queries/person';
import {
  formatCodeName,
  formatDate,
  formatList,
  formatNumber,
  formatText,
} from '@/lib/format';
import type { PersonalDetails } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(details: PersonalDetails): Row[] {
  return [
    { key: 'full_name', label: 'Full Name', value: formatText(details.full_name) },
    { key: 'title', label: 'Title', value: formatText(details.title) },
    { key: 'forename', label: 'Forename', value: formatText(details.forename) },
    { key: 'middle_names', label: 'Middle Names', value: formatList(details.middle_names) },
    { key: 'surname', label: 'Surname', value: formatText(details.surname) },
    {
      key: 'preferred_forename',
      label: 'Preferred Forename',
      value: formatText(details.preferred_forename),
    },
    {
      key: 'preferred_surname',
      label: 'Preferred Surname',
      value: formatText(details.preferred_surname),
    },
    { key: 'date_of_birth', label: 'Date of Birth', value: formatDate(details.date_of_birth) },
    { key: 'gender', label: 'Gender', value: formatCodeName(details.gender) },
    {
      key: 'marital_status',
      label: 'Marital Status',
      value: formatCodeName(details.marital_status),
    },
    {
      key: 'ethnic_origin',
      label: 'Ethnic Origin',
      value: formatCodeName(details.ethnic_origin),
    },
    {
      key: 'primary_nationality',
      label: 'Primary Nationality',
      value: formatCodeName(details.primary_nationality),
    },
    {
      key: 'secondary_nationality',
      label: 'Secondary Nationality',
      value: formatCodeName(details.secondary_nationality),
    },
    { key: 'ucl_email', label: 'UCL Email', value: formatText(details.ucl_email) },
    { key: 'personal_email', label: 'Personal Email', value: formatText(details.personal_email) },
    { key: 'ni_number', label: 'NI Number', value: formatText(details.ni_number) },
    { key: 'position', label: 'Position', value: formatText(details.position) },
    {
      key: 'working_hours',
      label: 'Working Hours',
      value: formatNumber(details.working_hours, { suffix: 'hrs / week' }),
    },
    {
      key: 'date_of_joining',
      label: 'Date of Joining',
      value: formatDate(details.date_of_joining),
    },
    {
      key: 'business_group',
      label: 'Business Group',
      value: formatText(details.business_group?.name),
    },
    {
      key: 'employee_number',
      label: 'Employee Number',
      value: formatText(details.supplementary?.employee_number),
    },
    { key: 'user_id', label: 'User ID', value: formatText(details.user_id) },
    { key: 'identifier', label: 'Identifier', value: formatText(details.identifier) },
  ];
}

export default function BasicDetailsScreen() {
  const { isAuthenticated } = useAuth();
  const { data, isPending, error, refetch } = useQuery({
    ...personQueries.personalDetails(),
    enabled: isAuthenticated,
  });
  const backgroundColor = useThemeColor({}, 'groupedBackground');

  if (isPending) {
    return <ScreenLoader label="Loading basic details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Personal details are unavailable.'}
        onRetry={() => void refetch()}
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
