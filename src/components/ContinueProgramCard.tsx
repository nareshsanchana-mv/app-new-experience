import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface ContinueProgramCardProps {
  programName: string;
  lessonTitle: string;
  author: string;
  image: string | ImageSourcePropType;
  progress: number;
  lessonsCompleted: number;
  totalLessons: number;
  duration?: string;
  onPress?: () => void;
}

export default function ContinueProgramCard({
  programName,
  lessonTitle,
  author,
  image,
  progress,
  lessonsCompleted,
  totalLessons,
  duration,
  onPress,
}: ContinueProgramCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.imageContainer}>
        <Image
          source={typeof image === 'string' ? { uri: image } : (image as ImageSourcePropType)}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.lessonTitle} numberOfLines={2}>{lessonTitle}</Text>
        </View>
        {duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.meta}>
        <View style={styles.titleRow}>
          <Text style={styles.programName} numberOfLines={2}>{programName}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.playBtn}>
              <Ionicons name="play" size={16} color={colors.background} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listBtn}>
              <Ionicons name="list" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.completedText}>{lessonsCompleted} of {totalLessons} completed</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    marginRight: 14,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.backgroundCard,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(10,14,23,0.5)',
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 48,
    right: 12,
    backgroundColor: 'rgba(10,14,23,0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  meta: {
    paddingHorizontal: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  programName: {
    flex: 1,
    fontSize: 13,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginRight: 8,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listBtn: {
    padding: 4,
  },
  progressTrack: {
    height: 3,
    backgroundColor: colors.progressTrack,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.magenta,
    borderRadius: 2,
  },
  completedText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
