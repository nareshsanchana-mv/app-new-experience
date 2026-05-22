import React from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { user } from '../data/mockData';
import { getCollectionCover } from '../data/coverAssets';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  collectionName?: string;
  pctComplete?: number;
  programsCompleted?: number;
  programsTotal?: number;
  lessons?: number;
  hoursMeditated?: number;
  cohortPct?: number;
  cohortLabel?: string;
}

export default function TransformationProgressCard({
  collectionName = 'Manifesting Collection',
  pctComplete = 16,
  programsCompleted = 2,
  programsTotal = 27,
  lessons = 28,
  hoursMeditated = 37,
  cohortPct = 68,
  cohortLabel = 'people at your stage finished their program',
}: Props) {
  const [titleLine1, ...rest] = collectionName.split(' ');
  const titleLine2 = rest.join(' ').toUpperCase();
  const titleLine1Upper = titleLine1.toUpperCase();

  const cover = getCollectionCover('manifesting');

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Transformation Progress</Text>

      <ImageBackground
        source={cover}
        style={styles.card}
        imageStyle={styles.cardImage}
      >
        {/* Darken layer so text stays legible regardless of cover content */}
        <LinearGradient
          colors={['rgba(10,8,4,0.25)', 'rgba(10,8,4,0.65)', 'rgba(10,8,4,0.85)']}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.cardInner}>
          {/* Title block */}
          <View style={styles.titleBlock}>
            <Text style={styles.titleDisplay} numberOfLines={1}>{titleLine1Upper}</Text>
            {!!titleLine2 && (
              <Text style={styles.titleSub} numberOfLines={1}>{titleLine2}</Text>
            )}
          </View>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${pctComplete}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{pctComplete}% complete</Text>

          {/* Stats row */}
          <View style={styles.statsRow}>
            <View style={styles.statTile}>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{programsCompleted}</Text>
                <Text style={styles.statValueUnit}>/{programsTotal}</Text>
              </View>
              <Text style={styles.statLabel}>Programs</Text>
            </View>
            <View style={styles.statTile}>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{lessons}</Text>
              </View>
              <Text style={styles.statLabel}>Lessons</Text>
            </View>
            <View style={styles.statTile}>
              <View style={styles.statValueRow}>
                <Text style={styles.statValue}>{hoursMeditated}</Text>
                <Text style={styles.statValueUnit}>h</Text>
              </View>
              <Text style={styles.statLabel}>Meditated</Text>
            </View>
          </View>

          {/* Cohort stat */}
          <View style={styles.cohortRow}>
            <View style={styles.cohortIconBadge}>
              <Ionicons name="people" size={16} color={colors.gold} />
            </View>
            <Text style={styles.cohortText}>
              <Text style={styles.cohortPct}>{cohortPct}% people </Text>
              <Text style={styles.cohortRest}>{cohortLabel}</Text>
            </Text>
            <Image
              source={typeof user.avatar === 'string' ? { uri: user.avatar } : (user.avatar as any)}
              style={styles.cohortAvatar}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    borderRadius: 24,
    overflow: 'hidden',
    minHeight: 380,
    backgroundColor: '#1A1306',
  },
  cardImage: {
    borderRadius: 24,
  },
  cardInner: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  titleBlock: {
    marginTop: 56,
    marginBottom: 24,
  },
  titleDisplay: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 0.5,
    lineHeight: 42,
  },
  titleSub: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 4,
    marginTop: 4,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.orange,
  },
  progressLabel: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 8,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  statTile: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  statValueUnit: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 2,
  },
  statLabel: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 2,
  },
  cohortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cohortIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cohortText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  cohortPct: {
    color: colors.gold,
    fontSize: 14,
    fontWeight: '600',
  },
  cohortRest: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '400',
  },
  cohortAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
});
