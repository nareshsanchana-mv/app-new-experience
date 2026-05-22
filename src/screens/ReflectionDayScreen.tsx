import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  moodOptions,
  getActivityIcon,
  getActivityColor,
} from '../data/reflectionsData';
import { useReflections } from '../context/ReflectionsContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function ReflectionDayScreen() {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { date } = route.params;
  const { reflectionHistory } = useReflections();

  const day = reflectionHistory.find(d => d.date === date);
  if (!day) return null;

  const moodInfo = day.mood ? moodOptions.find(m => m.mood === day.mood) : null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{day.displayDate}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

        {/* === YOUR REFLECTION (always at top) === */}
        {(day.mood || day.journalText) && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconBg, { backgroundColor: `${colors.gold}20` }]}>
                <Ionicons name="pencil" size={16} color={colors.gold} />
              </View>
              <Text style={styles.sectionLabel}>Your Reflection</Text>
            </View>

            <View style={styles.reflectionCard}>
              {/* Mood */}
              {moodInfo && (
                <View style={styles.moodDisplay}>
                  <Text style={styles.moodEmoji}>{moodInfo.emoji}</Text>
                  <View>
                    <Text style={styles.moodFeeling}>Feeling {moodInfo.label}</Text>
                    <Text style={styles.moodTime}>Logged today</Text>
                  </View>
                </View>
              )}

              {/* Journal text */}
              {day.journalText && (
                <View style={styles.journalBlock}>
                  <Text style={styles.journalText}>{day.journalText}</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* No user input indicator */}
        {!day.mood && !day.journalText && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconBg, { backgroundColor: `${colors.gold}20` }]}>
                <Ionicons name="pencil" size={16} color={colors.gold} />
              </View>
              <Text style={styles.sectionLabel}>Your Reflection</Text>
            </View>
            <View style={styles.noInputCard}>
              <Ionicons name="document-text-outline" size={24} color={colors.textMuted} />
              <Text style={styles.noInputText}>No reflection written for this day</Text>
            </View>
          </View>
        )}

        {/* === EVE CONVERSATIONS === */}
        {day.eveConversations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconBg, { backgroundColor: `${colors.primary}20` }]}>
                <Ionicons name="sparkles" size={16} color={colors.primary} />
              </View>
              <Text style={styles.sectionLabel}>Eve Conversations</Text>
            </View>

            {day.eveConversations.map((convo) => (
              <View key={convo.id} style={styles.convoCard}>
                <View style={styles.convoHeader}>
                  <Text style={styles.convoTitle}>{convo.title}</Text>
                  <Text style={styles.convoTime}>{convo.timestamp}</Text>
                </View>
                <Text style={styles.convoSnippet} numberOfLines={2}>
                  {convo.snippet}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* === ACTIVITY LOG === */}
        {day.activities.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <View style={[styles.sectionIconBg, { backgroundColor: `${colors.teal}20` }]}>
                <Ionicons name="analytics-outline" size={16} color={colors.teal} />
              </View>
              <Text style={styles.sectionLabel}>Activity Log</Text>
            </View>

            {day.activities.map((act, index) => {
              const iconName = getActivityIcon(act.type);
              const iconColor = getActivityColor(act.type);
              const isLast = index === day.activities.length - 1;

              return (
                <View key={act.id} style={styles.activityRow}>
                  {/* Timeline */}
                  <View style={styles.timelineColumn}>
                    <View style={[styles.timelineDot, { backgroundColor: iconColor }]}>
                      <Ionicons name={iconName as any} size={12} color="#fff" />
                    </View>
                    {!isLast && <View style={styles.timelineLine} />}
                  </View>

                  {/* Content */}
                  <View style={styles.activityContent}>
                    <View style={styles.activityHeader}>
                      <Text style={styles.activityTime}>{act.timestamp}</Text>
                      <View style={[styles.typeBadge, { backgroundColor: `${iconColor}20` }]}>
                        <Text style={[styles.typeBadgeText, { color: iconColor }]}>
                          {act.type.charAt(0).toUpperCase() + act.type.slice(1)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.activityTitle}>{act.title}</Text>
                    <View style={styles.activityMeta}>
                      <Text style={styles.activityAuthor}>{act.author}</Text>
                      <Text style={styles.activityDot}>·</Text>
                      <Text style={styles.activityDuration}>{act.duration}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ height: 80 }} />
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
  headerSpacer: { width: 36 },
  content: {
    paddingHorizontal: 20,
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIconBg: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLabel: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },

  // Reflection card
  reflectionCard: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  moodDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodFeeling: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  moodTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  journalBlock: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 14,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
  },
  journalText: {
    ...typography.body,
    color: colors.textPrimary,
    lineHeight: 22,
    fontSize: 14,
  },

  // No input
  noInputCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.backgroundElevated,
    borderRadius: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  noInputText: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },

  // Eve conversations
  convoCard: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  convoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  convoTitle: {
    ...typography.label,
    color: colors.textPrimary,
    flex: 1,
  },
  convoTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  convoSnippet: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
  },

  // Activity timeline
  activityRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineColumn: {
    alignItems: 'center',
    width: 28,
  },
  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  activityContent: {
    flex: 1,
    paddingBottom: 16,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  activityTime: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
  },
  typeBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  activityTitle: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 3,
    fontSize: 14,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  activityDot: {
    color: colors.textMuted,
    fontSize: 10,
  },
  activityDuration: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
