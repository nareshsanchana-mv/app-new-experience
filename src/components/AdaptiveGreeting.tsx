import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  TouchableOpacity,
  Image,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDemo } from '../context/DemoContext';
import { allManifestingPrograms } from '../data/manifestingCollection';
import { getProgramCover } from '../data/coverAssets';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { meditationCoversLocal } from '../data/coverAssets';

interface AdaptiveGreetingProps {
  onTalkToEve: () => void;
  onVoiceToEve: () => void;
  onStartProgram: (programId: string) => void;
  onChipPress: (chip: string) => void;
  onPlayMeditation?: (id: string, title: string, author: string, image: string, duration: string) => void;
}

const quickReplyChips = ['Stress relief', 'Personal growth', 'Spirituality', 'Just exploring'];

function ComposerPill({
  onTalkToEve,
  onVoiceToEve,
  placeholder = 'Message Eve…',
  style,
}: {
  onTalkToEve: () => void;
  onVoiceToEve: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      style={[styles.composerPill, style]}
      onPress={onTalkToEve}
      activeOpacity={0.7}
    >
      <View style={styles.composerAvatar}>
        <Ionicons name="sparkles" size={14} color={colors.primary} />
      </View>
      <Text style={styles.composerPlaceholder}>{placeholder}</Text>
      <TouchableOpacity
        style={styles.composerMic}
        onPress={onVoiceToEve}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="mic" size={18} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function AdaptiveGreeting({ onTalkToEve, onVoiceToEve, onStartProgram, onChipPress, onPlayMeditation }: AdaptiveGreetingProps) {
  const { scenarioState, toggleDemoPanel } = useDemo();
  const tapCount = useRef(0);
  const lastTap = useRef(0);

  const handleTripleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 500) {
      tapCount.current += 1;
    } else {
      tapCount.current = 1;
    }
    lastTap.current = now;
    if (tapCount.current >= 3) {
      tapCount.current = 0;
      toggleDemoPanel();
    }
  };

  const attributedProgram = scenarioState.hasAttribution
    ? allManifestingPrograms.find(p => p.id === scenarioState.currentProgramId)
    : null;

  // Scenario 1: Type 1 first visit (has attribution)
  if (scenarioState.isFirstVisit && scenarioState.hasAttribution) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
        <Text style={styles.welcomeHeadline}>
          Welcome to Mindvalley, {scenarioState.userName}!
        </Text>
        <Text style={styles.welcomeSubhead}>Your transformation starts now.</Text>

        {attributedProgram && (
          <TouchableOpacity
            style={styles.heroProgramCard}
            onPress={() => onStartProgram(attributedProgram.id)}
          >
            <Image
              source={getProgramCover(attributedProgram.id)}
              style={styles.heroProgramImage}
            />
            <View style={styles.heroProgramOverlay}>
              <View>
                <Text style={styles.heroProgramLabel}>START NOW</Text>
                <Text style={styles.heroProgramTitle}>{attributedProgram.title}</Text>
                <Text style={styles.heroProgramAuthor}>{attributedProgram.author}</Text>
              </View>
              <View style={styles.playButton}>
                <Ionicons name="play" size={20} color="#000" />
                <Text style={styles.playButtonText}>Begin Lesson 1</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <View style={styles.conversationStarter}>
          <View style={styles.conversationHeader}>
            <View style={styles.conversationAvatar}>
              <Ionicons name="sparkles" size={20} color={colors.primary} />
            </View>
            <View style={styles.conversationTitleWrap}>
              <Text style={styles.conversationTitle}>Something else on your mind?</Text>
              <Text style={styles.conversationSubtitle}>
                Eve, your AI guide, is here to help you find your path.
              </Text>
            </View>
          </View>
          <ComposerPill
            onTalkToEve={onTalkToEve}
            onVoiceToEve={onVoiceToEve}
            style={styles.conversationComposer}
          />
        </View>
      </TouchableOpacity>
    );
  }

  // Scenario 2: Type 2 first visit (no attribution)
  if (scenarioState.isFirstVisit && !scenarioState.hasAttribution) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
        <Text style={styles.welcomeHeadline}>
          Welcome to Mindvalley, {scenarioState.userName}!
        </Text>
        <Text style={styles.welcomeSubhead}>Your transformation starts now.</Text>

        <View style={styles.eveHeroSection}>
          <View style={styles.eveAvatar}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
          </View>
          <Text style={styles.eveHeroGreeting}>{scenarioState.eveGreeting}</Text>

          <ComposerPill
            onTalkToEve={onTalkToEve}
            onVoiceToEve={onVoiceToEve}
          />

          <View style={styles.chipRow}>
            {quickReplyChips.map((chip) => (
              <TouchableOpacity
                key={chip}
                style={styles.chip}
                onPress={() => onChipPress(chip)}
              >
                <Text style={styles.chipText}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Scenarios 3-6: Return visits
  return (
    <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
      <Text style={styles.greeting}>Hi, {scenarioState.userName}</Text>

      {/* Eve greeting card */}
      <View style={styles.returnEveBlock}>
        <View style={styles.returnGreetingCard}>
          <View style={styles.eveAvatarSmall}>
            <Ionicons name="sparkles" size={16} color={colors.primary} />
          </View>
          <View style={styles.returnGreetingContent}>
            <Text style={styles.returnGreetingText}>{scenarioState.eveGreeting}</Text>
            {scenarioState.socialProof && (
              <Text style={styles.socialProofText}>{scenarioState.socialProof}</Text>
            )}
          </View>
        </View>
      </View>

      {/* Composer pill */}
      <ComposerPill
        onTalkToEve={onTalkToEve}
        onVoiceToEve={onVoiceToEve}
      />

      {/* Continue program card */}
      {attributedProgram && scenarioState.currentLesson > 0 && (
        <>
          <View style={styles.continueSectionLabel}>
            <Ionicons name="book" size={13} color={colors.primary} />
            <Text style={styles.continueSectionLabelText}>Learn</Text>
          </View>
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => onStartProgram(attributedProgram.id)}
          >
            <Image
              source={getProgramCover(attributedProgram.id)}
              style={styles.continueImage}
            />
            <View style={styles.continueInfo}>
              <Text style={styles.continueTitle}>{attributedProgram.title}</Text>
              <Text style={styles.continueLesson}>
                Lesson {scenarioState.currentLesson + 1} of {scenarioState.totalLessons}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(scenarioState.currentLesson / scenarioState.totalLessons) * 100}%` },
                  ]}
                />
              </View>
            </View>
            <Ionicons name="play-circle" size={36} color={colors.primary} />
          </TouchableOpacity>
        </>
      )}

      {/* Last played meditation */}
      {!scenarioState.isFirstVisit && scenarioState.currentLesson > 0 && (
        <>
          <View style={styles.continueSectionLabel}>
            <Ionicons name="leaf" size={13} color={colors.teal} />
            <Text style={[styles.continueSectionLabelText, { color: colors.teal }]}>Practice</Text>
          </View>
          <TouchableOpacity
            style={styles.continueCard}
            onPress={() => onPlayMeditation?.(
              'med-spirit-1',
              '6-Phase Meditation',
              'Vishen',
              '/meditation-covers/6-Phase_Meditation.jpg',
              '20 min',
            )}
          >
            <Image
              source={meditationCoversLocal['6-phase']}
              style={styles.continueImage}
            />
            <View style={styles.continueInfo}>
              <Text style={styles.continueTitle}>6-Phase Meditation</Text>
              <Text style={styles.continueLesson}>Vishen · 20 min</Text>
              <Text style={styles.lastPlayedHint}>Played yesterday</Text>
            </View>
            <Ionicons name="play-circle" size={36} color={colors.teal} />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  welcomeHeadline: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  welcomeSubhead: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 16,
  },

  // Hero program card (Scenario 1)
  heroProgramCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    height: 200,
  },
  heroProgramImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surface,
  },
  heroProgramOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'space-between',
    padding: 16,
  },
  heroProgramLabel: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  heroProgramTitle: {
    ...typography.h3,
    color: '#fff',
    marginBottom: 2,
  },
  heroProgramAuthor: {
    ...typography.bodySmall,
    color: 'rgba(255,255,255,0.8)',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 6,
  },
  playButtonText: {
    ...typography.label,
    color: '#000',
    fontWeight: '600',
  },

  // Composer pill (used across all scenarios)
  composerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  composerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  composerPlaceholder: {
    ...typography.body,
    color: colors.textMuted,
    flex: 1,
  },
  composerMic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Conversation starter frame (Scenario 1)
  conversationStarter: {
    backgroundColor: `${colors.primary}10`,
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  conversationAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  conversationTitleWrap: {
    flex: 1,
  },
  conversationTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  conversationSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  conversationComposer: {
    marginBottom: 0,
    backgroundColor: colors.background,
  },

  // Eve hero (Scenario 2)
  eveHeroSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  eveAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  eveHeroGreeting: {
    ...typography.h3,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: `${colors.primary}12`,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  chipText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },

  // Return visit Eve block (greeting + ask eve combined)
  returnEveBlock: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
  },
  returnGreetingCard: {
    flexDirection: 'row',
    padding: 14,
    gap: 10,
  },
  eveAvatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  returnGreetingContent: {
    flex: 1,
  },
  returnGreetingText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  socialProofText: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
  },

  // Continue section labels
  continueSectionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },
  continueSectionLabelText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
  },
  lastPlayedHint: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontStyle: 'italic',
    marginTop: 2,
  },

  // Continue card
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  continueImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.border,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  continueLesson: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
