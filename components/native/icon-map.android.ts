import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

import type { NavigationIconKey } from '@/components/native/icon-map';

export type { NavigationIconKey };

type IoniconName = ComponentProps<typeof Ionicons>['name'];

export const CHEVRON_IONICON: IoniconName = 'chevron-forward';

export const NAVIGATION_IONICONS: Record<NavigationIconKey, IoniconName> = {
  personal: 'person-outline',
  employment: 'briefcase-outline',
  other: 'ellipsis-horizontal-outline',
  basic: 'card-outline',
  contact: 'call-outline',
  emergency: 'alert-circle-outline',
  edi: 'people-outline',
  education: 'school-outline',
  disability: 'accessibility-outline',
  payslips: 'cash-outline',
  contract: 'document-text-outline',
  bank: 'wallet-outline',
  appraisal: 'ribbon-outline',
};
