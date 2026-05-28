import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface Props {
  onPress?: () => void;
}

export default function ReferAFriendCard({ onPress }: Props) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.card}>
        {/* Warm "wrapped present" gradient: deep crimson → amber → gold */}
        <LinearGradient
          colors={['#5C1A1A', '#A33820', '#E89438']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Gold sparkle glow — top right */}
        <View style={styles.glowTopRight} pointerEvents="none">
          <LinearGradient
            colors={['rgba(245,200,66,0.55)', 'rgba(245,200,66,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glowInner}
          />
        </View>
        {/* Deep crimson glow — bottom left */}
        <View style={styles.glowBottomLeft} pointerEvents="none">
          <LinearGradient
            colors={['rgba(192,58,43,0.50)', 'rgba(192,58,43,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.glowInner}
          />
        </View>

        <View style={styles.body}>
          <View style={styles.iconBadge}>
            <Ionicons name="gift" size={20} color="#FFE9C2" />
          </View>
          <View style={styles.copy}>
            <Text style={styles.eyebrow}>BRING A FRIEND</Text>
            <Text style={styles.title}>Transformation is better together</Text>
            <Text style={styles.subtitle}>
              Invite a friend — when they join, you save 20% on your next renewal.
            </Text>
            <View style={styles.ctaPill}>
              <Text style={styles.ctaText}>Invite a friend</Text>
              <Ionicons name="arrow-forward" size={14} color="#5C1A1A" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,233,194,0.28)',
    shadowColor: '#A33820',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 18,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,233,194,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,233,194,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: {
    flex: 1,
  },
  eyebrow: {
    color: '#FFE9C2',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,233,194,0.85)',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 12,
  },
  ctaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FFE9C2',
  },
  ctaText: {
    color: '#5C1A1A',
    fontSize: 12,
    fontWeight: '800',
  },

  // Decorative glows
  glowTopRight: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -80,
    left: -60,
    width: 200,
    height: 200,
  },
  glowInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});
