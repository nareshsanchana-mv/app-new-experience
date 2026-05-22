import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface DayCell {
  label: string;
  state: 'completed' | 'today' | 'future';
}

interface Props {
  currentStreak?: number;
  longestStreak?: number;
  weekStrip?: DayCell[];
  caption?: string;
}

const DEFAULT_WEEK: DayCell[] = [
  { label: 'M', state: 'completed' },
  { label: 'T', state: 'completed' },
  { label: 'W', state: 'completed' },
  { label: 'T', state: 'today' },
  { label: 'F', state: 'future' },
  { label: 'S', state: 'future' },
  { label: 'S', state: 'future' },
];

export default function StreakCard({
  currentStreak = 7,
  longestStreak = 148,
  weekStrip = DEFAULT_WEEK,
  caption = 'Meditate or complete a quest lesson to earn your daily streak. Keep the momentum.',
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Top: Current + Longest summary */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Current</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.hexLarge}>⬢</Text>
              <Text style={styles.summaryNumber}>{currentStreak}</Text>
              <Text style={styles.summaryUnit}>days</Text>
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Longest</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.hexLarge}>⬢</Text>
              <Text style={styles.summaryNumber}>{longestStreak}</Text>
              <Text style={styles.summaryUnit}>days</Text>
            </View>
          </View>
        </View>

        {/* Week strip */}
        <View style={styles.weekStrip}>
          {weekStrip.map((day, idx) => (
            <View key={idx} style={styles.weekDayColumn}>
              {day.state === 'today' ? (
                <Text style={styles.weekDayLabelToday}>•</Text>
              ) : (
                <Text style={styles.weekDayLabel}>{day.label}</Text>
              )}
              {day.state === 'completed' ? (
                <View style={styles.dayHexWrap}>
                  <Text style={styles.dayHexShapeCompleted}>⬢</Text>
                  <View style={styles.dayHexCheckOverlay} pointerEvents="none">
                    <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={styles.dayHexWrap}>
                  <Text
                    style={
                      day.state === 'today'
                        ? styles.dayHexShapeTodayOutline
                        : styles.dayHexShapeFuture
                    }
                  >
                    ⬡
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Caption */}
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },

  // Top summary row
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
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
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 12,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hexLarge: {
    color: colors.success,
    fontSize: 36,
    lineHeight: 38,
  },
  summaryNumber: {
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: '700',
  },
  summaryUnit: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'italic',
    marginLeft: 2,
  },

  // Week strip
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
    marginBottom: 20,
  },
  weekDayColumn: {
    alignItems: 'center',
    width: 36,
  },
  weekDayLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    height: 18,
  },
  weekDayLabelToday: {
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 18,
    marginBottom: 8,
    height: 18,
  },
  dayHexWrap: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHexShapeCompleted: {
    color: colors.success,
    fontSize: 40,
    lineHeight: 40,
  },
  dayHexCheckOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayHexShapeTodayOutline: {
    color: colors.textPrimary,
    fontSize: 40,
    lineHeight: 40,
  },
  dayHexShapeFuture: {
    color: 'rgba(255,255,255,0.12)',
    fontSize: 40,
    lineHeight: 40,
  },

  // Caption
  caption: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
