// Reflections — Daily journal, mood tracking, Eve conversations, and progress log

export type Mood = 'amazing' | 'good' | 'okay' | 'low' | 'rough';

export const moodOptions: { mood: Mood; emoji: string; label: string }[] = [
  { mood: 'amazing', emoji: '🤩', label: 'Amazing' },
  { mood: 'good', emoji: '😊', label: 'Good' },
  { mood: 'okay', emoji: '😐', label: 'Okay' },
  { mood: 'low', emoji: '😔', label: 'Low' },
  { mood: 'rough', emoji: '😣', label: 'Rough' },
];

export interface EveConversationEntry {
  id: string;
  title: string;
  snippet: string;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  type: 'meditation' | 'program' | 'breathwork' | 'sound';
  title: string;
  author: string;
  duration: string;
  timestamp: string;
}

export interface ReflectionDay {
  date: string; // YYYY-MM-DD
  displayDate: string; // "Today", "Yesterday", "Mon, Apr 7"
  mood?: Mood;
  journalText?: string;
  eveConversations: EveConversationEntry[];
  activities: ActivityEntry[];
  hasUserInput: boolean; // true if mood or journalText exists
}

// Mock history data (most recent first)
export const reflectionHistory: ReflectionDay[] = [
  {
    date: '2026-04-09',
    displayDate: 'Today',
    mood: undefined,
    journalText: undefined,
    eveConversations: [],
    activities: [
      {
        id: 'act-today-1',
        type: 'program',
        title: 'The Silva Ultramind System — Lesson 3',
        author: 'Vishen Lakhiani',
        duration: '18 min',
        timestamp: '9:15 AM',
      },
    ],
    hasUserInput: false,
  },
  {
    date: '2026-04-08',
    displayDate: 'Yesterday',
    mood: 'good',
    journalText: "Had a breakthrough during the Silva visualization exercise. I could actually feel the shift in my awareness — like a doorway opening. Need to practice this more consistently. Also realized I've been holding tension in my shoulders all week.",
    eveConversations: [
      {
        id: 'eve-08-1',
        title: 'Managing stress at work',
        snippet: 'Eve recommended Breathwork for Life Lesson 5 for stress release techniques...',
        timestamp: '2:30 PM',
      },
    ],
    activities: [
      {
        id: 'act-08-1',
        type: 'program',
        title: 'The Silva Ultramind System — Lesson 2',
        author: 'Vishen Lakhiani',
        duration: '22 min',
        timestamp: '8:30 AM',
      },
      {
        id: 'act-08-2',
        type: 'meditation',
        title: 'Quick Stress & Worry Releaser',
        author: 'House of Wellbeing',
        duration: '12 min',
        timestamp: '1:15 PM',
      },
    ],
    hasUserInput: true,
  },
  {
    date: '2026-04-07',
    displayDate: 'Mon, Apr 7',
    mood: 'amazing',
    journalText: "First day on Mindvalley! Started the Silva Ultramind System. Vishen's explanation of alpha states was fascinating. I'm excited to see where this goes.",
    eveConversations: [
      {
        id: 'eve-07-1',
        title: 'Getting started with Mindvalley',
        snippet: "Welcome! Based on your interest in manifesting, I'd suggest starting with...",
        timestamp: '10:00 AM',
      },
    ],
    activities: [
      {
        id: 'act-07-1',
        type: 'program',
        title: 'The Silva Ultramind System — Lesson 1',
        author: 'Vishen Lakhiani',
        duration: '25 min',
        timestamp: '10:30 AM',
      },
    ],
    hasUserInput: true,
  },
  {
    date: '2026-04-05',
    displayDate: 'Sat, Apr 5',
    mood: 'okay',
    journalText: undefined,
    eveConversations: [],
    activities: [
      {
        id: 'act-05-1',
        type: 'meditation',
        title: '6-Phase Meditation',
        author: 'Vishen',
        duration: '20 min',
        timestamp: '7:00 AM',
      },
      {
        id: 'act-05-2',
        type: 'sound',
        title: 'Ocean Healing',
        author: 'Gabriel Loynaz',
        duration: '15 min',
        timestamp: '9:30 PM',
      },
    ],
    hasUserInput: true,
  },
  {
    date: '2026-04-03',
    displayDate: 'Thu, Apr 3',
    mood: 'low',
    journalText: "Feeling overwhelmed today. Too much going on at work. Tried the stress meditation but couldn't focus. Maybe tomorrow will be better.",
    eveConversations: [
      {
        id: 'eve-03-1',
        title: 'Feeling overwhelmed',
        snippet: "It's completely normal to have days like this. Let me suggest something gentle...",
        timestamp: '6:45 PM',
      },
    ],
    activities: [
      {
        id: 'act-03-1',
        type: 'breathwork',
        title: 'Inner Calm: SOMA Breath for Anxiety Release',
        author: 'Niraj Naik',
        duration: '8 min',
        timestamp: '6:30 PM',
      },
    ],
    hasUserInput: true,
  },
];

// Stats for the reflections header
export function getReflectionStats() {
  const daysWithInput = reflectionHistory.filter(d => d.hasUserInput).length;
  const totalActivities = reflectionHistory.reduce((sum, d) => sum + d.activities.length, 0);
  const currentStreak = calculateStreak();
  return { daysWithInput, totalActivities, currentStreak };
}

function calculateStreak(): number {
  // Simple mock streak calculation
  return 3;
}

// Helper: get activity icon name
export function getActivityIcon(type: ActivityEntry['type']): string {
  switch (type) {
    case 'program': return 'play-circle-outline';
    case 'meditation': return 'leaf-outline';
    case 'breathwork': return 'water-outline';
    case 'sound': return 'musical-notes-outline';
  }
}

// Helper: get activity color
export function getActivityColor(type: ActivityEntry['type']): string {
  switch (type) {
    case 'program': return '#7B68EE';
    case 'meditation': return '#00D4AA';
    case 'breathwork': return '#3B82F6';
    case 'sound': return '#F5A623';
  }
}
