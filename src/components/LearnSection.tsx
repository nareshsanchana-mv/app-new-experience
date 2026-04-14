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
import { browseCollections, BrowseCollection, BrowseProgram } from '../data/allCollectionsData';
import { getProgramCover } from '../data/coverAssets';
import { useDemo } from '../context/DemoContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface LearnSectionProps {
  onProgramPress: (programId: string) => void;
}

export default function LearnSection({ onProgramPress }: LearnSectionProps) {
  const { scenarioState } = useDemo();
  const isFreeUser = scenarioState.id === 'free-user';

  if (isFreeUser) {
    return <BrowseAllCollections onProgramPress={onProgramPress} />;
  }

  return <OwnedCollectionView onProgramPress={onProgramPress} />;
}

// ═══════════════════════════════════════════════════════════
// FREE USER: Browse all 5 collections
// ═══════════════════════════════════════════════════════════

function BrowseAllCollections({ onProgramPress }: { onProgramPress: (id: string) => void }) {
  const totalPrograms = browseCollections.reduce((sum, c) => sum + c.programCount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="book" size={18} color={colors.primary} />
          </View>
          <Text style={styles.sectionTitle}>Learn</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          {browseCollections.length} collections · {totalPrograms} programs
        </Text>
      </View>

      {/* All-access banner */}
      <View style={styles.allAccessBanner}>
        <View style={styles.allAccessIconContainer}>
          <Ionicons name="diamond" size={18} color={colors.gold} />
        </View>
        <View style={styles.allAccessContent}>
          <Text style={styles.allAccessTitle}>Unlock All Collections</Text>
          <Text style={styles.allAccessSubtitle}>$299/yr per collection or $899/yr for all 5</Text>
        </View>
        <View style={styles.allAccessBadge}>
          <Text style={styles.allAccessBadgeText}>Browse</Text>
        </View>
      </View>

      {/* Collection rows */}
      {browseCollections.map((collection) => (
        <CollectionRow
          key={collection.id}
          collection={collection}
          onProgramPress={onProgramPress}
        />
      ))}
    </View>
  );
}

interface CollectionRowProps {
  collection: BrowseCollection;
  onProgramPress: (id: string) => void;
}

function CollectionRow({ collection, onProgramPress }: CollectionRowProps) {
  return (
    <View style={styles.collectionContainer}>
      {/* Collection header */}
      <View style={styles.collectionHeaderRow}>
        <View style={[styles.collectionIconBadge, { backgroundColor: `${collection.color}20` }]}>
          <Ionicons name={collection.icon as any} size={16} color={collection.color} />
        </View>
        <View style={styles.collectionHeaderText}>
          <Text style={styles.collectionName}>{collection.name}</Text>
          <Text style={styles.collectionMeta}>
            {collection.programCount} programs · ${collection.price}/yr
          </Text>
        </View>
      </View>

      {/* Program cards scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.programScroll}
      >
        {collection.programs.map((program) => (
          <BrowseProgramCard
            key={program.id}
            program={program}
            collectionColor={collection.color}
            onPress={() => onProgramPress(program.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

interface BrowseProgramCardProps {
  program: BrowseProgram;
  collectionColor: string;
  onPress: () => void;
}

function BrowseProgramCard({ program, collectionColor, onPress }: BrowseProgramCardProps) {
  const cover = getProgramCover(program.id);

  return (
    <TouchableOpacity
      style={styles.programCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {cover ? (
        <Image source={cover} style={styles.programImage} />
      ) : (
        <View style={[styles.programImagePlaceholder, { backgroundColor: `${collectionColor}25` }]}>
          <View style={[styles.placeholderIconCircle, { backgroundColor: `${collectionColor}35` }]}>
            <Ionicons name="play-circle-outline" size={28} color={collectionColor} />
          </View>
          <Text style={[styles.placeholderTitle, { color: collectionColor }]} numberOfLines={2}>
            {program.title}
          </Text>
        </View>
      )}
      <View style={styles.programInfo}>
        <Text style={styles.programTitle} numberOfLines={2}>
          {program.title}
        </Text>
        <Text style={styles.programAuthor} numberOfLines={1}>{program.author}</Text>
        <View style={styles.programMeta}>
          <Text style={styles.programMetaText}>{program.lessons} lessons</Text>
          <Text style={styles.programMetaDot}>·</Text>
          <Text style={styles.programMetaText}>{program.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ═══════════════════════════════════════════════════════════
// OWNED USER: Phased curriculum (existing behavior)
// ═══════════════════════════════════════════════════════════

function OwnedCollectionView({ onProgramPress }: { onProgramPress: (id: string) => void }) {
  const { scenarioState } = useDemo();
  const collection = manifestingCollection;

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="book" size={18} color={colors.primary} />
          </View>
          <Text style={styles.sectionTitle}>Learn</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Your curated program path</Text>
      </View>

      {/* Collection banner */}
      <View style={styles.collectionBanner}>
        <View style={styles.collectionBannerIcon}>
          <Ionicons name="diamond" size={20} color={colors.gold} />
        </View>
        <View style={styles.collectionBannerContent}>
          <Text style={styles.collectionBannerName}>{collection.name}</Text>
          <Text style={styles.collectionBannerMeta}>
            {collection.programCount} programs · 3 phases
          </Text>
        </View>
        <View style={styles.collectionBannerBadge}>
          <Ionicons name="checkmark-circle" size={14} color={colors.success} />
          <Text style={styles.collectionBannerBadgeText}>Owned</Text>
        </View>
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
        <Text style={styles.phaseTitle}>Manifesting {phase}</Text>
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
                source={getProgramCover(program.id)}
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

// ═══════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 16,
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
    backgroundColor: `${colors.primary}20`,
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

  // === All-access banner (free user) ===
  allAccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.gold}30`,
    gap: 12,
  },
  allAccessIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: `${colors.gold}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  allAccessContent: {
    flex: 1,
  },
  allAccessTitle: {
    ...typography.h4,
    color: colors.gold,
    fontWeight: '700',
  },
  allAccessSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  allAccessBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: `${colors.gold}20`,
    borderRadius: 12,
  },
  allAccessBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.gold,
  },

  // === Collection row (free user) ===
  collectionContainer: {
    marginBottom: 24,
  },
  collectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  collectionIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionHeaderText: {
    flex: 1,
  },
  collectionName: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  collectionMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 1,
  },

  // === Program image placeholder ===
  programImagePlaceholder: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 6,
  },
  placeholderIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderTitle: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    opacity: 0.8,
  },

  // === Collection banner (owned user) ===
  collectionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.gold}30`,
    gap: 12,
  },
  collectionBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.gold}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionBannerContent: {
    flex: 1,
  },
  collectionBannerName: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  collectionBannerMeta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  collectionBannerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: `${colors.success}15`,
    borderRadius: 12,
  },
  collectionBannerBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.success,
  },

  // === Social proof ===
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

  // === Phase row (owned user) ===
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

  // === Program cards (shared) ===
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
