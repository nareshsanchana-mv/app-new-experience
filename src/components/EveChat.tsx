import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDemo } from '../context/DemoContext';
import { getProgramCover } from '../data/coverAssets';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface RecBadge {
  programId?: string;
  title: string;
  author?: string;
  owned: boolean;
  collection?: string;
}

interface ChatMessage {
  id: string;
  sender: 'eve' | 'user';
  text: string;
  badges?: RecBadge[];
}

interface EveChatProps {
  onClose: () => void;
  initialMessage?: string;
  startInVoiceMode?: boolean;
}

const MOCK_VOICE_TRANSCRIPT = 'I want to feel calmer today';

export default function EveChat({ onClose, initialMessage, startInVoiceMode }: EveChatProps) {
  const { scenarioState } = useDemo();
  const userName = scenarioState.userName;
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(scenarioState.id, userName, initialMessage));
  const [inputText, setInputText] = useState('');
  const [voiceActive, setVoiceActive] = useState(!!startInVoiceMode);

  const sendUserText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
    };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      const eveReply: ChatMessage = {
        id: `eve-${Date.now()}`,
        sender: 'eve',
        text: getMockReply(trimmed),
      };
      setMessages(prev => [...prev, eveReply]);
    }, 800);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendUserText(inputText);
    setInputText('');
  };

  const handleVoiceStop = () => {
    setVoiceActive(false);
    sendUserText(MOCK_VOICE_TRANSCRIPT);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.eveAvatar}>
            <Ionicons name="sparkles" size={18} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Eve</Text>
            <Text style={styles.headerSubtitle}>Your AI guide</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messageList} contentContainerStyle={styles.messageListContent}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'user' ? styles.userBubble : styles.eveBubble,
            ]}
          >
            {msg.sender === 'eve' && (
              <View style={styles.eveAvatarSmall}>
                <Ionicons name="sparkles" size={12} color={colors.primary} />
              </View>
            )}
            <View style={[
              styles.bubbleContent,
              msg.sender === 'user' ? styles.userBubbleContent : styles.eveBubbleContent,
            ]}>
              <Text style={[
                styles.messageText,
                msg.sender === 'user' && styles.userMessageText,
              ]}>
                {msg.text}
              </Text>
              {msg.badges && msg.badges.length > 0 && (
                <View style={styles.badgeList}>
                  {msg.badges.map((badge, i) => {
                    const cover = badge.programId ? getProgramCover(badge.programId) : null;
                    return (
                      <View key={i} style={styles.recCard}>
                        {cover ? (
                          <Image source={cover} style={styles.recCover} />
                        ) : (
                          <View style={[styles.recCover, styles.recCoverPlaceholder]}>
                            <Ionicons name="image-outline" size={20} color={colors.textMuted} />
                          </View>
                        )}
                        <View style={styles.recBody}>
                          <Text style={styles.recTitle} numberOfLines={2}>{badge.title}</Text>
                          {!!badge.author && (
                            <Text style={styles.recAuthor} numberOfLines={1}>{badge.author}</Text>
                          )}
                          <View style={[
                            styles.badge,
                            badge.owned ? styles.badgeOwned : styles.badgeUnowned,
                          ]}>
                            <Text style={[
                              styles.badgeText,
                              badge.owned ? styles.badgeTextOwned : styles.badgeTextUnowned,
                            ]}>
                              {badge.owned ? 'Included' : badge.collection}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      {voiceActive ? (
        <View style={styles.voiceBar}>
          <TouchableOpacity
            style={styles.voiceCancelButton}
            onPress={() => setVoiceActive(false)}
          >
            <Ionicons name="close" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.voiceListening}>
            <View style={styles.voiceDot} />
            <View style={[styles.voiceDot, styles.voiceDotMid]} />
            <View style={styles.voiceDot} />
            <Text style={styles.voiceText}>Listening…</Text>
          </View>
          <TouchableOpacity style={styles.voiceStopButton} onPress={handleVoiceStop}>
            <Ionicons name="stop" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask Eve anything..."
            placeholderTextColor={colors.textMuted}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          {inputText.trim().length === 0 ? (
            <TouchableOpacity
              style={styles.micButton}
              onPress={() => setVoiceActive(true)}
            >
              <Ionicons name="mic" size={20} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

// Quick-reply chips from the magic-Eve hero map to curated rec sets so the
// chat opens with a real, content-rich response instead of a placeholder.
const CHIP_RECS: Record<string, { reply: string; badges: RecBadge[] }> = {
  'Stress relief': {
    reply: "I hear you — let's start there. These three are loved by members navigating high-pressure moments:",
    badges: [
      { programId: 'hbo', title: 'Healing Burnout', author: 'Dr. Romie Mushtaq', owned: false, collection: 'Longevity' },
      { programId: 'css', title: 'Calm Mind', author: 'Dr. Caroline Leaf', owned: false, collection: 'Longevity' },
      { programId: '6pm', title: 'The 6 Phase Meditation', author: 'Vishen Lakhiani', owned: false, collection: 'Manifesting' },
    ],
  },
  'Personal growth': {
    reply: "Beautiful — growth is where transformation lives. Here's a great starting trio:",
    badges: [
      { programId: 'tqpm', title: 'The Quest for Personal Mastery', author: 'Srikumar Rao', owned: false, collection: 'Manifesting' },
      { programId: 'mgm', title: 'Mastering the Growth Mindset', author: 'Vishen Lakhiani', owned: false, collection: 'Exponential Entrepreneur' },
      { programId: 'hof', title: 'The Habit of Ferocity', author: 'Steven Kotler', owned: false, collection: 'Exponential Entrepreneur' },
    ],
  },
  'Spirituality': {
    reply: 'For going inward — three programs that meet you wherever you are on the path:',
    badges: [
      { programId: '6pm', title: 'The 6 Phase Meditation', author: 'Vishen Lakhiani', owned: false, collection: 'Manifesting' },
      { programId: 'eb', title: 'Everyday Bliss', author: 'Paul McKenna', owned: false, collection: 'Manifesting' },
      { programId: 'rtha', title: 'Rapid Transformational Hypnotherapy for Abundance', author: 'Marisa Peer', owned: false, collection: 'Manifesting' },
    ],
  },
  'Just exploring': {
    reply: 'Love it. Here are three doorways to peek through — each one opens to something different:',
    badges: [
      { programId: 'ul-mp', title: 'Uncompromised Life', author: 'Marisa Peer', owned: false, collection: 'Manifesting' },
      { programId: '3miq', title: 'The 3 Most Important Questions', author: 'Vishen Lakhiani', owned: false, collection: 'Manifesting' },
      { programId: 'ml', title: 'Magical Living', author: 'Tim Storey', owned: false, collection: 'Manifesting' },
    ],
  },
};

// Pre-scripted conversations per scenario
function getInitialMessages(scenarioId: string, userName: string, initialMessage?: string): ChatMessage[] {
  // Chip path: seed a 3-message convo so the chat opens with concrete recs.
  if (initialMessage && CHIP_RECS[initialMessage]) {
    const { reply, badges } = CHIP_RECS[initialMessage];
    return [
      { id: 'eve-1', sender: 'eve', text: `Hi ${userName}! What brought you to Mindvalley today?` },
      { id: 'user-1', sender: 'user', text: initialMessage },
      { id: 'eve-2', sender: 'eve', text: reply, badges },
    ];
  }

  if (scenarioId === 'new-user-no-attribution') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: `Hi ${userName}! I'm Eve, your personal guide at Mindvalley. What brought you here today?`,
      },
    ];
  }

  if (initialMessage) {
    return [
      { id: 'eve-1', sender: 'eve', text: `Hi ${userName}! ${initialMessage}` },
    ];
  }

  // Default messages based on scenario type
  if (scenarioId === 'new-user-silva-ad') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: `Hi ${userName}! I'm Eve, your personal guide at Mindvalley. I see you're starting with The Silva Ultramind System — great choice! Is there anything else I can help you with?`,
      },
    ];
  }

  if (scenarioId === 'returning-active') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: `Hi ${userName}! You're making great progress with Silva Ultramind. What's on your mind today?`,
      },
    ];
  }

  if (scenarioId === 'returning-inactive') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: `Hi ${userName}, welcome back! It's been a few days — no worries, picking up where you left off is easy. Want me to suggest what to do next?`,
      },
    ];
  }

  // Fallback for any other scenario
  return [
    {
      id: 'eve-1',
      sender: 'eve',
      text: `Hi ${userName}! What can I help you with today?`,
    },
  ];
}

function getMockReply(userText: string): string {
  const lower = userText.toLowerCase();
  if (lower.includes('stress') || lower.includes('anxiety')) {
    return "I'd recommend starting with the Breathwork for Life program — Lesson 5 specifically covers stress release techniques. You could also try the Quick Stress & Worry Releaser meditation for immediate relief.";
  }
  if (lower.includes('sleep')) {
    return "For better sleep, try the 'Drifting Into Deep Healing Sleep' meditation tonight. It's one of our most popular practices for improving sleep quality.";
  }
  if (lower.includes('focus') || lower.includes('productivity')) {
    return "The Mystic Brain program has excellent lessons on entering flow states. For a quick boost right now, try the 'Elevate Your Focus' meditation — it's only 10 minutes.";
  }
  if (lower.includes('manifest') || lower.includes('abundance')) {
    return "You're in the right collection! The Silva Ultramind System teaches powerful visualization techniques. I'd also recommend the Abundance Meditation by Bob Proctor as a daily practice.";
  }
  return "That's a great question! Based on your Manifesting Collection, I'd suggest exploring the programs in your Awaken phase. Would you like me to recommend something specific?";
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  eveAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  headerSubtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    flexDirection: 'row',
    gap: 8,
  },
  userBubble: {
    justifyContent: 'flex-end',
  },
  eveBubble: {
    justifyContent: 'flex-start',
  },
  eveAvatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  bubbleContent: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  eveBubbleContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
  },
  userBubbleContent: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
  },
  messageText: {
    ...typography.body,
    color: colors.textPrimary,
  },
  userMessageText: {
    color: '#fff',
  },
  badgeList: {
    marginTop: 10,
    gap: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  recCover: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },
  recCoverPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  recBody: {
    flex: 1,
    gap: 2,
  },
  recTitle: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  recAuthor: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeOwned: {
    backgroundColor: '#d4edda',
  },
  badgeUnowned: {
    backgroundColor: '#fff3cd',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextOwned: {
    color: '#155724',
  },
  badgeTextUnowned: {
    color: '#856404',
  },
  badgeTitle: {
    ...typography.caption,
    color: colors.textPrimary,
    flex: 1,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderRadius: 24,
    ...typography.body,
    color: colors.textPrimary,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.primary}12`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  voiceCancelButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceListening: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  voiceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    opacity: 0.5,
  },
  voiceDotMid: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 1,
  },
  voiceText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  voiceStopButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
