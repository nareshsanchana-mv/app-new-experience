import React, { createContext, useContext, useState, ReactNode } from 'react';

export type DemoScenario =
  | 'new-user-silva-ad'
  | 'new-user-no-attribution'
  | 'returning-active'
  | 'returning-inactive'
  | 'browsing-unowned'
  | 'goal-question-stress';

export interface ScenarioState {
  id: DemoScenario;
  label: string;
  description: string;
  userName: string;
  hasAttribution: boolean;
  attributedProgram?: string;
  isFirstVisit: boolean;
  daysInactive: number;
  currentLesson: number;
  totalLessons: number;
  currentProgramTitle: string;
  currentProgramId: string;
  showEveHero: boolean;
  eveGreeting: string;
  eveSubtext: string;
  socialProof?: string;
}

const scenarios: Record<DemoScenario, ScenarioState> = {
  'new-user-silva-ad': {
    id: 'new-user-silva-ad',
    label: 'New User — Silva Ad',
    description: 'Type 1 first visit with Silva Ultramind attribution',
    userName: 'Naresh',
    hasAttribution: true,
    attributedProgram: 'The Silva Ultramind System',
    isFirstVisit: true,
    daysInactive: 0,
    currentLesson: 0,
    totalLessons: 28,
    currentProgramTitle: 'The Silva Ultramind System',
    currentProgramId: 'sums',
    showEveHero: false,
    eveGreeting: 'Start The Silva Ultramind System',
    eveSubtext: 'Something else on your mind? Talk to Eve',
  },
  'new-user-no-attribution': {
    id: 'new-user-no-attribution',
    label: 'New User — No Attribution',
    description: 'Type 2 first visit, Eve hero prompt',
    userName: 'Naresh',
    hasAttribution: false,
    isFirstVisit: true,
    daysInactive: 0,
    currentLesson: 0,
    totalLessons: 0,
    currentProgramTitle: '',
    currentProgramId: '',
    showEveHero: true,
    eveGreeting: 'Hi Naresh! What brought you to Mindvalley?',
    eveSubtext: '',
  },
  'returning-active': {
    id: 'returning-active',
    label: 'Returning — Active',
    description: 'Completed Lesson 1 yesterday, back for Lesson 2',
    userName: 'Naresh',
    hasAttribution: true,
    attributedProgram: 'The Silva Ultramind System',
    isFirstVisit: false,
    daysInactive: 0,
    currentLesson: 1,
    totalLessons: 28,
    currentProgramTitle: 'The Silva Ultramind System',
    currentProgramId: 'sums',
    showEveHero: false,
    eveGreeting: 'Welcome back, Naresh. Ready for Lesson 2?',
    eveSubtext: '',
    socialProof: "You're on track — 65% of members who started this week are on the same lesson",
  },
  'returning-inactive': {
    id: 'returning-inactive',
    label: 'Returning — Inactive (5 days)',
    description: 'Started but hasn\'t returned in 5 days',
    userName: 'Naresh',
    hasAttribution: true,
    attributedProgram: 'The Silva Ultramind System',
    isFirstVisit: false,
    daysInactive: 5,
    currentLesson: 1,
    totalLessons: 28,
    currentProgramTitle: 'The Silva Ultramind System',
    currentProgramId: 'sums',
    showEveHero: false,
    eveGreeting: 'Welcome back, Naresh! You started The Silva Ultramind System 5 days ago. Want a quick recap of Lesson 1 before moving on?',
    eveSubtext: '',
  },
  'browsing-unowned': {
    id: 'browsing-unowned',
    label: 'Browsing Unowned Content',
    description: 'Triggers unowned content flow',
    userName: 'Naresh',
    hasAttribution: true,
    attributedProgram: 'The Silva Ultramind System',
    isFirstVisit: false,
    daysInactive: 0,
    currentLesson: 3,
    totalLessons: 28,
    currentProgramTitle: 'The Silva Ultramind System',
    currentProgramId: 'sums',
    showEveHero: false,
    eveGreeting: 'Welcome back, Naresh. Ready for Lesson 4?',
    eveSubtext: '',
  },
  'goal-question-stress': {
    id: 'goal-question-stress',
    label: 'Goal Question — Stress',
    description: 'Pre-fills Eve with stress management question',
    userName: 'Naresh',
    hasAttribution: true,
    attributedProgram: 'The Silva Ultramind System',
    isFirstVisit: false,
    daysInactive: 0,
    currentLesson: 2,
    totalLessons: 28,
    currentProgramTitle: 'The Silva Ultramind System',
    currentProgramId: 'sums',
    showEveHero: false,
    eveGreeting: 'Welcome back, Naresh. Ready for Lesson 3?',
    eveSubtext: '',
  },
};

interface DemoContextType {
  activeScenario: DemoScenario;
  scenarioState: ScenarioState;
  setActiveScenario: (scenario: DemoScenario) => void;
  allScenarios: { id: DemoScenario; label: string; description: string }[];
  isDemoPanelVisible: boolean;
  toggleDemoPanel: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

interface DemoProviderProps {
  children: ReactNode;
}

export function DemoProvider({ children }: DemoProviderProps) {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>('new-user-silva-ad');
  const [isDemoPanelVisible, setIsDemoPanelVisible] = useState(false);

  const value: DemoContextType = {
    activeScenario,
    scenarioState: scenarios[activeScenario],
    setActiveScenario,
    allScenarios: Object.values(scenarios).map(s => ({
      id: s.id,
      label: s.label,
      description: s.description,
    })),
    isDemoPanelVisible,
    toggleDemoPanel: () => setIsDemoPanelVisible(prev => !prev),
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
