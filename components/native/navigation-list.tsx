import { FieldGroup, Host, Icon, ListItem } from '@expo/ui';

import {
  CHEVRON_RIGHT_ICON,
  NAVIGATION_ICONS,
} from '@/components/native/icon-map.ios';
import type { NavigationIconKey } from '@/components/native/icon-map';
import { View } from 'react-native';

export type NavigationListItem = {
  key: string;
  title: string;
  iconKey: NavigationIconKey;
  onPress: () => void;
};

type NavigationListProps = {
  items: NavigationListItem[];
};

export function NavigationList({ items }: NavigationListProps) {
  return (
    <View style={{ flex: 1 }}>
      <Host style={{ flex: 1 }} useViewportSizeMeasurement>
        <FieldGroup>
          <FieldGroup.Section>
            {items.map((item) => (
              <ListItem
                key={item.key}
                onPress={item.onPress}
                leading={<Icon name={NAVIGATION_ICONS[item.iconKey]} size={22} />}
                trailing={<Icon name={CHEVRON_RIGHT_ICON} size={20} />}
              >
                {item.title}
              </ListItem>
            ))}
          </FieldGroup.Section>
        </FieldGroup>
      </Host>
    </View>
  );
}
