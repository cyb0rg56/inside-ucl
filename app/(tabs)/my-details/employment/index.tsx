import { Href, useRouter } from 'expo-router';

import type { NavigationIconKey } from '@/components/native/icon-map';
import { NavigationList } from '@/components/native/navigation-list';

type Section = {
  key: NavigationIconKey;
  title: string;
  href: Href;
};

const SECTIONS: Section[] = [
  {
    key: 'payslips',
    title: 'Payslips',
    href: '/my-details/employment/payslips',
  },
  {
    key: 'contract',
    title: 'Contract Details',
    href: '/my-details/employment/contract-details',
  },
  {
    key: 'bank',
    title: 'Bank Details',
    href: '/my-details/employment/bank-details',
  },
  {
    key: 'appraisal',
    title: 'My Appraisal',
    href: '/my-details/employment/my-appraisal',
  },
];

export default function EmploymentDetailsIndex() {
  const router = useRouter();

  return (
    <NavigationList
      items={SECTIONS.map((section) => ({
        key: section.key,
        title: section.title,
        iconKey: section.key,
        onPress: () => router.push(section.href),
      }))}
    />
  );
}
