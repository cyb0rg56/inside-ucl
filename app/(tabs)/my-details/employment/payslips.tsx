import { DetailFieldGroup, type DetailSection } from '@/components/native/detail-field-group';
import { ScreenError } from '@/components/screen-error';
import { ScreenLoader } from '@/components/screen-loader';
import { useThemeColor } from '@/hooks/use-theme-color';
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

export default function PayslipsScreen() {
  const { data, isLoading, error, reload } = usePayslip();
  const backgroundColor = useThemeColor({}, 'groupedBackground');

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

  const sections: DetailSection[] = [
    { title: 'Pay Period', rows: buildPayPeriodRows(data) },
    { title: 'Employee', rows: buildEmployeeRows(data) },
    { title: 'Payment Summary', rows: buildSummaryRows(data) },
  ];

  if (earnings.length > 0) {
    sections.push({
      title: 'Earnings',
      rows: earnings.map((earning, index) => ({
        key: `earning_${index}`,
        label: earning.element_name,
        value: formatCurrency(earning.pay_value),
      })),
    });
  }

  if (deductions.length > 0) {
    sections.push({
      title: 'Deductions',
      rows: deductions.map((deduction, index) => ({
        key: `deduction_${index}`,
        label: deduction.element_name,
        value: formatCurrency(deduction.element_value),
      })),
    });
  }

  sections.push(
    { title: 'Tax Details', rows: buildTaxRows(data) },
    { title: 'Net Pay Distribution', rows: buildNetPayRows(data) },
  );

  if (balances.length > 0) {
    sections.push({
      title: 'Pay Balances',
      rows: balances.map((balance, index) => ({
        key: `balance_${index}`,
        label: balance.balance_name,
        value: formatCurrency(balance.pay_value),
      })),
    });
  }

  return <DetailFieldGroup style={{ backgroundColor }} sections={sections} />;
}
