import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  goalCategories,
  modalities,
  filterMeditations,
  GoalCategory,
  Modality,
} from '../data/meditationLibrary';
import { getMeditationCover, meditationCoversLocal } from '../data/coverAssets';
import { useDemo } from '../context/DemoContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface PracticeSectionProps {
  onMeditationPress: (meditationId: string, title: string, author: string, image: string, duration: string) => void;
}

interface TopMeditation {
  id: string;
  coverKey: keyof typeof meditationCoversLocal;
  imagePath: string;
  title: string;
  author: string;
  duration: string;
  rating: number;
  ratingCount: number;
}

const topMeditations: TopMeditation[] = [
  {
    id: 'top-1',
    coverKey: '6-phase',
    imagePath: '/meditation-covers/6-Phase_Meditation.jpg',
    title: '6 Phase Meditation',
    author: 'Vishen',
    duration: '20 min',
    rating: 4.9,
    ratingCount: 48213,
  },
  {
    id: 'top-2',
    coverKey: 'abundance',
    imagePath: '/meditation-covers/Abundance_Meditation.jpg',
    title: 'Abundance Meditation',
    author: 'Marisa Peer',
    duration: '15 min',
    rating: 4.8,
    ratingCount: 21407,
  },
  {
    id: 'top-3',
    coverKey: 'profound-sleep',
    imagePath: '/meditation-covers/Profound_Sleep.jpg',
    title: 'Profound Sleep',
    author: 'Emily Fletcher',
    duration: '25 min',
    rating: 4.9,
    ratingCount: 18934,
  },
  {
    id: 'top-4',
    coverKey: 'deep-relaxation',
    imagePath: '/meditation-covers/Deep_Relaxation.jpg',
    title: 'Deep Relaxation',
    author: 'Niraj Naik',
    duration: '18 min',
    rating: 4.7,
    ratingCount: 12608,
  },
  {
    id: 'top-5',
    coverKey: 'releasing-anxiety',
    imagePath: '/meditation-covers/Releasing_Anxiety.jpg',
    title: 'Releasing Anxiety',
    author: 'Marisa Peer',
    duration: '12 min',
    rating: 4.8,
    ratingCount: 15722,
  },
  {
    id: 'top-6',
    coverKey: 'clarity-vision',
    imagePath: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
    title: 'Clarity of Vision',
    author: 'Regan Hillyer',
    duration: '15 min',
    rating: 4.7,
    ratingCount: 8901,
  },
  {
    id: 'top-7',
    coverKey: 'manifesting-hwl',
    imagePath: '/meditation-covers/Manifesting_Health_Wealth_Love.jpg',
    title: 'Manifesting Health, Wealth & Love',
    author: 'Regan Hillyer',
    duration: '15 min',
    rating: 4.8,
    ratingCount: 11385,
  },
  {
    id: 'top-8',
    coverKey: 'sink-back',
    imagePath: '/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg',
    title: 'Sink Back Into Deeper Sleep',
    author: 'House of Wellbeing',
    duration: '20 min',
    rating: 4.6,
    ratingCount: 7264,
  },
  {
    id: 'top-9',
    coverKey: 'sleep-body-scan',
    imagePath: '/meditation-covers/Sleep_Inducing_Body_Scan.jpg',
    title: 'Sleep-Inducing Body Scan',
    author: 'Emily Fletcher',
    duration: '22 min',
    rating: 4.7,
    ratingCount: 9483,
  },
  {
    id: 'top-10',
    coverKey: 'third-eye',
    imagePath: '/meditation-covers/Third_Eye_Chakra_Intuition_Wisdom.jpg',
    title: 'Third Eye Chakra: Intuition & Wisdom',
    author: 'Anodea Judith',
    duration: '17 min',
    rating: 4.7,
    ratingCount: 6051,
  },
];

function formatRatingCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(count);
}

function NewUserTopMeditationsView({
  onMeditationPress,
}: {
  onMeditationPress: PracticeSectionProps['onMeditationPress'];
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="leaf" size={18} color={colors.teal} />
          </View>
          <Text style={styles.sectionTitle}>Your Meditations</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Included in your subscription</Text>
      </View>

      {/* 1,000+ stat banner */}
      <View style={styles.statBanner}>
        <View style={styles.statBannerIcon}>
          <Ionicons name="infinite" size={20} color={colors.teal} />
        </View>
        <View style={styles.statBannerContent}>
          <Text style={styles.statBannerNumber}>1,000+</Text>
          <Text style={styles.statBannerLabel}>meditations &amp; sounds included in your plan</Text>
        </View>
      </View>

      {/* Top 10 sub-header */}
      <View style={styles.topTenHeader}>
        <Text style={styles.topTenTitle}>Our most popular meditations</Text>
        <Text style={styles.topTenSubtitle}>Most loved by Mindvalley members</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topTenScroll}
      >
        {topMeditations.map((med, idx) => (
          <TouchableOpacity
            key={med.id}
            style={styles.topCard}
            onPress={() => onMeditationPress(med.id, med.title, med.author, med.imagePath, med.duration)}
            activeOpacity={0.85}
          >
            <View style={styles.topCardImageWrap}>
              <Image source={meditationCoversLocal[med.coverKey]} style={styles.topCardImage} />
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>{idx + 1}</Text>
              </View>
            </View>
            <View style={styles.topCardInfo}>
              <Text style={styles.topCardTitle} numberOfLines={2}>{med.title}</Text>
              <Text style={styles.topCardAuthor} numberOfLines={1}>{med.author}</Text>
              <View style={styles.topCardRatingRow}>
                <Ionicons name="star" size={12} color={colors.gold} />
                <Text style={styles.topCardRating}>{med.rating.toFixed(1)}</Text>
                <Text style={styles.topCardRatingCount}>({formatRatingCount(med.ratingCount)})</Text>
                <Text style={styles.topCardMetaDot}>·</Text>
                <Text style={styles.topCardDuration}>{med.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export default function PracticeSection({ onMeditationPress }: PracticeSectionProps) {
  const { scenarioState } = useDemo();
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(undefined);
  const [selectedModality, setSelectedModality] = useState<Modality | undefined>(undefined);

  if (scenarioState.id !== 'free-user') {
    return <NewUserTopMeditationsView onMeditationPress={onMeditationPress} />;
  }

  const filteredMeditations = filterMeditations(selectedGoal, selectedModality);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={styles.sectionIcon}>
            <Ionicons name="leaf" size={18} color={colors.teal} />
          </View>
          <Text style={styles.sectionTitle}>Practice</Text>
        </View>
        <Text style={styles.sectionSubtitle}>Meditations, breathwork & more</Text>
      </View>

      {/* Goal category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipScroll}
        style={styles.chipScrollContainer}
      >
        <TouchableOpacity
          style={[styles.goalChip, !selectedGoal && styles.goalChipActive]}
          onPress={() => setSelectedGoal(undefined)}
        >
          <Text style={[styles.goalChipText, !selectedGoal && styles.goalChipTextActive]}>All</Text>
        </TouchableOpacity>
        {goalCategories.map((goal) => (
          <TouchableOpacity
            key={goal}
            style={[styles.goalChip, selectedGoal === goal && styles.goalChipActive]}
            onPress={() => setSelectedGoal(selectedGoal === goal ? undefined : goal)}
          >
            <Text style={[styles.goalChipText, selectedGoal === goal && styles.goalChipTextActive]}>
              {goal}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modality filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.modalityScroll}
      >
        <TouchableOpacity
          style={[styles.modalityChip, !selectedModality && styles.modalityChipActive]}
          onPress={() => setSelectedModality(undefined)}
        >
          <Text style={[styles.modalityText, !selectedModality && styles.modalityTextActive]}>All Types</Text>
        </TouchableOpacity>
        {modalities.map((mod) => {
          const icon = getModalityIcon(mod);
          return (
            <TouchableOpacity
              key={mod}
              style={[styles.modalityChip, selectedModality === mod && styles.modalityChipActive]}
              onPress={() => setSelectedModality(selectedModality === mod ? undefined : mod)}
            >
              <Ionicons
                name={icon}
                size={14}
                color={selectedModality === mod ? '#fff' : colors.textSecondary}
              />
              <Text style={[styles.modalityText, selectedModality === mod && styles.modalityTextActive]}>
                {mod}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Results count */}
      <Text style={styles.resultCount}>
        {filteredMeditations.length} {filteredMeditations.length === 1 ? 'practice' : 'practices'}
      </Text>

      {/* Meditation cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.meditationScroll}
      >
        {filteredMeditations.map((med) => (
          <TouchableOpacity
            key={med.id}
            style={styles.meditationCard}
            onPress={() => onMeditationPress(med.id, med.title, med.author, med.image, med.duration)}
            activeOpacity={0.8}
          >
            <Image source={getMeditationCover(med.image)} style={styles.meditationImage} />
            <View style={styles.meditationInfo}>
              <View style={styles.modalityTag}>
                <Text style={styles.modalityTagText}>{med.modality}</Text>
              </View>
              <Text style={styles.meditationTitle} numberOfLines={2}>{med.title}</Text>
              <Text style={styles.meditationAuthor}>{med.author}</Text>
              <View style={styles.meditationMeta}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                <Text style={styles.meditationDuration}>{med.duration}</Text>
                {med.bestTime && (
                  <>
                    <Text style={styles.metaDot}>·</Text>
                    <Text style={styles.meditationBestTime}>{med.bestTime}</Text>
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredMeditations.length === 0 && (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={32} color={colors.textMuted} />
          <Text style={styles.emptyText}>No practices match your filters</Text>
        </View>
      )}
    </View>
  );
}

function getModalityIcon(modality: Modality): keyof typeof Ionicons.glyphMap {
  switch (modality) {
    case 'Meditation': return 'leaf-outline';
    case 'Breathwork': return 'water-outline';
    case 'Hypnotherapy': return 'pulse-outline';
    case 'Visualization': return 'eye-outline';
    case 'Sound Healing': return 'musical-notes-outline';
    case 'Soundscape': return 'headset-outline';
    default: return 'ellipse-outline';
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
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
    backgroundColor: `${colors.teal}20`,
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
  chipScrollContainer: {
    marginBottom: 8,
  },
  chipScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  goalChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  goalChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  goalChipText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  goalChipTextActive: {
    color: '#fff',
  },
  modalityScroll: {
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 12,
  },
  modalityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  modalityChipActive: {
    backgroundColor: colors.primary,
  },
  modalityText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 11,
  },
  modalityTextActive: {
    color: '#fff',
  },
  resultCount: {
    ...typography.caption,
    color: colors.textMuted,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  meditationScroll: {
    paddingHorizontal: 20,
  },
  meditationCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  meditationImage: {
    width: '100%',
    height: 100,
    backgroundColor: colors.border,
  },
  meditationInfo: {
    padding: 10,
  },
  modalityTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: `${colors.primary}12`,
    borderRadius: 8,
    marginBottom: 6,
  },
  modalityTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
  },
  meditationTitle: {
    ...typography.label,
    color: colors.textPrimary,
    fontSize: 13,
    marginBottom: 2,
  },
  meditationAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  meditationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  meditationDuration: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  metaDot: {
    color: colors.textMuted,
    fontSize: 11,
  },
  meditationBestTime: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },

  // === Silva top-10 view ===
  statBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: `${colors.teal}10`,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${colors.teal}30`,
  },
  statBannerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: `${colors.teal}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statBannerContent: {
    flex: 1,
  },
  statBannerNumber: {
    ...typography.h3,
    color: colors.teal,
    fontWeight: '700',
  },
  statBannerLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 1,
  },
  topTenHeader: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  topTenTitle: {
    ...typography.h4,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  topTenSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  topTenScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  topCard: {
    width: 180,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  topCardImageWrap: {
    position: 'relative',
  },
  topCardImage: {
    width: '100%',
    height: 110,
    backgroundColor: colors.border,
  },
  rankBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    minWidth: 28,
    height: 28,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankBadgeText: {
    ...typography.caption,
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  topCardInfo: {
    padding: 10,
  },
  topCardTitle: {
    ...typography.label,
    color: colors.textPrimary,
    fontSize: 13,
    marginBottom: 2,
  },
  topCardAuthor: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  topCardRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  topCardRating: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: 11,
  },
  topCardRatingCount: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  topCardMetaDot: {
    color: colors.textMuted,
    fontSize: 11,
    marginHorizontal: 2,
  },
  topCardDuration: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
});
