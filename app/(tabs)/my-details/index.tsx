import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {SECTIONS.map((section) => (
          <Pressable
            key={section.key}
            onPress={() => router.push(section.href)}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            android_ripple={{ color: '#E5E7EB' }}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={section.icon} size={22} color="#1F2937" />
              <Text style={styles.rowTitle}>{section.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 16,
  },
  list: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
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
    borderBottomColor: '#E5E7EB',
  },
  rowPressed: {
    backgroundColor: '#F3F4F6',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowTitle: {
    fontSize: 17,
    color: '#111827',
    fontWeight: '500',
  },
});
