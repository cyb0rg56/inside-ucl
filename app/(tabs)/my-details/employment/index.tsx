import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Section = {
  key: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: Href;
};

const SECTIONS: Section[] = [
  {
    key: 'payslips',
    title: 'Payslips',
    icon: 'cash-outline',
    href: '/my-details/employment/payslips',
  },
  {
    key: 'contract',
    title: 'Contract Details',
    icon: 'document-text-outline',
    href: '/my-details/employment/contract-details',
  },
  {
    key: 'bank',
    title: 'Bank Details',
    icon: 'wallet-outline',
    href: '/my-details/employment/bank-details',
  },
  {
    key: 'appraisal',
    title: 'My Appraisal',
    icon: 'ribbon-outline',
    href: '/my-details/employment/my-appraisal',
  },
];

export default function EmploymentDetailsIndex() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.list}>
        {SECTIONS.map((section, idx) => (
          <Pressable
            key={section.key}
            onPress={() => router.push(section.href)}
            style={({ pressed }) => [
              styles.row,
              idx === SECTIONS.length - 1 && styles.rowLast,
              pressed && styles.rowPressed,
            ]}
            android_ripple={{ color: '#E5E7EB' }}
          >
            <View style={styles.rowLeft}>
              <Ionicons name={section.icon} size={22} color="#1F2937" />
              <Text style={styles.rowTitle} numberOfLines={2}>
                {section.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingTop: 16,
    paddingBottom: 32,
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
  rowLast: {
    borderBottomWidth: 0,
  },
  rowPressed: {
    backgroundColor: '#F3F4F6',
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
    color: '#111827',
    fontWeight: '500',
  },
});
