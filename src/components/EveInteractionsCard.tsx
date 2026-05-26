import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  chatMessages?: number;
  quizzesTaken?: number;
  avgQuizScore?: number;
  contentPlayed?: number;
}

export default function EveInteractionsCard({
  chatMessages = 167,
  quizzesTaken = 23,
  avgQuizScore = 92,
  contentPlayed = 29,
}: Props) {
  return (
    <View style={styles.wrapper}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <LinearGradient
            colors={['#6C5CE7', '#9B8FFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sectionIconBadge}
          >
            <Ionicons name="sparkles" size={14} color="#FFFFFF" />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Eve interactions</Text>
        </View>
        <Text style={styles.sectionSubtitle}>You and Eve, in numbers</Text>
      </View>

      <View style={styles.card}>
        {/* Subtle purple ambient glow — top right */}
        <View style={styles.glowTopRight} pointerEvents="none">
          <LinearGradient
            colors={['rgba(155,143,255,0.22)', 'rgba(155,143,255,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glowInner}
          />
        </View>

        {/* Chat messages */}
        <View style={styles.statRow}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(123,104,238,0.18)', borderColor: 'rgba(123,104,238,0.4)' }]}>
            <Ionicons name="chatbubbles" size={20} color={colors.primaryLight} />
          </View>
          <View style={styles.statBody}>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{chatMessages.toLocaleString()}</Text>
              <Text style={styles.statValueUnit}>chat messages</Text>
            </View>
            <Text style={styles.statCaption}>Conversations that shaped your journey</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Quizzes */}
        <View style={styles.statRow}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(245,200,66,0.18)', borderColor: 'rgba(245,200,66,0.4)' }]}>
            <Ionicons name="trophy" size={20} color={colors.gold} />
          </View>
          <View style={styles.statBody}>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{quizzesTaken}</Text>
              <Text style={styles.statValueUnit}>quizzes</Text>
              <View style={styles.statValueSeparator} />
              <Text style={styles.statSecondaryValue}>{avgQuizScore}%</Text>
              <Text style={styles.statValueUnit}>avg</Text>
            </View>
            <Text style={styles.statCaption}>Knowledge checks Eve gave you</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Content recommendations */}
        <View style={styles.statRow}>
          <View style={[styles.iconBadge, { backgroundColor: 'rgba(0,212,170,0.18)', borderColor: 'rgba(0,212,170,0.4)' }]}>
            <Ionicons name="play-circle" size={20} color={colors.teal} />
          </View>
          <View style={styles.statBody}>
            <View style={styles.statValueRow}>
              <Text style={styles.statValue}>{contentPlayed}</Text>
              <Text style={styles.statValueUnit}>lessons</Text>
            </View>
            <Text style={styles.statCaption}>Recommended by Eve and played</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  // Section header (matches Reflections / Transformation Progress pattern)
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  sectionIconBadge: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginLeft: 38,
  },

  // Card
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: 'rgba(155,143,255,0.14)',
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
  },
  glowInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },

  // Stat row
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 16,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBody: {
    flex: 1,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  statSecondaryValue: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  statValueUnit: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  statValueSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 4,
    alignSelf: 'center',
  },
  statCaption: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    lineHeight: 16,
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});
