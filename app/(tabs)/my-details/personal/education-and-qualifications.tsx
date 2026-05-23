import { DetailFieldGroup, type DetailSection } from '@/components/native/detail-field-group';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useEducationQualifications } from '@/hooks/use-education-qualifications';
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

function buildSubjectRows(subject: QualificationSubject, subjectIndex: number): Row[] {
  const prefix = `sub_${subjectIndex}`;
  return [
    { key: `${prefix}_subject`, label: 'Subject', value: formatText(subject.subject) },
    { key: `${prefix}_code`, label: 'Subject Code', value: formatText(subject.subject_code) },
    { key: `${prefix}_status`, label: 'Status', value: formatText(subject.subject_status_code) },
    { key: `${prefix}_grade`, label: 'Grade Attained', value: formatText(subject.grade_attained) },
    { key: `${prefix}_start_date`, label: 'Start Date', value: formatDate(subject.start_date) },
    { key: `${prefix}_end_date`, label: 'End Date', value: formatDate(subject.end_date) },
  ];
}

function buildQualificationSection(qual: EducationQualification, index: number, total: number): DetailSection {
  const subjects = qual.qualification_subject_collection?.qualification_subject ?? [];
  const rows = [
    ...buildRows(qual),
    ...subjects.flatMap((subject, subjectIndex) => buildSubjectRows(subject, subjectIndex)),
  ];

  return {
    title: total > 1 ? `Qualification ${index + 1}` : undefined,
    rows,
  };
}

export default function EducationAndQualificationsScreen() {
  const { data, isLoading, error, reload } = useEducationQualifications();
  const backgroundColor = useThemeColor({}, 'groupedBackground');

  if (isLoading) {
    return <ScreenLoader label="Loading qualifications..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Education and qualifications are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  if (data.length === 0) {
    return (
      <DetailFieldGroup
        style={{ backgroundColor }}
        sections={[{ rows: [{ key: 'status', label: 'Status', value: 'No qualifications found.' }] }]}
      />
    );
  }

  const sections = data.map((qual, index) => buildQualificationSection(qual, index, data.length));

  return <DetailFieldGroup style={{ backgroundColor }} sections={sections} />;
}
