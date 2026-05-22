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
import { LinearGradient } from 'expo-linear-gradient';
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
  dark,
}: {
  onTalkToEve: () => void;
  onVoiceToEve: () => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  dark?: boolean;
}) {
  const placeholderColor = dark ? 'rgba(255,255,255,0.65)' : colors.textMuted;
  const iconColor = dark ? '#fff' : colors.primary;
  const avatarBg = dark ? 'rgba(255,255,255,0.14)' : `${colors.primary}15`;
  const micBg = dark ? 'rgba(255,255,255,0.12)' : `${colors.primary}12`;

  return (
    <TouchableOpacity
      style={[styles.composerPill, style]}
      onPress={onTalkToEve}
      activeOpacity={0.7}
    >
      <View style={[styles.composerAvatar, { backgroundColor: avatarBg }]}>
        <Ionicons name="sparkles" size={14} color={iconColor} />
      </View>
      <Text style={[styles.composerPlaceholder, { color: placeholderColor }]}>{placeholder}</Text>
      <TouchableOpacity
        style={[styles.composerMic, { backgroundColor: micBg }]}
        onPress={onVoiceToEve}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="mic" size={18} color={iconColor} />
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

  // Scenario 2: First visit (no attribution) OR free-user — dark magic hero
  if (
    (scenarioState.isFirstVisit && !scenarioState.hasAttribution) ||
    scenarioState.id === 'free-user'
  ) {
    return (
      <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
        <LinearGradient
          colors={['#1A1235', '#241845', '#2E1F58']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.magicHeroCard}
        >
          <View style={styles.magicAvatarHalo}>
            <LinearGradient
              colors={['#9B8FFF', '#6C5CE7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.magicAvatar}
            >
              <Ionicons name="sparkles" size={30} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.magicGreeting}>
            Hi {scenarioState.userName}, what brought you to Mindvalley?
          </Text>

          <ComposerPill
            onTalkToEve={onTalkToEve}
            onVoiceToEve={onVoiceToEve}
            placeholder="Type your answer…"
            style={styles.magicComposer}
            dark
          />

          <View style={styles.magicChipRow}>
            {quickReplyChips.map((chip) => (
              <TouchableOpacity
                key={chip}
                style={styles.magicChip}
                onPress={() => onChipPress(chip)}
              >
                <Text style={styles.magicChipText}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Scenarios 3-6: Return visits
  const progressPercent = scenarioState.totalLessons > 0
    ? Math.round((scenarioState.currentLesson / scenarioState.totalLessons) * 100)
    : 0;

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleTripleTap} style={styles.container}>
      {/* Eve toast — tappable, opens chat */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onTalkToEve}
      >
        <LinearGradient
          colors={['#1A1235', '#241845', '#2E1F58']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.eveToast}
        >
          <LinearGradient
            colors={['#9B8FFF', '#6C5CE7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.eveToastIcon}
          >
            <Ionicons name="sparkles" size={14} color="#fff" />
          </LinearGradient>
          <View style={styles.eveToastBody}>
            <Text style={styles.eveToastMessage}>{scenarioState.eveGreeting}</Text>
            {scenarioState.socialProof && (
              <Text style={styles.eveToastProof}>{scenarioState.socialProof}</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Continue Learning card */}
      {attributedProgram && scenarioState.currentLesson > 0 && (
        <TouchableOpacity
          style={[styles.featureCard, styles.featureCardLearn]}
          onPress={() => onStartProgram(attributedProgram.id)}
          activeOpacity={0.85}
        >
          <Image
            source={getProgramCover(attributedProgram.id)}
            style={styles.featureCardImage}
          />
          <View style={styles.featureCardInfo}>
            <Text style={[styles.featureEyebrow, { color: colors.primary }]}>
              PICK UP WHERE YOU LEFT OFF
            </Text>
            <Text style={styles.featureTitle} numberOfLines={1}>{attributedProgram.title}</Text>
            <Text style={styles.featureMeta}>
              Lesson {scenarioState.currentLesson + 1} of {scenarioState.totalLessons} · {progressPercent}%
            </Text>
            <View style={styles.featureProgressBar}>
              <View
                style={[styles.featureProgressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <View style={[styles.featureCta, { backgroundColor: colors.primary }]}>
              <Ionicons name="play" size={11} color="#fff" />
              <Text style={styles.featureCtaText}>Continue Learning</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Continue Practice card */}
      {!scenarioState.isFirstVisit && scenarioState.currentLesson > 0 && (
        <TouchableOpacity
          style={[styles.featureCard, styles.featureCardPractice]}
          onPress={() => onPlayMeditation?.(
            'med-spirit-1',
            '6-Phase Meditation',
            'Vishen',
            '/meditation-covers/6-Phase_Meditation.jpg',
            '20 min',
          )}
          activeOpacity={0.85}
        >
          <Image
            source={meditationCoversLocal['6-phase']}
            style={styles.featureCardImage}
          />
          <View style={styles.featureCardInfo}>
            <Text style={[styles.featureEyebrow, { color: colors.teal }]}>
              A MOMENT FOR YOURSELF
            </Text>
            <Text style={styles.featureTitle} numberOfLines={1}>6 Phase Meditation</Text>
            <Text style={styles.featureMeta}>Vishen · 20 min · Played yesterday</Text>
            <View style={[styles.featureCta, { backgroundColor: colors.teal }]}>
              <Ionicons name="play" size={11} color="#fff" />
              <Text style={styles.featureCtaText}>Practice Your Meditation</Text>
            </View>
          </View>
        </TouchableOpacity>
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

  // Magic Eve hero (Scenario 2) — dark palette
  magicHeroCard: {
    borderRadius: 24,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(155, 143, 255, 0.22)',
    marginBottom: 12,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 22,
    elevation: 8,
  },
  magicAvatarHalo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(155, 143, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(155, 143, 255, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },
  magicAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9B8FFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
  },
  magicGreeting: {
    ...typography.h3,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  magicComposer: {
    width: '100%',
    marginBottom: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderColor: 'rgba(255,255,255,0.18)',
  },
  magicChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  magicChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  magicChipText: {
    ...typography.caption,
    color: '#fff',
    fontWeight: '600',
  },

  // Eve toast (Return visits) — dark gradient, tappable
  eveToast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(155, 143, 255, 0.22)',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 6,
  },
  eveToastIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9B8FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  eveToastBody: {
    flex: 1,
  },
  eveToastMessage: {
    ...typography.body,
    color: '#fff',
    fontSize: 14,
    lineHeight: 19,
  },
  eveToastProof: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.65)',
    fontStyle: 'italic',
    marginTop: 3,
  },

  // Feature cards (Continue Learning / Practice)
  featureCard: {
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 14,
    overflow: 'hidden',
  },
  featureCardLearn: {
    borderWidth: 1,
    borderColor: `${colors.primary}25`,
    backgroundColor: `${colors.primary}08`,
  },
  featureCardPractice: {
    borderWidth: 1,
    borderColor: `${colors.teal}25`,
    backgroundColor: `${colors.teal}08`,
  },
  featureCardImage: {
    width: 86,
    height: 86,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  featureCardInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  featureEyebrow: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 2,
  },
  featureMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
    marginBottom: 8,
  },
  featureProgressBar: {
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: 2,
    marginBottom: 10,
  },
  featureProgressFill: {
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  featureCta: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  featureCtaText: {
    ...typography.caption,
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
});
