import { Icon, type IconName } from '@expo/ui';

import type { NavigationIconKey } from '@/components/native/icon-map';

export type { NavigationIconKey };

export const CHEVRON_RIGHT_ICON: IconName = Icon.select({
  ios: 'chevron.right',
  android: require('@expo/material-symbols/chevron_right.xml'),
});

export const NAVIGATION_ICONS: Record<NavigationIconKey, IconName> = {
  personal: Icon.select({
    ios: 'person',
    android: require('@expo/material-symbols/person.xml'),
  }),
  employment: Icon.select({
    ios: 'briefcase',
    android: require('@expo/material-symbols/work.xml'),
  }),
  other: Icon.select({
    ios: 'ellipsis',
    android: require('@expo/material-symbols/more_horiz.xml'),
  }),
  basic: Icon.select({
    ios: 'creditcard',
    android: require('@expo/material-symbols/credit_card.xml'),
  }),
  contact: Icon.select({
    ios: 'phone',
    android: require('@expo/material-symbols/call.xml'),
  }),
  emergency: Icon.select({
    ios: 'exclamationmark.circle',
    android: require('@expo/material-symbols/emergency.xml'),
  }),
  edi: Icon.select({
    ios: 'person.2',
    android: require('@expo/material-symbols/groups.xml'),
  }),
  education: Icon.select({
    ios: 'graduationcap',
    android: require('@expo/material-symbols/school.xml'),
  }),
  disability: Icon.select({
    ios: 'accessibility',
    android: require('@expo/material-symbols/accessibility.xml'),
  }),
  payslips: Icon.select({
    ios: 'banknote',
    android: require('@expo/material-symbols/payments.xml'),
  }),
  contract: Icon.select({
    ios: 'doc.text',
    android: require('@expo/material-symbols/description.xml'),
  }),
  bank: Icon.select({
    ios: 'wallet.pass',
    android: require('@expo/material-symbols/account_balance_wallet.xml'),
  }),
  appraisal: Icon.select({
    ios: 'medal',
    android: require('@expo/material-symbols/military_tech.xml'),
  }),
};
