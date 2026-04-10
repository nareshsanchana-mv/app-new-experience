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
import { useDemo } from '../context/DemoContext';
import { allManifestingPrograms } from '../data/manifestingCollection';
import { getProgramCover } from '../data/coverAssets';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface AdaptiveGreetingProps {
  onTalkToEve: () => void;
  onStartProgram: (programId: string) => void;
  onChipPress: (chip: string) => void;
}

const quickReplyChips = ['Stress relief', 'Personal growth', 'Spirituality', 'Just exploring'];

export default function AdaptiveGreeting({ onTalkToEve, onStartProgram, onChipPress }: AdaptiveGreetingProps) {
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

        <TouchableOpacity style={styles.eveSecondary} onPress={onTalkToEve}>
          <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primary} />
          <Text style={styles.eveSecondaryText}>Something else on your mind? Talk to Eve</Text>
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

      {attributedProgram && scenarioState.currentLesson > 0 && (
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
      )}

      <TouchableOpacity style={styles.eveSecondary} onPress={onTalkToEve}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color={colors.primary} />
        <Text style={styles.eveSecondaryText}>Ask Eve anything</Text>
      </TouchableOpacity>
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

  // Eve secondary CTA
  eveSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  eveSecondaryText: {
    ...typography.bodySmall,
    color: colors.primary,
    flex: 1,
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

  // Return visit greeting
  returnGreetingCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
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
