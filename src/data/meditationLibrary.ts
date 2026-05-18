// Practice Section — Meditation Library
// Curated English-only meditations organized by goal and modality
// Data sourced from Audiowaves CSV (Airtable export)

export type Modality = 'Meditation' | 'Breathwork' | 'Hypnotherapy' | 'Visualization' | 'Sound Healing' | 'Soundscape';

export interface PracticeMeditation {
  id: string;
  title: string;
  author: string;
  modality: Modality;
  goalCategories: string[];
  duration: string;
  image: string;
  bestTime?: string;
}

// Goal categories for the primary filter
export const goalCategories = [
  'Better Sleep',
  'Stress Relief',
  'Focus',
  'Confidence',
  'Self-Love',
  'Happiness',
  'Manifesting',
  'Wellness',
  'Spiritual Growth',
  'Relationships',
] as const;

export type GoalCategory = typeof goalCategories[number];

// Modalities for the secondary filter
export const modalities: Modality[] = [
  'Meditation',
  'Breathwork',
  'Hypnotherapy',
  'Visualization',
  'Sound Healing',
  'Soundscape',
];

// Curated selection of meditations (representative sample for POC)
export const meditationLibrary: PracticeMeditation[] = [
  // === BETTER SLEEP ===
  {
    id: 'med-sleep-1',
    title: 'Sleep Story: Wisdom of Whispering Woods',
    author: 'House of Wellbeing',
    modality: 'Hypnotherapy',
    goalCategories: ['Better Sleep'],
    duration: '25 min',
    image: '/meditation-covers/Profound_Sleep.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-sleep-2',
    title: 'Tranquil Sleep',
    author: 'Emily Fletcher',
    modality: 'Meditation',
    goalCategories: ['Better Sleep'],
    duration: '15 min',
    image: '/meditation-covers/Deep_Relaxation.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-sleep-3',
    title: 'Drifting Into Deep Healing Sleep',
    author: 'Sonia Choquette',
    modality: 'Visualization',
    goalCategories: ['Better Sleep'],
    duration: '20 min',
    image: '/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-sleep-4',
    title: 'Profound Sleep',
    author: 'The Monroe Institute',
    modality: 'Sound Healing',
    goalCategories: ['Better Sleep'],
    duration: '30 min',
    image: '/meditation-covers/Profound_Sleep.jpg',
    bestTime: 'Night',
  },

  // === STRESS RELIEF ===
  {
    id: 'med-stress-1',
    title: 'Quick Stress & Worry Releaser',
    author: 'House of Wellbeing',
    modality: 'Hypnotherapy',
    goalCategories: ['Stress Relief'],
    duration: '12 min',
    image: '/meditation-covers/Releasing_Anxiety.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-stress-2',
    title: 'Stress Release',
    author: 'Emily Fletcher',
    modality: 'Meditation',
    goalCategories: ['Stress Relief'],
    duration: '15 min',
    image: '/meditation-covers/Deep_Relaxation.jpg',
  },
  {
    id: 'med-stress-3',
    title: 'Inner Calm: SOMA Breath for Anxiety Release',
    author: 'Niraj Naik',
    modality: 'Breathwork',
    goalCategories: ['Stress Relief'],
    duration: '18 min',
    image: '/meditation-covers/Releasing_Anxiety.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-stress-4',
    title: 'Finding Calm in Chaos',
    author: 'Ruwan Meepagala',
    modality: 'Meditation',
    goalCategories: ['Stress Relief'],
    duration: '10 min',
    image: '/meditation-covers/Deep_Relaxation.jpg',
    bestTime: 'Night',
  },

  // === FOCUS ===
  {
    id: 'med-focus-1',
    title: 'Elevate Your Focus',
    author: 'Vasavi Kumar',
    modality: 'Meditation',
    goalCategories: ['Focus'],
    duration: '10 min',
    image: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
    bestTime: 'Afternoon',
  },
  {
    id: 'med-focus-2',
    title: 'Sharp Focus',
    author: 'House of Wellbeing',
    modality: 'Hypnotherapy',
    goalCategories: ['Focus'],
    duration: '15 min',
    image: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
    bestTime: 'Afternoon',
  },
  {
    id: 'med-focus-3',
    title: 'Laser Focus for Work',
    author: 'Ruwan Meepagala',
    modality: 'Meditation',
    goalCategories: ['Focus'],
    duration: '8 min',
    image: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
    bestTime: 'Afternoon',
  },
  {
    id: 'med-focus-4',
    title: 'Stellar Focus With Sound Wave Frequencies',
    author: 'The Monroe Institute',
    modality: 'Sound Healing',
    goalCategories: ['Focus'],
    duration: '20 min',
    image: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
    bestTime: 'Afternoon',
  },

  // === CONFIDENCE ===
  {
    id: 'med-conf-1',
    title: 'Rewiring Confidence',
    author: 'Alistair Hart',
    modality: 'Meditation',
    goalCategories: ['Confidence'],
    duration: '12 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-conf-2',
    title: 'Easy Confidence Booster',
    author: 'House of Wellbeing',
    modality: 'Hypnotherapy',
    goalCategories: ['Confidence'],
    duration: '15 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-conf-3',
    title: 'Pure Confidence',
    author: 'The Monroe Institute',
    modality: 'Sound Healing',
    goalCategories: ['Confidence'],
    duration: '20 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },

  // === SELF-LOVE ===
  {
    id: 'med-love-1',
    title: 'Nurturing Self-Love',
    author: 'Sahara Rose',
    modality: 'Meditation',
    goalCategories: ['Self-Love'],
    duration: '15 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-love-2',
    title: 'Deep Self-Love',
    author: 'Summer McStravick',
    modality: 'Meditation',
    goalCategories: ['Self-Love'],
    duration: '18 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-love-3',
    title: 'Discovering Your Worthiness',
    author: 'Lisa Nichols',
    modality: 'Visualization',
    goalCategories: ['Self-Love', 'Confidence'],
    duration: '20 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Morning',
  },

  // === HAPPINESS ===
  {
    id: 'med-happy-1',
    title: 'Unlock Your Joy',
    author: 'Sahara Rose',
    modality: 'Meditation',
    goalCategories: ['Happiness'],
    duration: '12 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-happy-2',
    title: 'Awakening Your Joy',
    author: 'Agapi Stassinopoulos',
    modality: 'Meditation',
    goalCategories: ['Happiness'],
    duration: '10 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
  },
  {
    id: 'med-happy-3',
    title: 'Smile From Within',
    author: 'Lee Holden',
    modality: 'Meditation',
    goalCategories: ['Happiness'],
    duration: '8 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },

  // === MANIFESTING ===
  {
    id: 'med-man-1',
    title: 'Abundance Meditation',
    author: 'Bob Proctor',
    modality: 'Visualization',
    goalCategories: ['Manifesting'],
    duration: '20 min',
    image: '/meditation-covers/Abundance_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-man-2',
    title: 'Manifesting Your Ideal Reality',
    author: 'Regan Hillyer',
    modality: 'Visualization',
    goalCategories: ['Manifesting'],
    duration: '15 min',
    image: '/meditation-covers/Manifesting_Health_Wealth_Love.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-man-3',
    title: 'Manifest Your Desires: SOMA Breath',
    author: 'Niraj Naik',
    modality: 'Breathwork',
    goalCategories: ['Manifesting'],
    duration: '18 min',
    image: '/meditation-covers/Manifesting_Health_Wealth_Love.jpg',
    bestTime: 'Morning',
  },

  // === WELLNESS ===
  {
    id: 'med-well-1',
    title: 'Vitality Unleashed: SOMA Breath',
    author: 'Niraj Naik',
    modality: 'Breathwork',
    goalCategories: ['Wellness'],
    duration: '15 min',
    image: '/meditation-covers/Deep_Relaxation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-well-2',
    title: 'My Body is a Wellness Machine',
    author: 'Marisa Peer',
    modality: 'Visualization',
    goalCategories: ['Wellness', 'Self-Love'],
    duration: '20 min',
    image: '/meditation-covers/Deep_Relaxation.jpg',
    bestTime: 'Morning',
  },

  // === SPIRITUAL GROWTH ===
  {
    id: 'med-spirit-1',
    title: '6-Phase Meditation',
    author: 'Vishen',
    modality: 'Meditation',
    goalCategories: ['Spiritual Growth', 'Happiness'],
    duration: '20 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Morning',
  },
  {
    id: 'med-spirit-2',
    title: 'Activating Your Success Energy',
    author: 'Marie Diamond',
    modality: 'Visualization',
    goalCategories: ['Spiritual Growth', 'Manifesting'],
    duration: '25 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Morning',
  },

  // === RELATIONSHIPS ===
  {
    id: 'med-rel-1',
    title: 'Heart Trance Meditation',
    author: 'Nalaya Chakana',
    modality: 'Meditation',
    goalCategories: ['Relationships', 'Self-Love'],
    duration: '15 min',
    image: '/meditation-covers/6-Phase_Meditation.jpg',
    bestTime: 'Night',
  },
  {
    id: 'med-rel-2',
    title: 'Manifest Love Now',
    author: 'Nalaya Chakana',
    modality: 'Meditation',
    goalCategories: ['Relationships'],
    duration: '18 min',
    image: '/meditation-covers/Manifesting_Health_Wealth_Love.jpg',
    bestTime: 'Night',
  },
];

// Helper: filter meditations by goal category
export function getMeditationsByGoal(goal: string): PracticeMeditation[] {
  return meditationLibrary.filter(m => m.goalCategories.includes(goal));
}

// Helper: filter meditations by modality
export function getMeditationsByModality(modality: Modality): PracticeMeditation[] {
  return meditationLibrary.filter(m => m.modality === modality);
}

// Helper: filter by both
export function filterMeditations(goal?: string, modality?: Modality): PracticeMeditation[] {
  return meditationLibrary.filter(m => {
    const matchesGoal = !goal || m.goalCategories.includes(goal);
    const matchesModality = !modality || m.modality === modality;
    return matchesGoal && matchesModality;
  });
}
