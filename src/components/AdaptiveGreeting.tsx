import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useDemo } from '../context/DemoContext';
import { allManifestingPrograms } from '../data/manifestingCollection';
import { getProgramCover } from '../data/coverAssets';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { meditationCoversLocal } from '../data/coverAssets';

interface AdaptiveGreetingProps {
  onTalkToEve: () => void;
  onStartProgram: (programId: string) => void;
  onChipPress: (chip: string) => void;
  onPlayMeditation?: (id: string, title: string, author: string, image: string, duration: string) => void;
}

const quickReplyChips = ['Stress relief', 'Personal growth', 'Spirituality', 'Just exploring'];

export default function AdaptiveGreeting({ onTalkToEve, onStartProgram, onChipPress, onPlayMeditation }: AdaptiveGreetingProps) {
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
        <Text style={styles.greeting}>Hi, {scenarioState.userName}</Text>

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
              <Text style={styles.heroProgramLabel}>START NOW</Text>
              <Text style={styles.heroProgramTitle}>{attributedProgram.title}</Text>
              <Text style={styles.heroProgramAuthor}>{attributedProgram.author}</Text>
              <View style={styles.playButton}>
                <Ionicons name="play" size={20} color="#fff" />
                <Text style={styles.playButtonText}>Begin Lesson 1</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={onTalkToEve} activeOpacity={0.85}>
          <LinearGradient
            colors={['#6C5CE7', '#9B8FFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.eveCta}
          >
            <View style={styles.eveCtaIcon}>
              <Ionicons name="sparkles" size={18} color="#fff" />
            </View>
            <View style={styles.eveCtaContent}>
              <Text style={styles.eveCtaTitle}>Talk to Eve</Text>
              <Text style={styles.eveCtaSubtitle}>Something else on your mind?</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  // Scenario 2: Type 2 first visit (no attribution)
  if (scenarioState.isFirstVisit && !scenarioState.hasAttribution) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
        <View style={styles.eveHeroSection}>
          <View style={styles.eveAvatar}>
            <Ionicons name="sparkles" size={24} color={colors.primary} />
          </View>
          <Text style={styles.eveHeroGreeting}>{scenarioState.eveGreeting}</Text>

          <TouchableOpacity style={styles.chatInputFake} onPress={onTalkToEve}>
            <Ionicons name="chatbubble-outline" size={18} color={colors.textMuted} />
            <Text style={styles.chatInputPlaceholder}>Type your answer...</Text>
          </TouchableOpacity>

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

      {/* Eve greeting + Ask Eve combined */}
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
        <TouchableOpacity onPress={onTalkToEve} style={styles.askEveInline} activeOpacity={0.7}>
          <Ionicons name="chatbubble-outline" size={14} color={colors.primary} />
          <Text style={styles.askEveInlineText}>Ask Eve anything</Text>
          <Ionicons name="chevron-forward" size={14} color={colors.primary} />
        </TouchableOpacity>
      </View>

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
    justifyContent: 'flex-end',
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
    marginBottom: 12,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    gap: 6,
  },
  playButtonText: {
    ...typography.label,
    color: '#fff',
    fontWeight: '600',
  },

  // Eve gradient CTA
  eveCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  eveCtaIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eveCtaContent: {
    flex: 1,
  },
  eveCtaTitle: {
    ...typography.label,
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  eveCtaSubtitle: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 1,
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
  chatInputFake: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  chatInputPlaceholder: {
    ...typography.body,
    color: colors.textMuted,
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
  askEveInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: `${colors.primary}08`,
  },
  askEveInlineText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
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
