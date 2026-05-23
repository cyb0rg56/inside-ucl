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
    key: 'basic',
    title: 'Basic Details',
    href: '/my-details/personal/basic-details',
  },
  {
    key: 'contact',
    title: 'Contact Details',
    href: '/my-details/personal/contact-details',
  },
  {
    key: 'emergency',
    title: 'Emergency Contact Details',
    href: '/my-details/personal/emergency-contact-details',
  },
  {
    key: 'edi',
    title: 'Equality, Diversity and Inclusion (EDI)',
    href: '/my-details/personal/edi',
  },
  {
    key: 'education',
    title: 'Education and Qualifications',
    href: '/my-details/personal/education-and-qualifications',
  },
  {
    key: 'disability',
    title: 'Disability',
    href: '/my-details/personal/disability',
  },
];

export default function PersonalDetailsIndex() {
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
