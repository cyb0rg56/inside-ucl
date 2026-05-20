import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/lib/auth/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { QUICK_LINKS } from '@/constants/test-data';
import { UCL_BLUE, UCL_TEAL } from '@/constants/theme';


function openUrl(url: string) {
  WebBrowser.openBrowserAsync(url);
}

export default function HomeTab() {
  const { user } = useAuth();
  const cardBg = useThemeColor({}, 'background');

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent} contentInsetAdjustmentBehavior="automatic"
>
          <View style={styles.content}>
            <ThemedText type="title">
              {user?.name ? `Welcome, ${user.name.split(' ')[0]}` : 'Welcome'}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              You&apos;re signed in to Inside UCL.
            </ThemedText>
          </View>

          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Announcements</ThemedText>
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                Alert.alert(
                  'Mark all as read',
                  'Marking announcements as read is not available yet.',
                )
              }
              hitSlop={8}
            >
              <ThemedText style={styles.headerLink}>Mark all as read</ThemedText>
            </Pressable>
          </View>

          <Pressable
            accessibilityRole="link"
            onPress={() => WebBrowser.openBrowserAsync('https://stats.uptimerobot.com/2o71YuVNjx')}
            style={({ pressed }) => [
              styles.announcementCard,
              { backgroundColor: cardBg },
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.announcementTitle}>
              IT Service Maintenance – scheduled downtime{' '}
              <ThemedText style={styles.announcementAge}>3d</ThemedText>
            </ThemedText>
            <ThemedText style={styles.announcementBody}>
              Planned maintenance for core IT services is scheduled for this weekend.
              Please save your work and plan accordingly.
            </ThemedText>
            <View style={styles.cardLinkRow}>
              <ThemedText style={styles.cardLink}>Check service status</ThemedText>
              <Ionicons name="open-outline" size={16} color={UCL_BLUE} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="link"
            onPress={() => WebBrowser.openBrowserAsync('https://www.ucl.ac.uk/human-resources')}
            style={({ pressed }) => [
              styles.announcementCard,
              { backgroundColor: cardBg },
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.announcementTitle}>
              HR Policy Updates – new flexible working guidelines{' '}
              <ThemedText style={styles.announcementAge}>12d</ThemedText>
            </ThemedText>
            <ThemedText style={styles.announcementBody}>
              Updated guidance on hybrid and flexible working arrangements is now
              available for all staff.
            </ThemedText>
            <View style={styles.cardLinkRow}>
              <ThemedText style={styles.cardLink}>
                Read the full policy update
              </ThemedText>
              <Ionicons name="open-outline" size={16} color={UCL_BLUE} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="link"
            onPress={() => WebBrowser.openBrowserAsync('https://www.ucl.ac.uk/news/staff')}
            style={({ pressed }) => [
              styles.announcementCard,
              { backgroundColor: cardBg },
              pressed && styles.pressed,
            ]}
          >
            <ThemedText style={styles.announcementTitle}>
              Meningitis – symptoms to look out for and support available{' '}
              <ThemedText style={styles.announcementAge}>57d</ThemedText>
            </ThemedText>
            <ThemedText style={styles.announcementBody}>
              Following the recent meningitis outbreak in Kent, we are reminding our
              UCL community of the symptoms to watch out for and what to do if you are
              concerned.
            </ThemedText>
            <View style={styles.cardLinkRow}>
              <ThemedText style={styles.cardLink}>
                Find out more on UCL Staff News
              </ThemedText>
              <Ionicons name="open-outline" size={16} color={UCL_BLUE} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="link"
            onPress={() => WebBrowser.openBrowserAsync('https://www.ucl.ac.uk/news/staff')}
            style={({ pressed }) => [styles.viewAllLink, pressed && styles.pressed]}
          >
            <ThemedText style={styles.viewAllText}>
              View all announcements
            </ThemedText>
            <Ionicons name="arrow-forward" size={18} color={UCL_BLUE} />
          </Pressable>
          <View style={styles.linksHeader}>
            <ThemedText style={styles.sectionTitle}>My links</ThemedText>
            <Pressable
              accessibilityRole="button"
              onPress={() => Alert.alert('Edit links', 'Link editing is not available yet.')}
              hitSlop={8}
            >
              <ThemedText style={styles.headerLink}>Edit my links</ThemedText>
            </Pressable>
          </View>

          <View style={styles.quickLinks}>
            {QUICK_LINKS.map((link) => (
              <Pressable
                key={link.title}
                accessibilityRole="link"
                onPress={() => openUrl(link.url)}
                style={({ pressed }) => [
                  styles.quickLinkRow,
                  { backgroundColor: cardBg },
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.quickLinkAccent} />
                <ThemedText style={styles.quickLinkText}>{link.title}</ThemedText>
                <Ionicons name="open-outline" size={24} color={UCL_BLUE} />
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  headerLink: {
    fontSize: 14,
    color: UCL_BLUE,
  },
  announcementCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 8,
  },
  announcementTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  announcementAge: {
    fontSize: 13,
    fontWeight: '400',
    opacity: 0.5,
  },
  announcementBody: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 20,
  },
  cardLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  cardLink: {
    fontSize: 14,
    color: UCL_BLUE,
    fontWeight: '500',
  },
  viewAllLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginHorizontal: 20,
    marginTop: 4,
    paddingVertical: 12,
  },
  viewAllText: {
    fontSize: 15,
    color: UCL_BLUE,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
  linksHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 48,
  },
  quickLinks: {
    gap: 30,
    paddingHorizontal: 20,
  },
  quickLinkRow: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 68,
    paddingRight: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  quickLinkAccent: {
    alignSelf: 'stretch',
    backgroundColor: UCL_TEAL,
    width: 5,
  },
  quickLinkText: {
    flex: 1,
    fontSize: 19,
    paddingHorizontal: 20,
  },
});
