import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface DayCell {
  label: string;
  state: 'completed' | 'missed' | 'today' | 'future';
}

interface Props {
  lastStreak?: number;
  daysSince?: number;
  weekStrip?: DayCell[];
  socialProof?: string;
}

// Visual logic: the streak ran for 3 days at the start of the week, then
// broke. The last 4 days are missed. Today's hex is empty — the user can
// restart by completing a lesson or meditation.
const DEFAULT_WEEK: DayCell[] = [
  { label: 'M', state: 'completed' },
  { label: 'T', state: 'completed' },
  { label: 'W', state: 'completed' },
  { label: 'T', state: 'missed' },
  { label: 'F', state: 'missed' },
  { label: 'S', state: 'missed' },
  { label: 'S', state: 'today' },
];

export default function StreakBrokenCard({
  lastStreak = 7,
  daysSince = 5,
  weekStrip = DEFAULT_WEEK,
  socialProof = '78% of members who return within a week finish what they started — your next streak begins the moment you press play.',
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Eyebrow row */}
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowDot} />
          <Text style={styles.eyebrow}>YOUR STREAK ENDED</Text>
        </View>

        {/* Top summary: Last streak vs Now */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Last streak</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.hexLargeSuccess}>⬢</Text>
              <Text style={styles.summaryNumber}>{lastStreak}</Text>
              <Text style={styles.summaryUnit}>days</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Now</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.hexLargeMuted}>⬡</Text>
              <Text style={[styles.summaryNumber, styles.summaryNumberMuted]}>0</Text>
              <Text style={styles.summaryUnit}>days</Text>
            </View>
          </View>
        </View>

        {/* Week strip — early week filled, latter days missed */}
        <View style={styles.weekStrip}>
          {weekStrip.map((day, idx) => (
            <View key={idx} style={styles.weekDayColumn}>
              {day.state === 'today' ? (
                <Text style={styles.weekDayLabelToday}>•</Text>
              ) : (
                <Text style={styles.weekDayLabel}>{day.label}</Text>
              )}
              <View style={styles.dayHexWrap}>
                {day.state === 'completed' && (
                  <>
                    <Text style={styles.dayHexShapeCompleted}>⬢</Text>
                    <View style={styles.dayHexOverlay} pointerEvents="none">
                      <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    </View>
                  </>
                )}
                {day.state === 'missed' && (
                  <>
                    <Text style={styles.dayHexShapeMissed}>⬡</Text>
                    <View style={styles.dayHexOverlay} pointerEvents="none">
                      <Ionicons name="close" size={14} color={colors.coral} />
                    </View>
                  </>
                )}
                {day.state === 'today' && (
                  <Text style={styles.dayHexShapeTodayOutline}>⬡</Text>
                )}
                {day.state === 'future' && (
                  <Text style={styles.dayHexShapeFuture}>⬡</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Social proof caption */}
        <View style={styles.proofRow}>
          <Ionicons
            name="people"
            size={14}
            color={colors.primaryLight}
            style={styles.proofIcon}
          />
          <Text style={styles.proof}>{socialProof}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.18)',
  },

  // Eyebrow
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.coral,
  },
  eyebrow: {
    color: colors.coral,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },

  // Top summary row
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  summaryColumn: {
    flex: 1,
    alignItems: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hexLargeSuccess: {
    color: colors.success,
    fontSize: 32,
    lineHeight: 34,
  },
  hexLargeMuted: {
    color: 'rgba(255,255,255,0.22)',
    fontSize: 32,
    lineHeight: 34,
  },
  summaryNumber: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: '700',
  },
  summaryNumberMuted: {
    color: 'rgba(255,255,255,0.55)',
  },
  summaryUnit: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
    marginLeft: 2,
  },

  // Week strip
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
    marginBottom: 18,
  },
  weekDayColumn: {
    alignItems: 'center',
    width: 34,
  },
  weekDayLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
    height: 18,
  },
  weekDayLabelToday: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 18,
    marginBottom: 6,
    height: 18,
  },
  dayHexWrap: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHexOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHexShapeCompleted: {
    color: colors.success,
    fontSize: 38,
    lineHeight: 38,
  },
  dayHexShapeMissed: {
    color: 'rgba(255, 107, 107, 0.38)',
    fontSize: 38,
    lineHeight: 38,
  },
  dayHexShapeTodayOutline: {
    color: colors.textPrimary,
    fontSize: 38,
    lineHeight: 38,
  },
  dayHexShapeFuture: {
    color: 'rgba(255,255,255,0.12)',
    fontSize: 38,
    lineHeight: 38,
  },

  // Social proof caption
  proofRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingTop: 14,
  },
  proofIcon: {
    marginTop: 2,
  },
  proof: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
});
