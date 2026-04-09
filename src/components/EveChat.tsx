import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDemo } from '../context/DemoContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

interface ChatMessage {
  id: string;
  sender: 'eve' | 'user';
  text: string;
  badges?: { title: string; owned: boolean; collection?: string }[];
}

interface EveChatProps {
  onClose: () => void;
  initialMessage?: string;
}

export default function EveChat({ onClose, initialMessage }: EveChatProps) {
  const { scenarioState } = useDemo();
  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(scenarioState.id, initialMessage));
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Mock Eve response after brief delay
    setTimeout(() => {
      const eveReply: ChatMessage = {
        id: `eve-${Date.now()}`,
        sender: 'eve',
        text: getMockReply(inputText.trim()),
      };
      setMessages(prev => [...prev, eveReply]);
    }, 800);
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
                  {msg.badges.map((badge, i) => (
                    <View key={i} style={styles.badgeRow}>
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
                      <Text style={styles.badgeTitle}>{badge.title}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
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
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Pre-scripted conversations per scenario
function getInitialMessages(scenarioId: string, initialMessage?: string): ChatMessage[] {
  if (scenarioId === 'goal-question-stress') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: 'Hi Naresh! How can I help you today?',
      },
      {
        id: 'user-1',
        sender: 'user',
        text: 'How do I manage stress better?',
      },
      {
        id: 'eve-2',
        sender: 'eve',
        text: "Here are the best practices for managing stress — some are already in your plan!",
        badges: [
          { title: 'Breathwork for Life — Lesson 5: Stress Release', owned: true },
          { title: 'Mystic Brain — Lesson 8: Resilience to Stress', owned: true },
          { title: 'Quick Stress & Worry Releaser (Meditation)', owned: true },
          { title: 'Calm Mind: Managing Anxiety (Quest)', owned: true },
          { title: 'Healing Burnout (Quest)', owned: false, collection: 'Longevity Collection' },
          { title: '10X Fitness — Stress Recovery Module', owned: false, collection: 'Longevity Collection' },
        ],
      },
    ];
  }

  if (scenarioId === 'browsing-unowned') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: "Great choice — 10X Fitness is one of our most popular programs. It's part of the Longevity Collection. Tap below to see how to add it to your plan.",
      },
    ];
  }

  if (scenarioId === 'new-user-no-attribution') {
    return [
      {
        id: 'eve-1',
        sender: 'eve',
        text: "Hi Naresh! I'm Eve, your personal guide at Mindvalley. What brought you here today?",
      },
    ];
  }

  if (initialMessage) {
    return [
      { id: 'eve-1', sender: 'eve', text: initialMessage },
    ];
  }

  return [
    {
      id: 'eve-1',
      sender: 'eve',
      text: `Hi ${initialMessage || 'there'}! I'm Eve, your personal guide. How can I help you today?`,
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
  return "That's a great question! Based on your Manifesting Collection, I'd suggest exploring the programs in your Foundation phase. Would you like me to recommend something specific?";
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
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
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
});
