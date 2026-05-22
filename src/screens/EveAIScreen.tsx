import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, FlatList, Image,
  Animated, Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useReflections } from '../context/ReflectionsContext';

const { width } = Dimensions.get('window');

// ─── Mock data ────────────────────────────────────────────────────────────

const SUGGESTIONS = [
  "I'm feeling stressed, tired, or seeking better sleep.",
  "I'm looking to lose weight and improve my fitness.",
  "I want to develop a growth mindset and increase my self-confidence.",
  "I want to enhance my leadership skills, build a strong team and inspire others.",
];

const PAST_CHATS = [
  'Relaxing Morning Sounds',
  'Relaxing Morning Sounds',
  'Relaxing Morning Music',
  'Relaxing morning sound recommendations',
  'Best sleep techniques for busy professionals',
  'Morning meditation for focus',
  'Building confidence at work',
  'Stress relief before presentations',
  'Sleep & Stress Relief',
  'Fitness and weight loss',
];

interface ProgramCard {
  title: string;
  author: string;
  authorAvatar: string;
  lessonCount: number;
  image: string;
}

interface EveResponse {
  title: string;
  card: ProgramCard;
  body: string;
  followUps: string[];
}

const EVE_RESPONSES: Record<string, EveResponse> = {
  sleep: {
    title: 'Sleep & Stress Relief',
    card: {
      title: 'Everyday Bliss',
      author: 'Paul McKenna',
      authorAvatar: 'https://assets.mindvalley.com/api/v1/assets/afd1e11c-cf1d-4c19-a853-abc758da55e9.jpg',
      lessonCount: 21,
      image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80',
    },
    body: 'These recommendations are designed to support your journey toward better sleep by addressing both the practical aspects of sleep hygiene and the underlying stress that often impacts rest.',
    followUps: [
      'What belief hinders my sleep?',
      'Quest for better sleep quality',
      'How can I integrate calm rituals?',
    ],
  },
  fitness: {
    title: 'Fitness & Vitality',
    card: {
      title: '10X Fitness',
      author: 'Ronan Diego & Lorenzo Delano',
      authorAvatar: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&q=80',
      lessonCount: 22,
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    },
    body: 'These recommendations will help you build a lean, strong body with minimal time investment — using science-backed methods that work with your biology, not against it.',
    followUps: [
      'How do I start exercising consistently?',
      'What should I eat to lose weight?',
      'Best morning fitness routine?',
    ],
  },
  mindset: {
    title: 'Growth Mindset',
    card: {
      title: 'Be Extraordinary',
      author: 'Vishen Lakhiani',
      authorAvatar: require('../../assets/authors/vishen-lakhiani.jpg'),
      lessonCount: 30,
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    },
    body: 'These lessons will help you rewire the subconscious patterns that hold you back and replace them with beliefs that fuel confidence, resilience, and unstoppable momentum.',
    followUps: [
      'How do I overcome self-doubt?',
      'Techniques to build confidence daily',
      'What limiting beliefs should I release?',
    ],
  },
  leadership: {
    title: 'Leadership & Teams',
    card: {
      title: 'The Transformational Leader',
      author: 'Monty Moran',
      authorAvatar: require('../../assets/authors/monty-moran.jpg'),
      lessonCount: 16,
      image: 'https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?w=800&q=80',
    },
    body: 'These recommendations will sharpen your ability to inspire trust, communicate vision, and create the conditions where your team does their best work — consistently.',
    followUps: [
      'How do I give better feedback?',
      'Building a high-performance culture',
      'Dealing with conflict in my team',
    ],
  },
  default: {
    title: 'Eve Recommendations',
    card: {
      title: 'Be Extraordinary',
      author: 'Vishen Lakhiani',
      authorAvatar: require('../../assets/authors/vishen-lakhiani.jpg'),
      lessonCount: 30,
      image: 'https://images.unsplash.com/photo-1490750967868-88df5691cc96?w=800&q=80',
    },
    body: "Here's a powerful place to begin your transformation — a program that addresses the root of what drives human potential and helps you design a life that truly excites you.",
    followUps: [
      'What program fits my goals best?',
      'How do I stay motivated long-term?',
      'Where should I start on Mindvalley?',
    ],
  },
};

function getResponse(input: string): EveResponse {
  const lower = input.toLowerCase();
  if (lower.match(/sleep|stress|tired|rest|calm|relax/)) return EVE_RESPONSES.sleep;
  if (lower.match(/weight|fitness|body|exercise|workout|health/)) return EVE_RESPONSES.fitness;
  if (lower.match(/mindset|confidence|growth|self|believe/)) return EVE_RESPONSES.mindset;
  if (lower.match(/lead|team|inspire|manage|people/)) return EVE_RESPONSES.leadership;
  return EVE_RESPONSES.default;
}

// ─── Eve geometric icon ───────────────────────────────────────────────────

const EveIcon = ({ size = 64 }: { size?: number }) => (
  <View style={[eveIconStyles.container, { width: size, height: size }]}>
    {[0, 30, 60, 90, 120, 150].map(deg => (
      <View
        key={deg}
        style={[
          eveIconStyles.bar,
          { width: size * 0.06, height: size * 0.78, transform: [{ rotate: `${deg}deg` }] },
        ]}
      />
    ))}
    <View style={[eveIconStyles.center, { width: size * 0.22, height: size * 0.22, borderRadius: size * 0.11 }]} />
  </View>
);

const eveIconStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    backgroundColor: '#7C5CFC',
    borderRadius: 3,
    opacity: 0.85,
  },
  center: {
    backgroundColor: '#9B7CFF',
    shadowColor: '#7C5CFC',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});

// ─── Waveform component ───────────────────────────────────────────────────

const Waveform = () => {
  const bars = [0.4, 0.7, 1.0, 0.6, 0.85, 0.5, 0.9, 0.65, 0.75, 0.45];
  const anims = useRef(bars.map(h => new Animated.Value(h))).current;

  useEffect(() => {
    const animations = anims.map((anim, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, { toValue: Math.random() * 0.6 + 0.4, duration: 300 + i * 60, useNativeDriver: false }),
          Animated.timing(anim, { toValue: bars[i], duration: 300 + i * 60, useNativeDriver: false }),
        ])
      )
    );
    Animated.parallel(animations).start();
    return () => animations.forEach(a => a.stop());
  }, []);

  return (
    <View style={waveStyles.container}>
      {anims.map((anim, i) => (
        <Animated.View
          key={i}
          style={[waveStyles.bar, { height: anim.interpolate({ inputRange: [0, 1], outputRange: [4, 24] }) }]}
        />
      ))}
    </View>
  );
};

const waveStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 3, paddingHorizontal: 8 },
  bar: { width: 3, backgroundColor: '#7C5CFC', borderRadius: 2 },
});

// ─── Main screen ──────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: 'user' | 'eve';
  text?: string;
  response?: EveResponse;
}

export default function EveAIScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationTitle, setConversationTitle] = useState('');
  const [savedMessageIds, setSavedMessageIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<ScrollView>(null);
  const isChat = messages.length > 0;
  const { saveEveConversation } = useReflections();
  const insets = useSafeAreaInsets();
  // Floating tab bar = 64h + ~16 from bottom (uses safe-area inset). Clear it.
  const tabBarClearance = Math.max(insets.bottom - 8, 16) + 64 + 12;

  const handleSaveToReflections = (msg: Message) => {
    if (!msg.response || savedMessageIds.has(msg.id)) return;
    const snippet = msg.response.body.length > 120
      ? msg.response.body.slice(0, 117).trimEnd() + '…'
      : msg.response.body;
    saveEveConversation({
      title: msg.response.title,
      snippet,
    });
    setSavedMessageIds(prev => {
      const next = new Set(prev);
      next.add(msg.id);
      return next;
    });
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const response = getResponse(text);
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    const eveMsg: Message = { id: (Date.now() + 1).toString(), role: 'eve', response };
    setMessages(prev => [...prev, userMsg, eveMsg]);
    setConversationTitle(response.title);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setInput('How can I improve my sleep?');
  };

  const startNewChat = () => {
    setMessages([]);
    setConversationTitle('');
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowHistory(true)} style={styles.headerBtn}>
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isChat ? conversationTitle : 'Eve AI'}</Text>
        <View style={styles.headerRight}>
          {isChat && (
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          {!isChat && (
            <TouchableOpacity style={styles.headerBtn}>
              <Ionicons name="eye-outline" size={22} color="#fff" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.headerBtn} onPress={isChat ? startNewChat : undefined}>
            <Ionicons name="close" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {!isChat ? (
          // ── Idle state ──────────────────────────────────────────────────
          <ScrollView contentContainerStyle={styles.idleContent} showsVerticalScrollIndicator={false}>
            <View style={styles.eveIconWrap}>
              <EveIcon size={72} />
            </View>
            <Text style={styles.greeting}>Hi, Naresh</Text>
            <Text style={styles.subtitle}>How can I help you today?</Text>
            <View style={styles.suggestionsGrid}>
              {SUGGESTIONS.map((s, i) => (
                <TouchableOpacity key={i} style={styles.suggestionCard} activeOpacity={0.8} onPress={() => sendMessage(s)}>
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        ) : (
          // ── Chat state ──────────────────────────────────────────────────
          <ScrollView
            ref={scrollRef}
            style={styles.chatScroll}
            contentContainerStyle={styles.chatContent}
            showsVerticalScrollIndicator={false}
          >
            {messages.map(msg => (
              <View key={msg.id}>
                {msg.role === 'user' ? (
                  <View style={styles.userBubble}>
                    <Text style={styles.userText}>{msg.text}</Text>
                  </View>
                ) : msg.response ? (
                  <View style={styles.eveBlock}>
                    {/* Program card */}
                    <TouchableOpacity style={styles.programCard} activeOpacity={0.85}>
                      <View style={styles.programCardLabel}>
                        <Ionicons name="play-circle-outline" size={14} color={colors.textMuted} />
                        <Text style={styles.programCardLabelText}> PROGRAM</Text>
                      </View>
                      <Image source={{ uri: msg.response.card.image }} style={styles.programCardImage} />
                      <View style={styles.programCardBody}>
                        <Text style={styles.programCardTitle}>{msg.response.card.title}</Text>
                        <View style={styles.programCardAuthorRow}>
                          <Image
                            source={typeof msg.response.card.authorAvatar === 'string'
                              ? { uri: msg.response.card.authorAvatar }
                              : msg.response.card.authorAvatar as any}
                            style={styles.authorAvatar}
                          />
                          <Text style={styles.authorName}>{msg.response.card.author}</Text>
                          <View style={styles.lessonsPill}>
                            <Text style={styles.lessonsPillText}>{msg.response.card.lessonCount} Lessons</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>

                    {/* Body text */}
                    <Text style={styles.eveBody}>{msg.response.body}</Text>

                    {/* Follow-up prompts */}
                    <Text style={styles.followUpHeader}>Here's what you can ask next</Text>
                    {msg.response.followUps.map((q, qi) => (
                      <TouchableOpacity
                        key={qi} style={styles.followUpPill}
                        onPress={() => sendMessage(q)}
                        activeOpacity={0.75}
                      >
                        <Text style={styles.followUpText}>{q}</Text>
                      </TouchableOpacity>
                    ))}

                    {/* Save to Reflections */}
                    {(() => {
                      const isSaved = savedMessageIds.has(msg.id);
                      return (
                        <TouchableOpacity
                          style={[styles.saveReflectionBtn, isSaved && styles.saveReflectionBtnSaved]}
                          onPress={() => handleSaveToReflections(msg)}
                          activeOpacity={isSaved ? 1 : 0.7}
                          disabled={isSaved}
                        >
                          <Ionicons
                            name={isSaved ? 'checkmark' : 'bookmark-outline'}
                            size={13}
                            color={isSaved ? colors.success : colors.textSecondary}
                          />
                          <Text
                            style={[
                              styles.saveReflectionText,
                              isSaved && { color: colors.success },
                            ]}
                          >
                            {isSaved ? 'Saved' : 'Save to Reflections'}
                          </Text>
                        </TouchableOpacity>
                      );
                    })()}
                  </View>
                ) : null}
              </View>
            ))}
            <View style={{ height: 20 }} />
          </ScrollView>
        )}

        {/* Input area */}
        <View style={[styles.inputArea, { paddingBottom: tabBarClearance }]}>
          {isRecording && (
            <View style={styles.recordingHint}>
              <Ionicons name="language-outline" size={13} color="#000" style={{ marginRight: 4 }} />
              <Text style={styles.recordingHintText}>English works best for voice accuracy</Text>
            </View>
          )}
          <View style={styles.inputBar}>
            {isRecording ? (
              <>
                <Text style={styles.listeningText}>Listening...</Text>
                <Waveform />
                <TouchableOpacity onPress={stopRecording} style={styles.stopBtn}>
                  <View style={styles.stopIcon} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Ask Eve AI..."
                  placeholderTextColor={colors.textMuted}
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={() => sendMessage(input)}
                  returnKeyType="send"
                  multiline
                />
                {input.trim().length > 0 ? (
                  <TouchableOpacity onPress={() => sendMessage(input)} style={styles.sendBtn}>
                    <Ionicons name="arrow-up" size={18} color="#000" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => setIsRecording(true)}>
                    <Ionicons name="mic-outline" size={22} color={colors.textSecondary} />
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>
          <Text style={styles.disclaimer}>
            EVE AI provides general information only. It is not medical, financial, therapeutic, or professional advice, and may not reflect Mindvalley's views or always be accurate.
          </Text>
        </View>
      </KeyboardAvoidingView>

      {/* Chat history panel — inline absolute, stays within app frame */}
      {showHistory && (
        <View style={styles.historyOverlay}>
          <TouchableOpacity style={styles.historyBackdrop} onPress={() => setShowHistory(false)} activeOpacity={1} />
          <View style={styles.historyPanel}>
            <SafeAreaView style={styles.historyContainer} edges={['top']}>
              <View style={styles.historyHeader}>
                <TouchableOpacity onPress={() => setShowHistory(false)} style={styles.headerBtn}>
                  <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                  <TouchableOpacity style={styles.headerBtn}>
                    <Ionicons name="create-outline" size={22} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.headerBtn}>
                    <Ionicons name="ellipsis-horizontal" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.historySection}>Past</Text>
              <FlatList
                data={PAST_CHATS}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.historyRow}
                    onPress={() => setShowHistory(false)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.historyRowText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </SafeAreaView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  headerBtn: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#fff' },
  headerRight: { flexDirection: 'row' },

  // Idle
  idleContent: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 48, paddingBottom: 24 },
  eveIconWrap: { marginBottom: 24 },
  greeting: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginBottom: 48 },
  suggestionsGrid: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  suggestionCard: {
    width: '47%', backgroundColor: colors.backgroundCard, borderRadius: 14,
    padding: 16, borderWidth: 1, borderColor: colors.border,
  },
  suggestionText: { fontSize: 14, color: '#fff', lineHeight: 20 },

  // Chat
  chatScroll: { flex: 1 },
  chatContent: { paddingHorizontal: 16, paddingTop: 16 },
  userBubble: {
    alignSelf: 'flex-end', backgroundColor: '#7C5CFC',
    borderRadius: 18, borderBottomRightRadius: 4,
    paddingHorizontal: 16, paddingVertical: 12, marginBottom: 16,
    maxWidth: '80%',
  },
  userText: { fontSize: 15, color: '#fff', lineHeight: 21 },

  eveBlock: { marginBottom: 16 },
  eveBody: { fontSize: 14, color: colors.textSecondary, lineHeight: 22, marginBottom: 20 },

  // Program card
  programCard: {
    backgroundColor: colors.backgroundCard, borderRadius: 16,
    overflow: 'hidden', marginBottom: 16, borderWidth: 1, borderColor: colors.border,
  },
  programCardLabel: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8,
  },
  programCardLabelText: { fontSize: 11, fontWeight: '700', color: colors.textMuted, letterSpacing: 1 },
  programCardImage: { width: '100%', height: 190 },
  programCardBody: { padding: 14 },
  programCardTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 10 },
  programCardAuthorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  authorAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.backgroundElevated },
  authorName: { fontSize: 14, color: '#fff', fontWeight: '500' },
  lessonsPill: {
    backgroundColor: colors.backgroundElevated, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  lessonsPillText: { fontSize: 12, color: colors.textSecondary, fontWeight: '600' },

  // Follow-up prompts
  followUpHeader: { fontSize: 15, fontWeight: '700', color: '#fff', marginBottom: 12 },
  followUpPill: {
    borderWidth: 1, borderColor: colors.border,
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 10,
  },
  followUpText: { fontSize: 14, color: '#fff' },

  // Save to Reflections (tertiary action — small ghost pill)
  saveReflectionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 10,
  },
  saveReflectionBtnSaved: {
    borderColor: 'transparent',
    backgroundColor: `${colors.success}22`,
  },
  saveReflectionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Input
  inputArea: { paddingHorizontal: 16, paddingBottom: 12, paddingTop: 8 },
  recordingHint: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    alignSelf: 'center', marginBottom: 10,
  },
  recordingHintText: { fontSize: 13, color: '#000', fontWeight: '500' },
  inputBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.backgroundElevated,
    borderRadius: 30, paddingHorizontal: 20, paddingVertical: 14, marginBottom: 10,
    minHeight: 54,
  },
  listeningText: { fontSize: 15, color: colors.textMuted, marginRight: 8 },
  stopBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  stopIcon: { width: 12, height: 12, backgroundColor: '#000', borderRadius: 2 },
  input: { flex: 1, color: '#fff', fontSize: 16, maxHeight: 100 },
  sendBtn: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  disclaimer: { fontSize: 11, color: colors.textMuted, textAlign: 'center', lineHeight: 16 },

  // History modal
  historyOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, flexDirection: 'row' },
  historyBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  historyPanel: { width: '80%', backgroundColor: colors.background },
  historyContainer: { flex: 1, backgroundColor: colors.background },
  historyHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 8, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  historySection: {
    fontSize: 13, fontWeight: '700', color: colors.textMuted,
    paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, letterSpacing: 0.5,
  },
  historyRow: { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  historyRowText: { fontSize: 15, color: '#fff', fontWeight: '400' },
});
