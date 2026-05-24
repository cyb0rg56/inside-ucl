import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useQuery } from '@tanstack/react-query';

import { useAuth } from '@/lib/auth/auth-context';
import { personQueries } from '@/lib/queries/person';
import { formatDate, formatText } from '@/lib/format';
import type { EducationQualification, QualificationSubject } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(qual: EducationQualification): Row[] {
  return [
    { key: 'name', label: 'Qualification', value: formatText(qual.name) },
    { key: 'title', label: 'Title', value: formatText(qual.title) },
    { key: 'letters', label: 'Letters', value: formatText(qual.qualification_letters) },
    { key: 'status', label: 'Status', value: formatText(qual.status) },
    { key: 'grade', label: 'Grade Attained', value: formatText(qual.grade_attained) },
    { key: 'awarding_body', label: 'Awarding Body', value: formatText(qual.awarding_body) },
    { key: 'establishment', label: 'Establishment', value: formatText(qual.establishment) },
    { key: 'start_date', label: 'Start Date', value: formatDate(qual.start_date) },
    { key: 'end_date', label: 'End Date', value: formatDate(qual.end_date) },
    { key: 'last_updated', label: 'Last Updated', value: formatDate(qual.last_updated) },
  ];
}

function buildSubjectRows(subject: QualificationSubject): Row[] {
  return [
    { key: 'subject', label: 'Subject', value: formatText(subject.subject) },
    { key: 'code', label: 'Subject Code', value: formatText(subject.subject_code) },
    { key: 'status', label: 'Status', value: formatText(subject.subject_status_code) },
    { key: 'grade', label: 'Grade Attained', value: formatText(subject.grade_attained) },
    { key: 'start_date', label: 'Start Date', value: formatDate(subject.start_date) },
    { key: 'end_date', label: 'End Date', value: formatDate(subject.end_date) },
  ];
}

export default function EducationAndQualificationsScreen() {
  const { isAuthenticated } = useAuth();
  const { data, isPending, error, refetch } = useQuery({
    ...personQueries.education(),
    enabled: isAuthenticated,
  });
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const sectionTitleColor = useThemeColor({}, 'textSecondary');

  if (isPending) {
    return <ScreenLoader label="Loading qualifications..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Education and qualifications are unavailable.'}
        onRetry={() => void refetch()}
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
          <DetailRow label="Status" value="No qualifications found." isLast />
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
      {data.map((qual, qIndex) => {
        const rows = buildRows(qual);
        const subjects = qual.qualification_subject_collection?.qualification_subject ?? [];

        return (
          <DetailCard key={qual.qualification_id}>
            {data.length > 1 && (
              <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>Qualification {qIndex + 1}</Text>
            )}
            {rows.map((row, rowIndex) => (
              <DetailRow
                key={row.key}
                label={row.label}
                value={row.value}
                isLast={rowIndex === rows.length - 1 && subjects.length === 0}
              />
            ))}

            {subjects.map((subject, sIndex) => {
              const subjectRows = buildSubjectRows(subject);
              return subjectRows.map((row, rowIndex) => (
                <DetailRow
                  key={`sub_${sIndex}_${row.key}`}
                  label={row.label}
                  value={row.value}
                  isLast={sIndex === subjects.length - 1 && rowIndex === subjectRows.length - 1}
                />
              ));
            })}
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
