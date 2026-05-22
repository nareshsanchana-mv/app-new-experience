import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  reflectionHistory as seedHistory,
  ReflectionDay,
  EveConversationEntry,
  Mood,
} from '../data/reflectionsData';

interface ReflectionsContextType {
  reflectionHistory: ReflectionDay[];
  todayEntry: ReflectionDay;
  stats: { currentStreak: number; daysWithInput: number; totalActivities: number };
  logMood: (mood: Mood) => void;
  saveJournalText: (text: string) => void;
  saveEveConversation: (entry: { title: string; snippet: string }) => void;
}

const ReflectionsContext = createContext<ReflectionsContextType | undefined>(undefined);

function formatTimestamp(d: Date): string {
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  const mm = minutes.toString().padStart(2, '0');
  return `${h12}:${mm} ${ampm}`;
}

function computeStreak(history: ReflectionDay[]): number {
  let streak = 0;
  for (const day of history) {
    if (day.hasUserInput) streak += 1;
    else break;
  }
  return streak;
}

export function ReflectionsProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<ReflectionDay[]>(seedHistory);

  const logMood = (mood: Mood) => {
    setHistory(prev => prev.map((day, i) =>
      i === 0
        ? { ...day, mood, hasUserInput: true }
        : day,
    ));
  };

  const saveJournalText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setHistory(prev => prev.map((day, i) =>
      i === 0
        ? { ...day, journalText: trimmed, hasUserInput: true }
        : day,
    ));
  };

  const saveEveConversation = (entry: { title: string; snippet: string }) => {
    const newEntry: EveConversationEntry = {
      id: `eve-${Date.now()}`,
      title: entry.title,
      snippet: entry.snippet,
      timestamp: formatTimestamp(new Date()),
    };
    setHistory(prev => prev.map((day, i) =>
      i === 0
        ? {
            ...day,
            eveConversations: [...day.eveConversations, newEntry],
            hasUserInput: true,
          }
        : day,
    ));
  };

  const value = useMemo<ReflectionsContextType>(() => ({
    reflectionHistory: history,
    todayEntry: history[0],
    stats: {
      currentStreak: computeStreak(history),
      daysWithInput: history.filter(d => d.hasUserInput).length,
      totalActivities: history.reduce((sum, d) => sum + d.activities.length, 0),
    },
    logMood,
    saveJournalText,
    saveEveConversation,
  }), [history]);

  return (
    <ReflectionsContext.Provider value={value}>
      {children}
    </ReflectionsContext.Provider>
  );
}

export function useReflections(): ReflectionsContextType {
  const ctx = useContext(ReflectionsContext);
  if (!ctx) throw new Error('useReflections must be used within ReflectionsProvider');
  return ctx;
}
