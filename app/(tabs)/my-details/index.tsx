import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type Section = {
  key: 'personal' | 'employment' | 'other';
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
};

const SECTIONS: Section[] = [
  {
    key: 'personal',
    title: 'Personal Details',
    icon: 'person-outline',
    href: '/my-details/personal',
  },
  {
    key: 'employment',
    title: 'Employment Details',
    icon: 'briefcase-outline',
    href: '/my-details/employment',
  },
  {
    key: 'other',
    title: 'Other Details',
    icon: 'ellipsis-horizontal-outline',
    href: '/my-details/other',
  },
];

export default function MyDetailsIndex() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'groupedBackground');
  const borderColor = useThemeColor({}, 'border');
  const chevronColor = useThemeColor({}, 'chevron');
  const iconColor = useThemeColor({}, 'iconStrong');
  const pressedColor = useThemeColor({}, 'pressed');
  const surfaceColor = useThemeColor({}, 'surface');
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={[styles.list, { backgroundColor: surfaceColor }]}>
        {SECTIONS.map((section) => (
          <Pressable
            key={section.key}
            onPress={() => router.push(section.href)}
            style={({ pressed }) => [
              styles.row,
              { borderBottomColor: borderColor },
              pressed && { backgroundColor: pressedColor },
            ]}
            android_ripple={{ color: borderColor }}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={section.icon} size={22} color={iconColor} />
              <Text style={[styles.rowTitle, { color: textColor }]}>{section.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={chevronColor} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
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
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
});
