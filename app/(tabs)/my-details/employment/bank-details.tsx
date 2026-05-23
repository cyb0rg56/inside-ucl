import { DetailFieldGroup } from '@/components/native/detail-field-group';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useBankDetails } from '@/hooks/use-bank-details';
import { formatNumber, formatText } from '@/lib/format';
import type { BankDetails } from '@/types/person';

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildRows(details: BankDetails): Row[] {
  return [
    { key: 'bank_name', label: 'Bank Name', value: formatText(details.bank_name) },
    { key: 'bank_branch', label: 'Branch', value: formatText(details.bank_branch) },
    { key: 'sort_code', label: 'Sort Code', value: formatText(details.sort_code) },
    { key: 'account_number', label: 'Account Number', value: formatText(details.account_number) },
    { key: 'account_name', label: 'Account Name', value: formatText(details.account_name) },
    { key: 'bldng_soc', label: 'Building Society A/C No.', value: formatText(details.bldng_soc_ac_no || null) },
    { key: 'payment_method', label: 'Payment Method', value: formatText(details.org_payment_method_name) },
    { key: 'priority', label: 'Priority', value: formatNumber(details.priority) },
    { key: 'amount', label: 'Amount', value: formatText(details.amount) },
    { key: 'percentage', label: 'Percentage', value: formatText(details.percentage) },
    { key: 'position', label: 'Position', value: formatText(details.assignment?.position) },
  ];
}

export default function BankDetailsScreen() {
  const { data, isLoading, error, reload } = useBankDetails();
  const backgroundColor = useThemeColor({}, 'groupedBackground');

  if (isLoading) {
    return <ScreenLoader label="Loading bank details..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load details"
        message={error?.message ?? 'Bank details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  return (
    <DetailFieldGroup
      style={{ backgroundColor }}
      sections={[{ rows: buildRows(data) }]}
    />
  );
}
