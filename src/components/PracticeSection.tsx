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
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface PracticeSectionProps {
  onMeditationPress: (meditationId: string, title: string, author: string, image: string, duration: string) => void;
}

export default function PracticeSection({ onMeditationPress }: PracticeSectionProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | undefined>(undefined);
  const [selectedModality, setSelectedModality] = useState<Modality | undefined>(undefined);

  const filteredMeditations = filterMeditations(selectedGoal, selectedModality);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Practice</Text>
      <Text style={styles.sectionSubtitle}>Meditations, breathwork & more</Text>

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
            <Image source={{ uri: med.image }} style={styles.meditationImage} />
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
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    paddingHorizontal: 20,
    marginBottom: 12,
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
    backgroundColor: colors.textPrimary,
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
});
