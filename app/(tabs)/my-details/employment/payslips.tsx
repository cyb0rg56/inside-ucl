import { ScrollView, StyleSheet, Text } from 'react-native';

import { DetailCard } from '@/components/detail-card';
import { DetailRow } from '@/components/detail-row';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { usePayslip } from '@/hooks/use-payslip';
import { formatDate, formatText } from '@/lib/format';
import type { Payslip } from '@/types/person';

function formatCurrency(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return 'Not provided';
  return `£${value.toFixed(2)}`;
}

type Row = {
  key: string;
  label: string;
  value: string;
};

function buildPayPeriodRows(payslip: Payslip): Row[] {
  const info = payslip.employee_pay_proc_info;
  return [
    { key: 'month', label: 'Payment Month', value: formatText(info.payment_month) },
    { key: 'period', label: 'Period Type', value: formatText(info.period_type) },
    { key: 'period_num', label: 'Period Number', value: String(info.period_num) },
    { key: 'start', label: 'Start Date', value: formatDate(info.start_date) },
    { key: 'end', label: 'End Date', value: formatDate(info.end_date) },
    { key: 'payment_date', label: 'Payment Date', value: formatDate(info.payment_date) },
  ];
}

function buildEmployeeRows(payslip: Payslip): Row[] {
  const emp = payslip.employee_details;
  return [
    { key: 'name', label: 'Name', value: formatText(emp.employee_name) },
    { key: 'number', label: 'Employee Number', value: formatText(emp.employee_number) },
    { key: 'ni', label: 'NI Number', value: formatText(emp.ni_number) },
    { key: 'dept', label: 'Department', value: formatText(emp.department) },
    { key: 'payroll', label: 'Payroll', value: formatText(emp.payroll_name) },
  ];
}

function buildTaxRows(payslip: Payslip): Row[] {
  const tax = payslip.employee_tax_details;
  return [
    { key: 'code', label: 'Tax Code', value: formatText(tax.tax_code) },
    { key: 'basis', label: 'Tax Basis', value: formatText(tax.tax_basis) },
    { key: 'ni_cat', label: 'NI Category', value: formatText(tax.ni_category) },
    { key: 'paye', label: 'PAYE Ref', value: formatText(tax.paye_ref) },
  ];
}

function buildSummaryRows(payslip: Payslip): Row[] {
  const summary = payslip.employee_payment_summary;
  return [
    { key: 'total_pay', label: 'Total Payments', value: formatCurrency(summary.total_payments_value) },
    { key: 'total_ded', label: 'Total Deductions', value: formatCurrency(summary.total_deductions_value) },
    { key: 'total_net', label: 'Total Amount Paid', value: formatCurrency(summary.total_amount_paid_value) },
  ];
}

function buildNetPayRows(payslip: Payslip): Row[] {
  const dist = payslip.employee_net_pay_distribution;
  return [
    { key: 'bank', label: 'Bank', value: formatText(dist.bank_name) },
    { key: 'method', label: 'Payment Method', value: formatText(dist.org_payment_method_name) },
    { key: 'sort', label: 'Sort Code', value: formatText(dist.sort_code) },
    { key: 'account', label: 'Account Number', value: formatText(dist.account_number) },
    { key: 'net', label: 'Net Pay', value: formatCurrency(dist.net_pay) },
  ];
}

function renderSection(title: string, rows: Row[]) {
  return (
    <DetailCard>
      <Text style={styles.sectionTitle}>{title}</Text>
      {rows.map((row, i) => (
        <DetailRow key={row.key} label={row.label} value={row.value} isLast={i === rows.length - 1} />
      ))}
    </DetailCard>
  );
}

export default function PayslipsScreen() {
  const { data, isLoading, error, reload } = usePayslip();

  if (isLoading) {
    return <ScreenLoader label="Loading payslip..." />;
  }

  if (error || !data) {
    return (
      <ScreenError
        title="Could not load payslip"
        message={error?.message ?? 'Payslip details are unavailable.'}
        onRetry={() => void reload()}
      />
    );
  }

  const earnings = data.employee_earnings_both ?? [];
  const deductions = data.employee_deductions ?? [];
  const balances = data.employee_pay_balances ?? [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      {renderSection('Pay Period', buildPayPeriodRows(data))}
      {renderSection('Employee', buildEmployeeRows(data))}
      {renderSection('Payment Summary', buildSummaryRows(data))}

      {earnings.length > 0 &&
        renderSection(
          'Earnings',
          earnings.map((e, i) => ({
            key: `earning_${i}`,
            label: e.element_name,
            value: formatCurrency(e.pay_value),
          })),
        )}

      {deductions.length > 0 &&
        renderSection(
          'Deductions',
          deductions.map((d, i) => ({
            key: `deduction_${i}`,
            label: d.element_name,
            value: formatCurrency(d.element_value),
          })),
        )}

      {renderSection('Tax Details', buildTaxRows(data))}
      {renderSection('Net Pay Distribution', buildNetPayRows(data))}

      {balances.length > 0 &&
        renderSection(
          'Pay Balances',
          balances.map((b, i) => ({
            key: `balance_${i}`,
            label: b.balance_name,
            value: formatCurrency(b.pay_value),
          })),
        )}
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
