import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getProgramCover } from '../data/coverAssets';
import { getMeditationCoverUrl } from '../data/meditationCoverUrls';
import { getSoundCoverUrl } from '../data/soundCoverUrls';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface Props {
  onProgramPress: (programId: string) => void;
  onPlayMeditation: (id: string, title: string, author: string, image: string, duration: string) => void;
  onPlaySound: (id: string, title: string, author: string) => void;
}

// ─── Free content lists ────────────────────────────────────────────────────
// Hardcoded for the prototype. In a real app these would come from a feed
// keyed by entitlement (free tier sample, rotating weekly, etc).

const FREE_PROGRAMS: { id: string; title: string; author: string; meta: string }[] = [
  { id: 'sums', title: 'The Silva Ultramind System', author: 'Vishen Lakhiani', meta: '28 lessons · Free intro' },
  { id: '6pm', title: 'The 6 Phase Meditation', author: 'Vishen Lakhiani', meta: '15 lessons · Free intro' },
  { id: 'be',   title: 'Be Extraordinary',         author: 'Vishen Lakhiani', meta: '30 lessons · Free intro' },
  { id: 'sb',   title: 'Superbrain',                author: 'Jim Kwik',         meta: '36 lessons · Free intro' },
  { id: 'sai',  title: 'Speak and Inspire',         author: 'Lisa Nichols',     meta: '24 lessons · Free intro' },
  { id: 'cv',   title: 'Creative Visualization',    author: 'Shakti Gawain',    meta: '21 lessons · Free intro' },
];

const SHORT_MEDITATIONS: { id: string; title: string; author: string; duration: string }[] = [
  { id: 'med-5pp',  title: '5 Minutes of Pure Peace',         author: 'Mindvalley',    duration: '5 min' },
  { id: 'med-qbs',  title: 'Quick Body Scan for Sleep',       author: 'Vishen',        duration: '4 min' },
  { id: 'med-qsr',  title: 'Quick Stress & Worry Releaser',   author: 'Vishen',        duration: '4 min' },
  { id: 'med-qcb',  title: 'Quick Confidence Booster',        author: 'Vishen',        duration: '3 min' },
  { id: 'med-qsa',  title: 'Quick Stress and Anger Management', author: 'Vishen',      duration: '5 min' },
];

const FREE_SOUNDS: { id: string; title: string; author: string }[] = [
  { id: 'snd-ocean',    title: 'Ocean Healing',     author: 'Gabriel Loynaz' },
  { id: 'snd-bliss',    title: 'Bliss',             author: 'Mindvalley Audiowaves' },
  { id: 'snd-sunset',   title: 'Sunset Walk',       author: 'Mindvalley Audiowaves' },
  { id: 'snd-pureflow', title: 'Pure Flow',         author: 'Mindvalley Audiowaves' },
  { id: 'snd-cozy',     title: 'Cozy Fireplace',    author: 'Mindvalley Audiowaves' },
  { id: 'snd-tranquil', title: 'Tranquility',       author: 'Mindvalley Audiowaves' },
];

export default function FreeUserContent({ onProgramPress, onPlayMeditation, onPlaySound }: Props) {
  return (
    <View style={styles.container}>
      {/* ── Free content to get started ───────────────────────── */}
      <Section
        eyebrow="GET STARTED"
        title="Free content to get started"
        subtitle="Sample programs from the Mindvalley library — no card required"
        iconName="gift"
        iconColor={colors.gold}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {FREE_PROGRAMS.map((p) => {
            const cover = getProgramCover(p.id);
            return (
              <TouchableOpacity
                key={p.id}
                style={styles.programCard}
                onPress={() => onProgramPress(p.id)}
                activeOpacity={0.85}
              >
                <Image source={cover} style={styles.programImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.cardOverlay}
                >
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeBadgeText}>FREE</Text>
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={2}>{p.title}</Text>
                  <Text style={styles.cardMeta} numberOfLines={1}>{p.author}</Text>
                  <Text style={styles.cardMetaSmall} numberOfLines={1}>{p.meta}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Section>

      {/* ── Try a meditation ───────────────────────────────────── */}
      <Section
        eyebrow="UNDER 5 MINUTES"
        title="Try a meditation"
        subtitle="Short practices to fit your day"
        iconName="leaf"
        iconColor={colors.teal}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {SHORT_MEDITATIONS.map((m) => {
            const cover = getMeditationCoverUrl(m.title);
            return (
              <TouchableOpacity
                key={m.id}
                style={styles.meditationCard}
                onPress={() => onPlayMeditation(m.id, m.title, m.author, '', m.duration)}
                activeOpacity={0.85}
              >
                {cover ? (
                  <Image source={cover} style={styles.meditationImage} />
                ) : (
                  <View style={[styles.meditationImage, { backgroundColor: colors.surface }]} />
                )}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.85)']}
                  style={styles.cardOverlay}
                >
                  <View style={styles.durationPill}>
                    <Ionicons name="time-outline" size={10} color="#fff" />
                    <Text style={styles.durationPillText}>{m.duration}</Text>
                  </View>
                  <Text style={styles.cardTitle} numberOfLines={2}>{m.title}</Text>
                  <Text style={styles.cardMeta} numberOfLines={1}>{m.author}</Text>
                </LinearGradient>
                <View style={styles.playBadge}>
                  <Ionicons name="play" size={12} color="#000" />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Section>

      {/* ── Play a sound to relax ──────────────────────────────── */}
      <Section
        eyebrow="UNWIND"
        title="Play a sound to relax"
        subtitle="Soundscapes for focus, sleep, and ease"
        iconName="musical-notes"
        iconColor={colors.primaryLight}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {FREE_SOUNDS.map((s) => {
            const cover = getSoundCoverUrl(s.title);
            return (
              <TouchableOpacity
                key={s.id}
                style={styles.soundCard}
                onPress={() => onPlaySound(s.id, s.title, s.author)}
                activeOpacity={0.85}
              >
                {cover ? (
                  <Image source={cover} style={styles.soundImage} />
                ) : (
                  <LinearGradient
                    colors={['#0F3D52', '#0E5A6B', '#1F8073']}
                    style={styles.soundImage}
                  />
                )}
                <View style={styles.playBadgeSmall}>
                  <Ionicons name="play" size={11} color="#000" />
                </View>
                <Text style={styles.soundTitle} numberOfLines={1}>{s.title}</Text>
                <Text style={styles.soundAuthor} numberOfLines={1}>{s.author}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </Section>
    </View>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────

function Section({
  eyebrow,
  title,
  subtitle,
  iconName,
  iconColor,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  iconName: any;
  iconColor: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <View style={[styles.sectionIconBadge, { backgroundColor: `${iconColor}1A`, borderColor: `${iconColor}55` }]}>
            <Ionicons name={iconName} size={16} color={iconColor} />
          </View>
          <View style={styles.sectionTitleCol}>
            <Text style={[styles.sectionEyebrow, { color: iconColor }]}>{eyebrow}</Text>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        </View>
        {!!subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },

  // Section
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  sectionIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitleCol: {
    flex: 1,
  },
  sectionEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginLeft: 48,
    marginTop: 2,
  },

  // Horizontal scroll
  scrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },

  // Card overlay (shared)
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 12,
    paddingTop: 32,
    paddingBottom: 12,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 2,
  },
  cardMeta: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    fontWeight: '500',
  },
  cardMetaSmall: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },

  // Program card (free programs scroll)
  programCard: {
    width: 200,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  programImage: {
    width: '100%',
    height: '100%',
  },

  // Meditation card (Try a meditation scroll)
  meditationCard: {
    width: 170,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  meditationImage: {
    width: '100%',
    height: '100%',
  },

  // Sound card (Play a sound scroll) — different shape: image + text below
  soundCard: {
    width: 140,
  },
  soundImage: {
    width: 140,
    height: 140,
    borderRadius: 16,
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  soundTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  soundAuthor: {
    color: colors.textMuted,
    fontSize: 11,
  },

  // Badges
  freeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  freeBadgeText: {
    color: '#1A1306',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  durationPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  durationPillText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  playBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBadgeSmall: {
    position: 'absolute',
    top: 102,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
