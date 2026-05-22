import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { user } from '../data/mockData';
import TransformationProgressCard from '../components/TransformationProgressCard';
import StreakCard from '../components/StreakCard';
import ReflectionsCard from '../components/ReflectionsCard';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSettings = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account</Text>
        <TouchableOpacity onPress={handleSettings} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile */}
        <View style={styles.profileSection}>
          <View style={styles.profileRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={typeof user.avatar === 'string' ? { uri: user.avatar } : user.avatar as any}
                style={styles.avatar}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.fullName}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.viewProfileButton}>
              <Text style={styles.viewProfileText}>View Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="pencil-outline" size={18} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reflections — daily check-in & journal */}
        <ReflectionsCard
          onViewAll={() => navigation.navigate('Reflections' as never)}
          onOpenDay={(date) => navigation.navigate('ReflectionDay' as never, { date } as never)}
        />

        {/* Transformation Progress + Streak */}
        <TransformationProgressCard />
        <StreakCard />

        {/* Library */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Library</Text>
          <TouchableOpacity style={styles.listItem}>
            <Ionicons name="book-outline" size={22} color={colors.textPrimary} />
            <Text style={styles.listItemText}>Continue programs</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Ionicons name="bookmark-outline" size={22} color={colors.textPrimary} />
            <Text style={styles.listItemText}>Favorites</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Ionicons name="checkmark-circle-outline" size={22} color={colors.textPrimary} />
            <Text style={styles.listItemText}>Completed</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.listItem, styles.listItemLast]}>
            <Ionicons name="download-outline" size={22} color={colors.textPrimary} />
            <Text style={styles.listItemText}>Downloads</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  // Profile section - horizontal layout matching screenshot
  profileSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.backgroundCard,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    marginLeft: 20,
    flex: 1,
  },
  userName: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    ...typography.body,
    color: colors.textSecondary,
  },
  profileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 12,
  },
  viewProfileText: {
    ...typography.label,
    color: colors.textPrimary,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Sections
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  // Library
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemLast: {
    borderBottomWidth: 0,
  },
  listItemText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: 16,
  },
  bottomPadding: {
    height: 40,
  },
});
