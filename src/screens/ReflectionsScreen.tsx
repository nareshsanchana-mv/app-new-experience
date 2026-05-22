import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  reflectionHistory,
  moodOptions,
  getReflectionStats,
  getActivityIcon,
  getActivityColor,
  ReflectionDay,
} from '../data/reflectionsData';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { RootStackParamList } from '../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ReflectionFilter = 'all' | 'mine' | 'eve';

export default function ReflectionsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<ReflectionFilter>('all');
  const stats = getReflectionStats();

  const sourceFilteredDays = reflectionHistory.filter((day) => {
    if (filter === 'mine') return day.hasUserInput;
    if (filter === 'eve') return day.eveConversations.length > 0;
    return true;
  });

  const filteredDays = searchQuery.trim()
    ? sourceFilteredDays.filter(day =>
        day.journalText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        day.eveConversations.some(e => e.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        day.activities.some(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sourceFilteredDays;

  const filterOptions: { id: ReflectionFilter; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { id: 'all', label: 'All', icon: 'apps-outline' },
    { id: 'mine', label: 'Mine', icon: 'pencil' },
    { id: 'eve', label: 'From Eve', icon: 'sparkles' },
  ];

  const getMoodEmoji = (mood?: string) => {
    return moodOptions.find(m => m.mood === mood)?.emoji ?? '';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reflections</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.daysWithInput}</Text>
            <Text style={styles.statLabel}>Reflections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.totalActivities}</Text>
            <Text style={styles.statLabel}>Activities</Text>
          </View>
        </View>

        {/* Filter pills */}
        <View style={styles.filterRow}>
          {filterOptions.map((opt) => {
            const active = filter === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.filterPill, active && styles.filterPillActive]}
                onPress={() => setFilter(opt.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={opt.icon}
                  size={13}
                  color={active ? colors.textPrimary : colors.textMuted}
                />
                <Text style={[styles.filterPillText, active && styles.filterPillTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search reflections, conversations, activities..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Day entries */}
        {filteredDays.map((day) => (
          <TouchableOpacity
            key={day.date}
            style={styles.dayCard}
            onPress={() => navigation.navigate('ReflectionDay' as any, { date: day.date })}
            activeOpacity={0.7}
          >
            {/* Day header */}
            <View style={styles.dayHeader}>
              <View style={styles.dayDateRow}>
                <Text style={styles.dayDate}>{day.displayDate}</Text>
                {day.mood && (
                  <Text style={styles.dayMoodEmoji}>{getMoodEmoji(day.mood)}</Text>
                )}
              </View>
              <View style={styles.dayBadges}>
                {day.hasUserInput && (
                  <View style={styles.badge}>
                    <Ionicons name="pencil" size={10} color={colors.primary} />
                    <Text style={styles.badgeText}>Journal</Text>
                  </View>
                )}
                {day.eveConversations.length > 0 && (
                  <View style={[styles.badge, styles.badgeEve]}>
                    <Ionicons name="sparkles" size={10} color={colors.primaryLight} />
                    <Text style={[styles.badgeText, styles.badgeTextEve]}>Eve</Text>
                  </View>
                )}
                {day.activities.length > 0 && (
                  <View style={[styles.badge, styles.badgeActivity]}>
                    <Ionicons name="play" size={10} color={colors.teal} />
                    <Text style={[styles.badgeText, styles.badgeTextActivity]}>{day.activities.length}</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Journal snippet */}
            {day.journalText && (
              <Text style={styles.journalSnippet} numberOfLines={2}>
                {day.journalText}
              </Text>
            )}

            {/* Activity summary */}
            {day.activities.length > 0 && (
              <View style={styles.activitySummary}>
                {day.activities.slice(0, 3).map((act) => (
                  <View key={act.id} style={styles.activityPill}>
                    <Ionicons
                      name={getActivityIcon(act.type) as any}
                      size={12}
                      color={getActivityColor(act.type)}
                    />
                    <Text style={styles.activityPillText} numberOfLines={1}>
                      {act.title.length > 30 ? act.title.substring(0, 30) + '...' : act.title}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Chevron */}
            <View style={styles.dayChevron}>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        ))}

        {filteredDays.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons
              name={searchQuery.trim() ? 'search-outline' : filter === 'eve' ? 'sparkles-outline' : 'pencil'}
              size={40}
              color={colors.textMuted}
            />
            <Text style={styles.emptyTitle}>
              {searchQuery.trim()
                ? 'No results found'
                : filter === 'eve'
                ? 'No Eve conversations yet'
                : filter === 'mine'
                ? 'No journal entries yet'
                : 'No reflections yet'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery.trim()
                ? 'Try a different search term'
                : filter === 'eve'
                ? 'Start a chat with Eve to see it here'
                : filter === 'mine'
                ? 'Add a mood or note to start your journal'
                : 'Your reflections will appear here'}
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 36,
  },

  // Stats
  statsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: colors.backgroundElevated,
    borderRadius: 14,
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.border,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
  },

  // Filter pills
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterPillActive: {
    backgroundColor: colors.backgroundElevated,
    borderColor: colors.primary,
  },
  filterPillText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  filterPillTextActive: {
    color: colors.textPrimary,
  },

  // Day cards
  dayCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: colors.backgroundElevated,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayDate: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  dayMoodEmoji: {
    fontSize: 18,
  },
  dayBadges: {
    flexDirection: 'row',
    gap: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: `${colors.primary}15`,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  badgeEve: {
    backgroundColor: `${colors.primaryLight}15`,
  },
  badgeTextEve: {
    color: colors.primaryLight,
  },
  badgeActivity: {
    backgroundColor: `${colors.teal}15`,
  },
  badgeTextActivity: {
    color: colors.teal,
  },
  journalSnippet: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
  },
  activitySummary: {
    gap: 6,
  },
  activityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.surface,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  activityPillText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  dayChevron: {
    position: 'absolute',
    right: 12,
    top: '50%',
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  emptyTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  emptySubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
});
