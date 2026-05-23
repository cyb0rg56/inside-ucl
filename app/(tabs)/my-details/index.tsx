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
    key: 'personal',
    title: 'Personal Details',
    href: '/my-details/personal',
  },
  {
    key: 'employment',
    title: 'Employment Details',
    href: '/my-details/employment',
  },
  {
    key: 'other',
    title: 'Other Details',
    href: '/my-details/other',
  },
];

export default function MyDetailsIndex() {
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
