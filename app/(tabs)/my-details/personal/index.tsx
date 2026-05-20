import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

type Section = {
  key: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
};

const SECTIONS: Section[] = [
  {
    key: 'basic',
    title: 'Basic Details',
    icon: 'card-outline',
    href: '/my-details/personal/basic-details',
  },
  {
    key: 'contact',
    title: 'Contact Details',
    icon: 'call-outline',
    href: '/my-details/personal/contact-details',
  },
  {
    key: 'emergency',
    title: 'Emergency Contact Details',
    icon: 'alert-circle-outline',
    href: '/my-details/personal/emergency-contact-details',
  },
  {
    key: 'edi',
    title: 'Equality, Diversity and Inclusion (EDI)',
    icon: 'people-outline',
    href: '/my-details/personal/edi',
  },
  {
    key: 'education',
    title: 'Education and Qualifications',
    icon: 'school-outline',
    href: '/my-details/personal/education-and-qualifications',
  },
  {
    key: 'disability',
    title: 'Disability',
    icon: 'accessibility-outline',
    href: '/my-details/personal/disability',
  },
];

export default function PersonalDetailsIndex() {
  const router = useRouter();
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
    >
      <View style={[styles.list, { backgroundColor: surfaceColor }]}>
        {SECTIONS.map((section, idx) => (
          <Pressable
            key={section.key}
            onPress={() => router.push(section.href)}
            style={({ pressed }) => [
              styles.row,
              { borderBottomColor: borderColor },
              idx === SECTIONS.length - 1 && styles.rowLast,
              pressed && { backgroundColor: pressedColor },
            ]}
            android_ripple={{ color: borderColor }}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={section.icon} size={22} color={iconColor} />
              <Text style={[styles.rowTitle, { color: textColor }]} numberOfLines={2}>
                {section.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={chevronColor} />
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
