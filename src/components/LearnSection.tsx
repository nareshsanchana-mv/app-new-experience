import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { manifestingCollection, CollectionProgram } from '../data/manifestingCollection';
import { useDemo } from '../context/DemoContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface LearnSectionProps {
  onProgramPress: (programId: string) => void;
}

export default function LearnSection({ onProgramPress }: LearnSectionProps) {
  const { scenarioState } = useDemo();
  const collection = manifestingCollection;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Learn</Text>
        <Text style={styles.collectionName}>{collection.name}</Text>
      </View>

      {/* Social proof bar */}
      {scenarioState.currentLesson > 0 && (
        <View style={styles.socialProofBar}>
          <Ionicons name="people-outline" size={14} color={colors.textMuted} />
          <Text style={styles.socialProofText}>
            40% of people who started the same time as you are ahead of you
          </Text>
        </View>
      )}

      {/* Phase rows */}
      {(['Foundation', 'Advanced', 'Mastery'] as const).map((phase) => (
        <PhaseRow
          key={phase}
          phase={phase}
          programs={collection.phases[phase]}
          onProgramPress={onProgramPress}
          currentProgramId={scenarioState.currentProgramId}
          currentLesson={scenarioState.currentLesson}
        />
      ))}
    </View>
  );
}

interface PhaseRowProps {
  phase: string;
  programs: CollectionProgram[];
  onProgramPress: (programId: string) => void;
  currentProgramId: string;
  currentLesson: number;
}

function PhaseRow({ phase, programs, onProgramPress, currentProgramId, currentLesson }: PhaseRowProps) {
  const phaseNumber = phase === 'Foundation' ? 1 : phase === 'Advanced' ? 2 : 3;

  return (
    <View style={styles.phaseContainer}>
      <View style={styles.phaseHeader}>
        <View style={styles.phaseBadge}>
          <Text style={styles.phaseBadgeText}>{phaseNumber}</Text>
        </View>
        <Text style={styles.phaseTitle}>{phase}</Text>
        <Text style={styles.phaseCount}>{programs.length} programs</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.programScroll}
      >
        {programs.map((program) => {
          const isCurrent = program.id === currentProgramId;
          const hasProgress = isCurrent && currentLesson > 0;
          const progressPercent = hasProgress
            ? (currentLesson / program.lessons) * 100
            : 0;

          return (
            <TouchableOpacity
              key={program.id}
              style={styles.programCard}
              onPress={() => onProgramPress(program.id)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: program.image }}
                style={styles.programImage}
              />
              {hasProgress && (
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
                </View>
              )}
              <View style={styles.programInfo}>
                <Text style={styles.programTitle} numberOfLines={2}>
                  {program.title}
                </Text>
                <Text style={styles.programAuthor}>{program.author}</Text>
                <View style={styles.programMeta}>
                  <Text style={styles.programMetaText}>{program.lessons} lessons</Text>
                  <Text style={styles.programMetaDot}>·</Text>
                  <Text style={styles.programMetaText}>{program.duration}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 20,
    marginBottom: 4,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  collectionName: {
    ...typography.caption,
    color: colors.textMuted,
  },
  socialProofBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 8,
  },
  socialProofText: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: 'italic',
    flex: 1,
  },
  phaseContainer: {
    marginBottom: 20,
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  phaseBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  phaseTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  phaseCount: {
    ...typography.caption,
    color: colors.textMuted,
  },
  programScroll: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  programCard: {
    width: 150,
    marginRight: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  programImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.border,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: colors.border,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.primary,
  },
  programInfo: {
    padding: 10,
  },
  programTitle: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 2,
    fontSize: 13,
  },
  programAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  programMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  programMetaText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  programMetaDot: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
