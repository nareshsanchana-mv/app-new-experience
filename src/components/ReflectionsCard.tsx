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
import { moodOptions, Mood, getReflectionStats } from '../data/reflectionsData';
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
}

export default function ReflectionsCard({ onViewAll, onTalkToEve }: ReflectionsCardProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [journalText, setJournalText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const stats = getReflectionStats();

  const handleSave = () => {
    if (selectedMood || journalText.trim()) {
      setIsSaved(true);
    }
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

      <View style={styles.card}>
        {/* Streak indicator */}
        <View style={styles.streakRow}>
          <Ionicons name="flame" size={14} color={colors.orange} />
          <Text style={styles.streakText}>{stats.currentStreak}-day streak</Text>
          <View style={styles.streakDot} />
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
                    onPress={() => setSelectedMood(isSelected ? undefined : option.mood)}
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

        {/* View all link */}
        <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.viewAllText}>View all reflections & history</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 8,
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
    backgroundColor: colors.backgroundElevated,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  streakText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  streakDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
  },

  // Mood
  moodQuestion: {
    ...typography.h4,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  moodOption: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    minWidth: 56,
  },
  moodOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}15`,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
  },
  moodLabelSelected: {
    color: colors.primary,
  },

  // Eve prompt
  evePromptSection: {
    gap: 12,
    marginBottom: 12,
  },
  evePromptBubble: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: `${colors.primary}10`,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: `${colors.primary}20`,
  },
  evePromptAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  evePromptContent: {
    flex: 1,
  },
  evePromptName: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 3,
  },
  evePromptText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 19,
  },

  // Journal input
  inputContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  journalInput: {
    ...typography.body,
    color: colors.textPrimary,
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
    backgroundColor: colors.backgroundElevated,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.surface,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  saveButtonText: {
    ...typography.label,
    color: colors.textPrimary,
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
    color: colors.textPrimary,
    marginBottom: 4,
  },
  savedSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
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
    backgroundColor: `${colors.primary}15`,
  },
  editButtonText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },

  // View all
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  viewAllText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
});
