import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  CHEVRON_IONICON,
  NAVIGATION_IONICONS,
} from '@/components/native/icon-map.android';
import type { NavigationIconKey } from '@/components/native/icon-map';
import { useThemeColor } from '@/hooks/use-theme-color';

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
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const borderColor = useThemeColor({}, 'border');
  const chevronColor = useThemeColor({}, 'chevron');
  const iconColor = useThemeColor({}, 'iconStrong');
  const pressedColor = useThemeColor({}, 'pressed');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={[styles.list, { backgroundColor: surfaceColor }]}>
        {items.map((item, index) => (
          <Pressable
            key={item.key}
            onPress={item.onPress}
            style={({ pressed }) => [
              styles.row,
              { borderBottomColor: borderColor },
              index === items.length - 1 && styles.rowLast,
              pressed && { backgroundColor: pressedColor },
            ]}
            android_ripple={{ color: borderColor }}
          >
            <View style={styles.rowLeft}>
              <Ionicons
                name={NAVIGATION_IONICONS[item.iconKey]}
                size={22}
                color={iconColor}
              />
              <Text style={[styles.rowTitle, { color: textColor }]} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
            <Ionicons name={CHEVRON_IONICON} size={20} color={chevronColor} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  list: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 12,
  },
  rowTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
  },
});
