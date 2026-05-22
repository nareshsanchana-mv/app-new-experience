import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { moodOptions, Mood } from '../data/reflectionsData';
import { useReflections } from '../context/ReflectionsContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

// Eve's contextual responses based on mood
const evePrompts: Record<Mood, string> = {
  amazing: "That's wonderful to hear! What made today so special? I'd love to know what's going right for you.",
  good: "Great to hear you're doing well! What's been the highlight of your day so far?",
  okay: "Thanks for checking in. Sometimes 'okay' days have hidden gems. What's been on your mind?",
  low: "I'm sorry you're feeling this way. Would you like to share what's weighing on you? Sometimes writing it out helps.",
  rough: "I hear you, and it's brave to acknowledge that. What happened today? Let's work through it together.",
};

interface ReflectionsCardProps {
  onViewAll: () => void;
  onTalkToEve?: () => void;
  onOpenDay?: (date: string) => void;
}

export default function ReflectionsCard({ onViewAll, onTalkToEve, onOpenDay }: ReflectionsCardProps) {
  const { todayEntry, reflectionHistory, stats, logMood, saveJournalText } = useReflections();
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>(todayEntry?.mood);
  const [journalText, setJournalText] = useState(todayEntry?.journalText ?? '');
  const [isSaved, setIsSaved] = useState(!!todayEntry?.mood || !!todayEntry?.journalText);

  // Past entries: last 3 non-today days that have user input or Eve conversations
  const pastEntries = reflectionHistory
    .slice(1)
    .filter(d => d.hasUserInput || d.eveConversations.length > 0)
    .slice(0, 3);

  const handleSave = () => {
    if (selectedMood) {
      logMood(selectedMood);
    }
    if (journalText.trim()) {
      saveJournalText(journalText);
    }
    if (selectedMood || journalText.trim()) {
      setIsSaved(true);
    }
  };

  const handleMoodSelect = (mood: Mood) => {
    const isSelected = selectedMood === mood;
    const next = isSelected ? undefined : mood;
    setSelectedMood(next);
    if (next) logMood(next);
  };

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="journal" size={18} color={colors.gold} />
          </View>
          <Text style={styles.sectionTitle}>Reflections</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Your daily journal & progress</Text>
      </View>

      <LinearGradient
        colors={['#2A1A4E', '#1F1638', '#1A1235']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Decorative glow blob — top right */}
        <View style={styles.decorGlow} pointerEvents="none">
          <LinearGradient
            colors={['rgba(155,143,255,0.35)', 'rgba(155,143,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.decorGlowInner}
          />
        </View>

        {/* Streak indicator */}
        <View style={styles.streakRow}>
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={12} color={colors.orange} />
            <Text style={styles.streakBadgeText}>{stats.currentStreak}-day streak</Text>
          </View>
          <Text style={styles.streakText}>{stats.daysWithInput} reflections</Text>
        </View>

        {isSaved ? (
          /* Saved state */
          <View style={styles.savedState}>
            <View style={styles.savedIcon}>
              <Ionicons name="checkmark-circle" size={28} color={colors.success} />
            </View>
            <Text style={styles.savedTitle}>Today's reflection saved</Text>
            <Text style={styles.savedSubtitle}>
              {selectedMood && `Feeling ${selectedMood}`}
              {selectedMood && journalText.trim() ? ' · ' : ''}
              {journalText.trim() ? `"${journalText.trim().substring(0, 40)}..."` : ''}
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsSaved(false)}
            >
              <Ionicons name="pencil-outline" size={14} color={colors.primary} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Mood check-in */}
            <Text style={styles.moodQuestion}>How has today been?</Text>
            <View style={styles.moodRow}>
              {moodOptions.map((option) => {
                const isSelected = selectedMood === option.mood;
                return (
                  <TouchableOpacity
                    key={option.mood}
                    style={[styles.moodOption, isSelected && styles.moodOptionSelected]}
                    onPress={() => handleMoodSelect(option.mood)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.moodEmoji}>{option.emoji}</Text>
                    <Text style={[styles.moodLabel, isSelected && styles.moodLabelSelected]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Eve prompt after mood selection */}
            {selectedMood && (
              <View style={styles.evePromptSection}>
                <View style={styles.evePromptBubble}>
                  <View style={styles.evePromptAvatar}>
                    <Ionicons name="sparkles" size={14} color={colors.primary} />
                  </View>
                  <View style={styles.evePromptContent}>
                    <Text style={styles.evePromptName}>Eve</Text>
                    <Text style={styles.evePromptText}>{evePrompts[selectedMood]}</Text>
                  </View>
                </View>

                {/* Journal input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.journalInput}
                    placeholder="Tell me more..."
                    placeholderTextColor={colors.textMuted}
                    value={journalText}
                    onChangeText={setJournalText}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                  <View style={styles.inputFooter}>
                    <TouchableOpacity style={styles.voiceButton}>
                      <Ionicons name="mic-outline" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Dual action buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.textPrimary} />
                    <Text style={styles.saveButtonText}>Save & Close</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.chatEveButton}
                    onPress={onTalkToEve}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={['#6C5CE7', '#9B8FFF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.chatEveGradient}
                    >
                      <Ionicons name="sparkles" size={16} color="#fff" />
                      <Text style={styles.chatEveText}>Go deeper</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Pre-mood: show simple input */}
            {!selectedMood && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.journalInput}
                  placeholder="What's on your mind today..."
                  placeholderTextColor={colors.textMuted}
                  value={journalText}
                  onChangeText={setJournalText}
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>
            )}

            {/* Save button when only text, no mood */}
            {!selectedMood && journalText.trim() && (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Ionicons name="bookmark-outline" size={16} color="#fff" />
                <Text style={styles.saveButtonText}>Save reflection</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {/* Today's saved Eve chats */}
        {todayEntry?.eveConversations && todayEntry.eveConversations.length > 0 && (
          <View style={styles.pastSection}>
            <Text style={styles.pastSectionTitle}>Today's Eve conversations</Text>
            {todayEntry.eveConversations.map((conv) => (
              <View key={conv.id} style={styles.pastRow}>
                <View style={styles.pastDateCol}>
                  <Ionicons name="sparkles" size={14} color={colors.primary} />
                  <Text style={styles.pastDate}>{conv.timestamp}</Text>
                </View>
                <Text style={styles.pastSnippet} numberOfLines={2}>
                  {conv.title}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Recent reflections (last 3) */}
        {pastEntries.length > 0 && (
          <View style={styles.pastSection}>
            <Text style={styles.pastSectionTitle}>Recent reflections</Text>
            {pastEntries.map((day) => {
              const moodEmoji = moodOptions.find(m => m.mood === day.mood)?.emoji;
              const snippetSource =
                day.journalText
                ?? day.eveConversations[0]?.snippet
                ?? '';
              const snippet = snippetSource.length > 70
                ? snippetSource.slice(0, 67).trimEnd() + '…'
                : snippetSource;
              return (
                <TouchableOpacity
                  key={day.date}
                  style={styles.pastRow}
                  onPress={() => onOpenDay?.(day.date)}
                  activeOpacity={0.7}
                >
                  <View style={styles.pastDateCol}>
                    <Text style={styles.pastDate}>{day.displayDate}</Text>
                    {moodEmoji && <Text style={styles.pastMoodEmoji}>{moodEmoji}</Text>}
                  </View>
                  <Text style={styles.pastSnippet} numberOfLines={2}>
                    {snippet || (day.eveConversations.length > 0 ? `${day.eveConversations.length} Eve conversation${day.eveConversations.length > 1 ? 's' : ''}` : '')}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* View all link */}
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Ionicons name="time-outline" size={16} color={colors.primaryLight} />
          <Text style={styles.viewAllText}>View all reflections & history</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primaryLight} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: `${colors.gold}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginLeft: 42,
  },

  card: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(155,143,255,0.18)',
    overflow: 'hidden',
  },
  decorGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 180,
    height: 180,
  },
  decorGlowInner: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(245,166,35,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.32)',
  },
  streakBadgeText: {
    ...typography.caption,
    color: colors.orange,
    fontWeight: '700',
  },
  streakText: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.55)',
  },

  // Mood
  moodQuestion: {
    ...typography.h4,
    color: '#FFFFFF',
    marginBottom: 14,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  moodOption: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    minWidth: 56,
  },
  moodOptionSelected: {
    borderColor: colors.primaryLight,
    backgroundColor: 'rgba(155,143,255,0.22)',
  },
  moodEmoji: {
    fontSize: 26,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.55)',
  },
  moodLabelSelected: {
    color: '#FFFFFF',
  },

  // Eve prompt
  evePromptSection: {
    gap: 12,
    marginBottom: 12,
  },
  evePromptBubble: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'rgba(155,143,255,0.16)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(155,143,255,0.32)',
  },
  evePromptAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  evePromptContent: {
    flex: 1,
  },
  evePromptName: {
    ...typography.caption,
    color: colors.primaryLight,
    fontWeight: '700',
    marginBottom: 3,
  },
  evePromptText: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
  },

  // Journal input
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  journalInput: {
    ...typography.body,
    color: '#FFFFFF',
    padding: 12,
    minHeight: 70,
    fontSize: 14,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  voiceButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(155,143,255,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(155,143,255,0.28)',
  },

  // Action buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  saveButtonText: {
    ...typography.label,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  chatEveButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chatEveGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  chatEveText: {
    ...typography.label,
    color: '#fff',
    fontWeight: '700',
  },

  // Saved state
  savedState: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  savedIcon: {
    marginBottom: 8,
  },
  savedTitle: {
    ...typography.h4,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  savedSubtitle: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(155,143,255,0.22)',
  },
  editButtonText: {
    ...typography.caption,
    color: colors.primaryLight,
    fontWeight: '600',
  },

  // Past entries
  pastSection: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    marginBottom: 4,
  },
  pastSectionTitle: {
    ...typography.label,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  pastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  pastDateCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 86,
  },
  pastDate: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
  },
  pastMoodEmoji: {
    fontSize: 14,
  },
  pastSnippet: {
    flex: 1,
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.75)',
  },

  // View all
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
    marginTop: 4,
  },
  viewAllText: {
    ...typography.bodySmall,
    color: colors.primaryLight,
    fontWeight: '600',
  },
});
