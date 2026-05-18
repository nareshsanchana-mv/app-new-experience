// Cover image assets — local require() so they bundle into the native app.
// Web build picks up the same files via the bundler; the previous /covers/...
// string paths only worked on web (public/ served at root).
const coverImages = {
  silvaUltramind: require('../../assets/covers/The_Silva_Ultramind_System.jpg'),
  superbrain: require('../../assets/covers/Superbrain.png'),
  duality: require('../../assets/covers/Duality.jpg'),
  wildfit: require('../../assets/covers/Wildfit.png'),
  sixPhase: require('../../assets/covers/The_6_Phase_Meditation.jpg'),
  fengShui: require('../../assets/covers/Feng_Shui_for_Life.png'),
  beExtraordinary: require('../../assets/covers/Be_Extraordinary.jpg'),
  manifestingMastery: require('../../assets/covers/Manifesting_Mastery.jpg'),
  tenXFitness: require('../../assets/covers/10X_Fitness.jpg'),
  yogiGuide: require('../../assets/covers/A_Yogis_Guide_to_Joy.jpg'),
  moneyEQ: require('../../assets/covers/Money_EQ.png'),
  speakInspire: require('../../assets/covers/Speak_and_Inspire.png'),
  longevityBlueprint: require('../../assets/covers/The_Longevity_Blueprint.png'),
  consciousParenting: require('../../assets/covers/Conscious_Parenting_Mastery.png'),
  certifiedHypnotherapist: require('../../assets/covers/Mindvalley_Certified_Hypnotherapist.jpg'),
  buildingBrand: require('../../assets/covers/Building_an_Unstoppable_Brand.jpg'),
  gettingStarted: require('../../assets/covers/Getting_Started_with_Mindvalley.jpg'),
  lifebook: require('../../assets/covers/Lifebook.png'),
  artOfManifesting: require('../../assets/covers/The_Art_of_Manifesting.png'),
  // No bundled cover for Sleep Mastery yet — fall back to longevity blueprint
  sleepMastery: require('../../assets/covers/The_Longevity_Blueprint.png'),
  negotiateConfidence: require('../../assets/covers/Negotiate_with_Confidence_Clarity_in_Every_Conversation.jpg'),
  lifebookMastery: require('../../assets/covers/Lifebook_Mastery.jpg'),
};

// Sound cover images (served from public/sound-covers/ directory)
// 229 sounds from Mindvalley Audiowaves — downloaded from Airtable 16 Mar 2026
const soundCovers: Record<string, string> = {
  'Leo': '/sound-covers/Leo.jpg',
  'Moon Chasm': '/sound-covers/Moon_Chasm.jpg',
  'Purification Solfeggio 417 Hz': '/sound-covers/Purification_Solfeggio_417_Hz.jpg',
  'Air - Theta Beats 6Hz': '/sound-covers/Air_-_Theta_Beats_6Hz.jpg',
  'Earth - Alpha 8Hz (Binaural)': '/sound-covers/Earth_-_Alpha_8Hz_Binaural.jpg',
  'Embrace - Alpha 8Hz (Binaural)': '/sound-covers/Embrace_-_Alpha_8Hz_Binaural.jpg',
  'Sleep - Delta 3Hz (Binaural)': '/sound-covers/Sleep_-_Delta_3Hz_Binaural.jpg',
  'Water - Alpha 8Hz (Binaural)': '/sound-covers/Water_-_Alpha_8Hz_Binaural.jpg',
  'Alpha Waves 10Hz Relaxation': '/sound-covers/Alpha_Waves_10Hz_Relaxation.jpg',
  'Crown Chakra - Higher Consciousness & Divine Connection': '/sound-covers/Crown_Chakra_-_Higher_Consciousness__Divine_Connection.jpg',
  'Delta Waves 1.5Hz Deep Sleep': '/sound-covers/Delta_Waves_1.5Hz_Deep_Sleep.jpg',
  'Gamma Waves 35Hz Higher Consciousness': '/sound-covers/Gamma_Waves_35Hz_Higher_Consciousness.jpg',
  'Gray Noise for Tinnitus Relief': '/sound-covers/Gray_Noise_for_Tinnitus_Relief.jpg',
  'High Beta Waves 24Hz Excitement': '/sound-covers/High_Beta_Waves_24Hz_Excitement.jpg',
  'Immersive Binaural Soundbath': '/sound-covers/Immersive_Binaural_Soundbath.jpg',
  'Low Betta Waves 14Hz Focus': '/sound-covers/Low_Betta_Waves_14Hz_Focus.jpg',
  'Mid Beta Waves 18Hz Alertness': '/sound-covers/Mid_Beta_Waves_18Hz_Alertness.jpg',
  'Ocean Healing': '/sound-covers/Ocean_Healing.jpg',
  'Om Chant': '/sound-covers/Om_Chant.jpg',
  'Sacral Chakra - Sexual & Creative Energy': '/sound-covers/Sacral_Chakra_-_Sexual__Creative_Energy.jpg',
  'Theta Waves 6Hz Meditation': '/sound-covers/Theta_Waves_6Hz_Meditation.jpg',
  'Third Eye Chakra - Intuition & Awareness': '/sound-covers/Third_Eye_Chakra_-_Intuition__Awareness.jpg',
  'Throat Chakra - Communication': '/sound-covers/Throat_Chakra_-_Communication.jpg',
  'Violet Noise for Tinnitus Relief': '/sound-covers/Violet_Noise_for_Tinnitus_Relief.jpg',
  'White Noise for Improving Sleep and Reducing Anxiety': '/sound-covers/White_Noise_for_Improving_Sleep_and_Reducing_Anxiety.jpg',
  'Zen Retreat - THETA 6Hz': '/sound-covers/Zen_Retreat_-_THETA_6Hz.jpg',
  'Chi-Energy': '/sound-covers/Chi-Energy.jpg',
  'Heart Chakra - Love & Relationships': '/sound-covers/Heart_Chakra_-_Love__Relationships.jpg',
  'Root Chakra - Basic Trust': '/sound-covers/Root_Chakra_-_Basic_Trust.jpg',
  'Productivity': '/sound-covers/Productivity.jpg',
  'Pure Flow': '/sound-covers/Pure_Flow.jpg',
  'Sunset Walk': '/sound-covers/Sunset_Walk.jpg',
  'Infinity': '/sound-covers/Infinity.jpg',
  'Mycelium': '/sound-covers/Mycelium.jpg',
  'Earth\'s Breath': '/sound-covers/Earths_Breath.jpg',
  'Bliss': '/sound-covers/Bliss.jpg',
  'Dream': '/sound-covers/Dream.jpg',
  'Focus': '/sound-covers/Focus.jpg',
  'Gazm': '/sound-covers/Gazm.jpg',
  'Zen': '/sound-covers/Zen.jpg',
  // Zodiac series (Gabriel Loynaz)
  'Taurus': '/sound-covers/Taurus.jpg',
  'Aries': '/sound-covers/Aries.jpg',
  'Pisces': '/sound-covers/Pisces.jpg',
  'Gemini': '/sound-covers/Gemini.jpg',
  'Cancer': '/sound-covers/Cancer.jpg',
  'Capricorn': '/sound-covers/Capricorn.jpg',
  'Scorpius': '/sound-covers/Scorpius.jpg',
  'Virgo': '/sound-covers/Virgo.jpg',
  'Libra': '/sound-covers/Libra.jpg',
  'Sagittarius': '/sound-covers/Sagittarius.jpg',
};

// Helper to get a sound cover by name (falls back to null)
export function getSoundCover(name: string): string | null {
  return soundCovers[name] ?? null;
}

// Meditation & sound cover images (served from public/ directory)
const meditationCovers = {
  manifestingHealthWealthLove: '/meditation-covers/Manifesting_Health_Wealth_Love.jpg',
  releasingAnxiety: '/meditation-covers/Releasing_Anxiety.jpg',
  sleepInducingBodyScan: '/meditation-covers/Sleep_Inducing_Body_Scan.jpg',
  sinkBackIntoSleep: '/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg',
  thirdEyeChakra: '/meditation-covers/Third_Eye_Chakra_Intuition_Wisdom.jpg',
  sixPhaseMeditation: '/meditation-covers/6-Phase_Meditation.jpg',
  deepRelaxation: '/meditation-covers/Deep_Relaxation.jpg',
  clarityOfVision: '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg',
  abundanceMeditation: '/meditation-covers/Abundance_Meditation.jpg',
  profoundSleep: '/meditation-covers/Profound_Sleep.jpg',
};

// Mock data for Mindvalley app

export const user = {
  name: 'Naresh',
  fullName: 'Naresh Sanchana',
  email: 'nsanchana@gmail.com',
  avatar: require('../../assets/naresh-avatar.jpeg'),
  dayStreak: 0,
  lessonsCompleted: 15,
  meditatedMinutes: 27,
};

export const achievements = [
  {
    id: '1',
    title: 'Balanced Mind',
    date: '10/11/2025',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200',
  },
  {
    id: '2',
    title: 'First Step',
    date: '08/12/2025',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200',
  },
  {
    id: '3',
    title: 'Tranquil Journey',
    date: '03/14/2025',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200',
  },
  {
    id: '4',
    title: 'Consistency Seed',
    date: '01/18/2025',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200',
  },
];

export const growthGoals = [
  { id: '1', title: 'Deeper Connection with Your Partner', color: '#E040FB' },
  { id: '2', title: 'Getting Fitter', color: '#E040FB' },
  { id: '3', title: 'Growing Your Finances', color: '#F5A623' },
  { id: '4', title: 'Better Parenting', color: '#E040FB' },
  { id: '5', title: 'Improving Overall Health', color: '#00D4AA' },
  { id: '6', title: 'Better Sleep', color: '#00D4AA' },
];

export const eveRecommendations = [
  {
    id: '1',
    type: 'lesson' as const,
    title: 'Rewire Your Belief Systems to Overcome Your Fears',
    author: 'The Science of Personal Branding',
    image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&q=80',
    rating: 4.9,
    duration: '19m',
    reason: 'Boost confidence to launch your business by overcoming limiting beliefs.',
  },
  {
    id: '2',
    type: 'lesson' as const,
    title: 'Discover Your Ideal Client',
    author: 'The Science of Personal Branding',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
    rating: 4.8,
    duration: '22m',
    reason: 'Focus your efforts on those who resonate with your soul-aligned business.',
  },
  {
    id: '3',
    type: 'meditation' as const,
    title: 'Finding Your Life Purpose',
    author: 'Anodea Judith',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80',
    rating: 4.7,
    duration: '25m',
    isLocked: true,
    reason: 'Uncover your passion and create a soul-aligned business.',
  },
];

export const freePrograms = [
  {
    id: '1',
    title: 'Getting Started with Mindvalley',
    author: 'Vishen',
    image: coverImages.gettingStarted,
    userCount: 92189,
    lessonCount: 10,
  },
  {
    id: '2',
    title: 'The 3 Most Important Questions',
    author: 'Vishen',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    userCount: 68340,
    lessonCount: 8,
  },
];

export const todayMeditations = [
  {
    id: '1',
    title: 'Infiniprayer',
    author: 'Mahatria',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80',
    rating: 4.6,
    duration: '1m',
    category: 'UNDER 5 MINS',
  },
  {
    id: '2',
    title: 'Phase 2: Gratitude',
    author: 'Vishen',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    rating: 4.7,
    duration: '9m',
    category: 'UNDER 10 MINS',
  },
  {
    id: '3',
    title: 'Manifesting Health, Wealth & Love',
    author: 'Sarah Prout',
    image: meditationCovers.manifestingHealthWealthLove,
    rating: 4.8,
    duration: '17m',
    category: 'UNDER 20 MINS',
  },
];

export const popularPrograms = [
  {
    id: '1',
    title: 'The Silva Ultramind System',
    author: 'Vishen',
    image: coverImages.silvaUltramind,
    userCount: 361877,
    lessonCount: 29,
  },
  {
    id: '2',
    title: 'Superbrain',
    author: 'Jim Kwik',
    image: coverImages.superbrain,
    userCount: 2725900,
    lessonCount: 34,
  },
];

export const trendingPrograms = [
  {
    id: '1',
    rank: 1,
    title: 'The Silva Ultramind System',
    author: 'Vishen',
    image: coverImages.silvaUltramind,
  },
  {
    id: '2',
    rank: 2,
    title: 'Duality',
    author: 'Jeffrey Allen',
    image: coverImages.duality,
  },
  {
    id: '3',
    rank: 3,
    title: 'Wildfit',
    author: 'Eric Edmeades',
    image: coverImages.wildfit,
  },
];

export const categories = [
  { id: '1', name: 'Mind', image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&q=80', color: '#3B82F6' },
  { id: '2', name: 'Soul', image: 'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=400&q=80', color: '#F59E0B' },
  { id: '3', name: 'Body', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80', color: '#10B981' },
  { id: '4', name: 'Entrepreneurship', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80', color: '#EF4444' },
  { id: '5', name: 'Career Growth', image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&q=80', color: '#8B5CF6' },
  { id: '6', name: 'Relationships', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80', color: '#EC4899' },
];

// Real Mindvalley author photos (downloaded from Airtable CSV, 16 Mar 2026)
const authorPhotos = {
  neelamVerma: require('../../assets/authors/neelam-verma.jpg'),
  montyMoran: require('../../assets/authors/monty-moran.jpg'),
  kristina: require('../../assets/authors/kristina.jpg'),
  lindaClemons: require('../../assets/authors/linda-clemons.jpg'),
  jenniferPartridge: require('../../assets/authors/jennifer-partridge.jpg'),
  paulMcKenna: require('../../assets/authors/paul-mckenna.jpg'),
  marieDiamond: require('../../assets/authors/marie-diamond.jpg'),
};

export const dailyShorts = [
  {
    id: '1',
    title: 'Why Is Dating So Hard?',
    author: 'Neelam Verma',
    authorDescription: 'Relationship coach & author',
    // Couple walking together — thematically relevant
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=300',
    authorImage: authorPhotos.neelamVerma,
  },
  {
    id: '2',
    title: 'The Transformational Leader',
    author: 'Monty Moran',
    authorDescription: 'Former CEO of Chipotle & leadership expert',
    // Confident professional in a leadership setting
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300',
    authorImage: authorPhotos.montyMoran,
  },
  {
    id: '3',
    title: 'Why Everything You Do Matters',
    author: 'Kristina Mänd-Lakhiani',
    authorDescription: 'Co-founder of Mindvalley & personal growth expert',
    // Person on mountain peak — purpose & meaning
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=300',
    authorImage: authorPhotos.kristina,
  },
  {
    id: '4',
    title: 'The Secret To Leveling Up Your Success',
    author: 'Linda Clemons',
    authorDescription: 'World-renowned nonverbal communications expert',
    // Team celebrating / success energy
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300',
    authorImage: authorPhotos.lindaClemons,
  },
  {
    id: '5',
    title: 'What is EFT Tapping?',
    author: 'Jennifer Partridge',
    authorDescription: 'Founder of Dream Awake Tapping & tapping expert',
    // Calm meditation / energy healing scene
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300',
    authorImage: authorPhotos.jenniferPartridge,
  },
];

export const topRatedMeditations = [
  {
    id: '1',
    title: 'Dissolving Memories',
    author: 'Gabriel Loynaz',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&q=80',
    rating: 4.9,
    duration: '15m',
    isLocked: true,
  },
  {
    id: '2',
    title: 'The Great Vision',
    author: 'Gabriel Loynaz',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    rating: 4.9,
    duration: '20m',
    isLocked: true,
  },
  {
    id: '3',
    title: 'Ocean Healing',
    author: 'Gabriel Loynaz',
    image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
    rating: 4.9,
    duration: '12m',
    isLocked: true,
  },
  {
    id: '4',
    title: 'Third Eye Chakra',
    author: 'Gabriel Loynaz',
    image: meditationCovers.thirdEyeChakra,
    rating: 4.9,
    duration: '18m',
    isLocked: true,
  },
];



export const evePrompts = [
  "I'm feeling stressed, tired, or seeking better sleep.",
  "I'm looking to lose weight and improve my fitness.",
  "I want to develop a growth mindset and increase my self-confidence.",
  "I want to enhance my leadership skills, build a strong team and inspire others.",
];

// L3/L4 Subscriber Data

export const continuePrograms = [
  {
    id: '1',
    title: 'Centering Exercise 1',
    programName: 'THE SILVA ULTRAMIND SYSTEM',
    lessonTitle: 'Centering Exercise 1',
    author: 'Vishen',
    image: coverImages.silvaUltramind,
    duration: '27m',
    progress: 0.034,
    lessonsCompleted: 1,
    totalLessons: 29,
  },
  {
    id: '2',
    title: 'Introduction to Manifestation',
    programName: 'DUALITY',
    lessonTitle: 'Introduction to Manifestation',
    author: 'Jeffrey Allen',
    image: coverImages.duality,
    duration: '18m',
    progress: 0,
    lessonsCompleted: 0,
    totalLessons: 30,
  },
];

export const premiumPrograms = [
  {
    id: '1',
    title: 'AI Mastery 2026',
    author: 'Vishen, Vykintas Glodenis, Domenic Ashburn, I...',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80',
    userCount: 8,
    lessonCount: 0,
  },
  {
    id: '2',
    title: 'Certified Hypnotherapist',
    author: 'Ajit Nawalkha',
    image: coverImages.certifiedHypnotherapist,
    userCount: 2791,
    lessonCount: 8,
  },
];

export const favorites = [
  {
    id: '1',
    title: 'Duality',
    author: 'Jeffrey Allen',
    image: coverImages.duality,
    type: 'quest' as const,  // rectangular landscape
  },
  {
    id: '2',
    title: 'Superbrain',
    author: 'Jim Kwik',
    image: coverImages.superbrain,
    type: 'quest' as const,  // rectangular landscape
  },
  {
    id: '3',
    title: "A Yogi's Guide to Joy",
    author: 'Sadhguru',
    image: coverImages.yogiGuide,
    type: 'meditation' as const,  // square
  },
  {
    id: '4',
    title: 'Leo',
    author: 'Gabriel Loynaz',
    image: soundCovers['Leo'],
    type: 'sound' as const,  // circular
  },
];

export const growthGoalsPrograms = [
  {
    id: '1',
    title: 'The 6 Phase Meditation',
    author: 'Vishen',
    image: coverImages.sixPhase,
    userCount: 135584,
    lessonCount: 7,
    tag: 'Forgiveness',
  },
  {
    id: '2',
    title: 'Feng Shui for Life',
    author: 'Marie Diamond',
    image: coverImages.fengShui,
    userCount: 115975,
    lessonCount: 30,
    tag: 'Manifesting',
  },
];

export const featuredBanners = [
  {
    id: '1',
    title: 'Negotiate with Confidence',
    subtitle: 'Speak with clarity. Set boundaries.\nWin conversations that matter.',
    label: 'QUEST OF THE WEEK',
    buttonText: 'Explore the quest',
    author: 'Kwame Christian',
    image: coverImages.negotiateConfidence,
  },
  {
    id: '2',
    title: 'Weekly Challenge',
    subtitle: 'Complete 7 days of meditation',
    label: 'CHALLENGE',
    buttonText: 'Join now',
    author: '',
    image: 'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=400&q=80',
  },
];

export const pickedForYou = [
  {
    id: '1',
    title: 'Getting Started with Mindvalley',
    author: 'Vishen',
    image: coverImages.gettingStarted,
    lessonCount: 10,
  },
];

export const featuredAuthors = [
  { id: '1', name: 'Neale Donald Walsch', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: '2', name: 'JJ Virgin', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  { id: '3', name: 'Emily Fletcher', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200' },
  { id: '4', name: 'Paul McKenna', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200' },
];

export const meditationsForGoal = {
  goal: 'Better Sleep',
  meditations: [
    {
      id: '1',
      title: 'Releasing Anxiety',
      author: 'Brett Bevell',
      image: meditationCovers.releasingAnxiety,
      rating: 4.3,
      duration: '3m',
    },
    {
      id: '2',
      title: 'Sleep Inducing Body Scan',
      author: 'House of Wellbeing',
      image: meditationCovers.sleepInducingBodyScan,
      rating: 4.7,
      duration: '25m',
    },
    {
      id: '3',
      title: 'Sink Back Into Deeper Sleep',
      author: 'House of Wellbeing',
      image: meditationCovers.sinkBackIntoSleep,
      rating: 4.6,
      duration: '2m',
    },
  ],
};

export const soundsForGoal = {
  goal: 'Focus',
  sounds: [
    {
      id: '1',
      title: 'Taurus',
      author: 'Gabriel Loynaz',
      image: soundCovers['Taurus'] ?? '/sound-covers/Taurus.jpg',
      rating: 4.9,
    },
    {
      id: '2',
      title: 'Aries',
      author: 'Gabriel Loynaz',
      image: soundCovers['Aries'] ?? '/sound-covers/Aries.jpg',
      rating: 4.8,
    },
    {
      id: '3',
      title: 'Pisces',
      author: 'Gabriel Loynaz',
      image: soundCovers['Pisces'] ?? '/sound-covers/Pisces.jpg',
      rating: 4.8,
    },
  ],
};

export const liveClasses = [
  {
    id: '1',
    title: 'Week 9: Live Q&A Call',
    host: 'Paul Mckenna',
    programName: 'HYPNOTHERAPIST',
    programLabel: 'Mindvalley certified',
    time: 'Today · 11:00pm - 12:00am',
    image: authorPhotos.paulMcKenna,
  },
  {
    id: '2',
    title: 'Meeting Intelligence Clone: Q&A/Workshop',
    host: 'Vykintas Glodenis',
    programName: 'AI ACCELERATOR',
    programLabel: '',
    time: 'Today · 11:00pm - 12:00am',
    // AI / neural network visual (no real author photo available)
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=300',
  },
  {
    id: '3',
    title: 'Forgiveness Ritual',
    host: 'Marie Diamond',
    programName: 'SPIRITUAL MASTERY',
    programLabel: '',
    time: 'Today · 11:00pm - 12:30am',
    image: authorPhotos.marieDiamond,
  },
];

// Quest/Program Lessons Data

export interface QuestLesson {
  id: string;
  lessonNumber: number;
  title: string;
  author: string;
  duration: string;
  image: string;
  isCompleted: boolean;
  videoUrl?: string;
}

export interface QuestWeek {
  id: string;
  weekNumber: number;
  title: string;
  lessons: QuestLesson[];
}

export interface Quest {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  image: string;
  totalLessons: number;
  completedLessons: number;
  weeks: QuestWeek[];
  description: string;
}

export const questsData: Record<string, Quest> = {
  'silva-ultramind': {
    id: 'silva-ultramind',
    title: 'The Silva Ultramind System',
    subtitle: 'By José Silva & Vishen',
    author: 'Vishen',
    image: coverImages.silvaUltramind,
    totalLessons: 29,
    completedLessons: 1,
    description: 'Welcome to the second day of your Silva Ultramind journey. Today you will learn to access deeper levels of the mind where you can program yourself for success.',
    weeks: [
      {
        id: 'week1',
        weekNumber: 1,
        title: 'Week 1: The Foundations of the Silva Method',
        lessons: [
          {
            id: 'l1',
            lessonNumber: 1,
            title: 'Welcome to Silva Ultramind',
            author: 'Vishen',
            duration: '15 mins',
            image: coverImages.silvaUltramind,
            isCompleted: true,
          },
          {
            id: 'l2',
            lessonNumber: 2,
            title: 'Tap into Alpha with the Centering Exercise',
            author: 'Vishen',
            duration: '27 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
          {
            id: 'l3',
            lessonNumber: 3,
            title: 'The Power of Dynamic Meditation',
            author: 'Vishen',
            duration: '22 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
          {
            id: 'l4',
            lessonNumber: 4,
            title: 'Centering Exercise 2',
            author: 'Vishen',
            duration: '25 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
        ],
      },
      {
        id: 'week2',
        weekNumber: 2,
        title: 'Week 2: The Alpha & Theta States',
        lessons: [
          {
            id: 'l5',
            lessonNumber: 5,
            title: 'Understanding Brain Wave States',
            author: 'Vishen',
            duration: '18 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
          {
            id: 'l6',
            lessonNumber: 6,
            title: 'The Three Scenes Technique',
            author: 'Vishen',
            duration: '24 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
          {
            id: 'l7',
            lessonNumber: 7,
            title: 'Centering Exercise 3',
            author: 'Vishen',
            duration: '23 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
        ],
      },
      {
        id: 'week3',
        weekNumber: 3,
        title: 'Week 3: Visualization & Mental Imagery',
        lessons: [
          {
            id: 'l8',
            lessonNumber: 8,
            title: 'The Power of Visualization',
            author: 'Vishen',
            duration: '20 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
          {
            id: 'l9',
            lessonNumber: 9,
            title: 'Creating Your Mental Screen',
            author: 'Vishen',
            duration: '19 mins',
            image: coverImages.silvaUltramind,
            isCompleted: false,
          },
        ],
      },
    ],
  },
  'manifesting-mastery': {
    id: 'manifesting-mastery',
    title: 'Manifesting Mastery',
    author: 'Regan Hillyer',
    image: coverImages.manifestingMastery,
    totalLessons: 52,
    completedLessons: 0,
    description: 'Learn the art and science of manifesting your dreams into reality with proven techniques.',
    weeks: [
      {
        id: 'week1',
        weekNumber: 1,
        title: 'Week 1: Introduction to Manifestation',
        lessons: [
          {
            id: 'l1',
            lessonNumber: 1,
            title: 'What is Manifestation?',
            author: 'Regan Hillyer',
            duration: '18 mins',
            image: coverImages.manifestingMastery,
            isCompleted: false,
          },
          {
            id: 'l2',
            lessonNumber: 2,
            title: 'The Law of Attraction',
            author: 'Regan Hillyer',
            duration: '22 mins',
            image: coverImages.manifestingMastery,
            isCompleted: false,
          },
        ],
      },
    ],
  },
};

export const currentLessonMeditation = {
  type: 'MEDITATIONS',
  duration: '20m',
  title: 'The Silva Centering Exercise - Alpha',
  author: 'Vishen',
  image: coverImages.silvaUltramind,
};

export const lessonTasks = [
  {
    id: '1',
    title: 'Practice the Silva Centering Exercise.',
    isCompleted: false,
  },
];

// Pathways Collections data
export interface CollectionProgram {
  id: string;
  title: string;
  author: string;
  image: string;
  lessonCount: number;
  userCount: number;
  duration: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  gradientColors: string[];
  accentColor: string;
  programCount: number;
  lessonCount: number;
  icon: string;
  programs: CollectionProgram[];
  pricingSingle: string;
  pricingCollection: string;
  pricingAllAccess: string;
}

export const collections: Collection[] = [
  {
    id: 'mindset',
    name: 'Mindset',
    tagline: 'Peak Performance & Mental Mastery',
    gradientColors: ['#2d0b6e', '#4a1d8a', '#6b2fc7'],
    accentColor: '#9D5CFF',
    programCount: 7,
    lessonCount: 210,
    icon: '🧠',
    pricingSingle: '$49',
    pricingCollection: '$149/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'silva', title: 'The Silva Ultramind System', author: 'Vishen', image: coverImages.silvaUltramind, lessonCount: 29, userCount: 361877, duration: '29 lessons' },
      { id: 'superbrain', title: 'Superbrain', author: 'Jim Kwik', image: coverImages.superbrain, lessonCount: 34, userCount: 2725900, duration: '34 lessons' },
      { id: 'limitless', title: 'Becoming Limitless', author: 'Vishen Lakhiani', image: coverImages.beExtraordinary, lessonCount: 28, userCount: 180000, duration: '28 lessons' },
      { id: 'extraordinary', title: 'Be Extraordinary', author: 'Vishen', image: coverImages.beExtraordinary, lessonCount: 30, userCount: 250000, duration: '30 lessons' },
      { id: 'lifebook', title: 'Lifebook Online', author: 'Jon & Missy Butcher', image: coverImages.lifebook, lessonCount: 35, userCount: 145000, duration: '35 lessons' },
    ],
  },
  {
    id: 'manifesting',
    name: 'Manifesting',
    tagline: 'Law of Attraction & Abundance',
    gradientColors: ['#451a03', '#92400e', '#d97706'],
    accentColor: '#fbbf24',
    programCount: 5,
    lessonCount: 155,
    icon: '✨',
    pricingSingle: '$49',
    pricingCollection: '$129/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'manifesting', title: 'The Art of Manifesting', author: 'Regan Hillyer', image: coverImages.artOfManifesting, lessonCount: 52, userCount: 98000, duration: '52 lessons' },
      { id: 'duality', title: 'Duality', author: 'Jeffrey Allen', image: coverImages.duality, lessonCount: 30, userCount: 220000, duration: '30 lessons' },
      { id: 'money-eq', title: 'Money EQ', author: 'Ken Honda', image: coverImages.moneyEQ, lessonCount: 21, userCount: 119577, duration: '21 lessons' },
    ],
  },
  {
    id: 'longevity',
    name: 'Longevity',
    tagline: 'Health, Fitness & Longevity Science',
    gradientColors: ['#0f1a4a', '#1e3a8a', '#2563eb'],
    accentColor: '#60a5fa',
    programCount: 5,
    lessonCount: 130,
    icon: '💪',
    pricingSingle: '$49',
    pricingCollection: '$129/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'fitness', title: '10x Fitness', author: 'Lorenzo Delano & Ronan Diego', image: coverImages.tenXFitness, lessonCount: 26, userCount: 175000, duration: '26 lessons' },
      { id: 'sleep', title: 'Sleep Mastery', author: 'Dr. Michael Breus', image: coverImages.sleepMastery, lessonCount: 22, userCount: 88000, duration: '22 lessons' },
      { id: 'longevity', title: 'Longevity Blueprint', author: 'Ben Greenfield', image: coverImages.longevityBlueprint, lessonCount: 24, userCount: 62000, duration: '24 lessons' },
    ],
  },
  {
    id: 'love-family',
    name: 'Love & Family',
    tagline: 'Relationships, Parenting & Connection',
    gradientColors: ['#4a044e', '#86198f', '#c026d3'],
    accentColor: '#f0abfc',
    programCount: 6,
    lessonCount: 180,
    icon: '❤️',
    pricingSingle: '$49',
    pricingCollection: '$139/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'parenting', title: 'Conscious Parenting', author: 'Dr. Shefali Tsabary', image: coverImages.consciousParenting, lessonCount: 28, userCount: 95000, duration: '28 lessons' },
      { id: 'relationship', title: 'The Relationship Expert', author: 'Neelam Verma', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80', lessonCount: 30, userCount: 72000, duration: '30 lessons' },
      { id: 'masculine', title: 'Masculine Feminine Connection', author: 'Masculine-Feminine School', image: 'https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?w=400&q=80', lessonCount: 25, userCount: 58000, duration: '25 lessons' },
    ],
  },
  {
    id: 'entrepreneur',
    name: 'Exponential Entrepreneur',
    tagline: 'Business, Leadership & Performance',
    gradientColors: ['#0f0f1a', '#1a2540', '#1e3a5f'],
    accentColor: '#93c5fd',
    programCount: 6,
    lessonCount: 165,
    icon: '🚀',
    pricingSingle: '$49',
    pricingCollection: '$149/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'brand', title: 'Building an Unstoppable Brand', author: 'Jeffrey Perlman', image: coverImages.buildingBrand, lessonCount: 19, userCount: 23448, duration: '19 lessons' },
      { id: 'leader', title: 'The Transformational Leader', author: 'Monty Moran', image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&q=80', lessonCount: 16, userCount: 14452, duration: '16 lessons' },
      { id: 'ai', title: 'AI Accelerator', author: 'Vishen & Vykintas Glodenis', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80', lessonCount: 11, userCount: 307006, duration: '11 lessons' },
    ],
  },
  {
    id: 'speaking',
    name: 'Speaking & Authorship',
    tagline: 'Communication, Writing & Influence',
    gradientColors: ['#052e16', '#14532d', '#166534'],
    accentColor: '#4ade80',
    programCount: 4,
    lessonCount: 110,
    icon: '🎙️',
    pricingSingle: '$49',
    pricingCollection: '$119/yr',
    pricingAllAccess: '$499/yr',
    programs: [
      { id: 'speak', title: 'Speak & Inspire', author: 'Lisa Nichols', image: coverImages.speakInspire, lessonCount: 28, userCount: 67000, duration: '28 lessons' },
      { id: 'writing', title: 'The Art of Storytelling', author: 'Michael Hauge', image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=400&q=80', lessonCount: 20, userCount: 42000, duration: '20 lessons' },
    ],
  },
];

// ─── Programs Page data (added 16 Mar 2026) ────────────────────────────────

export const hotInMalaysia = [
  { id: 'hot1', rank: 1, title: 'The 6 Phase Meditation', author: 'Vishen Lakhiani', coverImage: coverImages.sixPhase },
  { id: 'hot2', rank: 2, title: 'Superbrain', author: 'Jim Kwik', coverImage: coverImages.superbrain },
  { id: 'hot3', rank: 3, title: 'Duality', author: 'Jeffrey Allen', coverImage: coverImages.duality },
  { id: 'hot4', rank: 4, title: 'The M Word', author: 'Emily Fletcher', coverImage: 'https://images.unsplash.com/photo-1506126613408-4e0e0f7c50e1?w=300&q=80' },
  { id: 'hot5', rank: 5, title: 'Be Extraordinary', author: 'Vishen Lakhiani', coverImage: coverImages.beExtraordinary },
];

export const authorCollections = [
  { id: 'ac1', name: 'Vishen Lakhiani', avatar: require('../../assets/authors/vishen-lakhiani.jpg') },
  { id: 'ac2', name: 'Jim Kwik', avatar: require('../../assets/authors/jim-kwik.jpg') },
  { id: 'ac3', name: 'Emily Fletcher', avatar: require('../../assets/authors/emily-fletcher.jpg') },
  { id: 'ac4', name: 'Jeffrey Allen', avatar: require('../../assets/authors/jeffrey-allen.jpg') },
  { id: 'ac5', name: 'Marisa Peer', avatar: require('../../assets/authors/marisa-peer.jpg') },
  { id: 'ac6', name: 'Marie Diamond', avatar: require('../../assets/authors/marie-diamond.jpg') },
];

export const programsByCategory: Record<string, Array<{
  id: string; title: string; author: string;
  coverImage: any; enrolledCount: number; lessonCount: number;
}>> = {
  Mind: [
    { id: 'mind1', title: 'The Champion Mindset', author: 'Florencia Andres', coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80', enrolledCount: 12345, lessonCount: 20 },
    { id: 'mind2', title: 'Be Extraordinary', author: 'Vishen Lakhiani', coverImage: coverImages.beExtraordinary, enrolledCount: 54321, lessonCount: 30 },
    { id: 'mind3', title: 'Super Productivity', author: 'Vishen Lakhiani', coverImage: coverImages.gettingStarted, enrolledCount: 9800, lessonCount: 21 },
  ],
  Body: [
    { id: 'body1', title: 'Modern Qi Gong', author: 'Lee Holden', coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80', enrolledCount: 42104, lessonCount: 30 },
    { id: 'body2', title: 'Total Transformation Training', author: 'Christine Bullock', coverImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80', enrolledCount: 38866, lessonCount: 25 },
    { id: 'body3', title: '10X Fitness', author: 'Ronan Diego & Lorenzo Delano', coverImage: coverImages.tenXFitness, enrolledCount: 31200, lessonCount: 22 },
  ],
  Soul: [
    { id: 'soul1', title: 'Higher Self Activation', author: 'Ariya Lorenz', coverImage: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80', enrolledCount: 6596, lessonCount: 13 },
    { id: 'soul2', title: 'Unlimited Abundance', author: 'Christie Marie Sheldon', coverImage: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?w=400&q=80', enrolledCount: 66113, lessonCount: 22 },
    { id: 'soul3', title: 'Duality', author: 'Jeffrey Allen', coverImage: coverImages.duality, enrolledCount: 48200, lessonCount: 28 },
  ],
  Relationships: [
    { id: 'rel1', title: 'The Energies of Love', author: 'Donna Eden & David Feinstein', coverImage: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80', enrolledCount: 20002, lessonCount: 30 },
    { id: 'rel2', title: 'Calling in The One', author: 'Katherine Woodward Thomas', coverImage: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&q=80', enrolledCount: 29160, lessonCount: 12 },
    { id: 'rel3', title: 'Conscious Parenting Mastery', author: 'Dr. Shefali', coverImage: coverImages.consciousParenting, enrolledCount: 18500, lessonCount: 28 },
  ],
  Entrepreneurship: [
    { id: 'ent1', title: 'Negotiate with Confidence', author: 'Kwame Christian', coverImage: coverImages.negotiateConfidence, enrolledCount: 2370, lessonCount: 14 },
    { id: 'ent2', title: 'Building an Unstoppable Brand', author: 'Jeffrey Perlman', coverImage: coverImages.buildingBrand, enrolledCount: 23979, lessonCount: 16 },
    { id: 'ent3', title: 'Money EQ', author: 'Ken Honda', coverImage: coverImages.moneyEQ, enrolledCount: 41200, lessonCount: 18 },
  ],
  CareerGrowth: [
    { id: 'car1', title: 'The Stage Effect', author: 'Eric Edmeades', coverImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80', enrolledCount: 15469, lessonCount: 21 },
    { id: 'car2', title: 'Speak and Inspire', author: 'Lisa Nichols', coverImage: coverImages.speakInspire, enrolledCount: 67000, lessonCount: 28 },
    { id: 'car3', title: 'Super Reading', author: 'Jim Kwik', coverImage: coverImages.superbrain, enrolledCount: 9400, lessonCount: 20 },
  ],
};

export const newReleases = [
  { id: 'nr1', title: 'Negotiate with Confidence', author: 'Kwame Christian', lessonCount: 14,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
  { id: 'nr2', title: 'The Maestro to Leadership', author: 'Itay Talgam', lessonCount: 10,
    image: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=600&q=80' },
  { id: 'nr3', title: 'The Art of Manifesting', author: 'Regan Hillyer', lessonCount: 10,
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80' },
];

export const comingSoon = [
  {
    id: 'cs1',
    title: 'Bold Conversations',
    author: 'Vernā Myers',
    lessonCount: 11,
    description: "You've felt it before: the moment someone says something offensive, the room goes quiet, and nobody does anything. Not because they don't care, but because nobody taught them how. This course changes that.",
    coverImage: 'https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?w=800&q=80',
  },
];

// ─── Coach tab ─────────────────────────────────────────────────────────────
export const coachCertifications = [
  { id: 'cert1', title: 'Certified 10X Coach', author: 'Ajit Nawalkha, Lorenzo Delano',
    enrolledCount: 925, lessonCount: 93,
    coverImage: coverImages.tenXFitness },
  { id: 'cert2', title: 'Certified Business Coach', author: 'Ajit Nawalkha',
    enrolledCount: 2792, lessonCount: 88,
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80' },
  { id: 'cert3', title: 'Certified HoloBody Coach', author: 'Ronan Diego de Oliveira',
    enrolledCount: 2143, lessonCount: 138,
    coverImage: coverImages.tenXFitness },
  { id: 'cert4', title: 'Certified Life Coach', author: 'Ajit Nawalkha',
    enrolledCount: 5874, lessonCount: 80,
    coverImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80' },
  { id: 'cert5', title: 'Certified Hypnotherapist', author: 'Marisa Peer',
    enrolledCount: 3210, lessonCount: 72,
    coverImage: coverImages.certifiedHypnotherapist },
];

// ─── Recordings tab ────────────────────────────────────────────────────────
export const recordingShows = [
  {
    id: 'show1', name: 'Mindvalley Social Media Summit 2026', episodeCount: 3,
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&q=80',
    episodes: [
      { id: 'e1', title: 'Day 1: Find Your Voice', tag: 'Find Your Voice',
        tagColor: '#7C3AED', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80' },
      { id: 'e2', title: 'Day 2: Go Viral', tag: 'Go Viral',
        tagColor: '#059669', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80' },
      { id: 'e3', title: 'Day 3: Monetize Your Social Media', tag: 'Monetize Your Social Media',
        tagColor: '#0284C7', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80' },
    ],
  },
  {
    id: 'show2', name: 'Mindvalley Mentoring', episodeCount: 110,
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=120&q=80',
    episodes: [
      { id: 'e4', title: 'The Winning Sage', tag: 'Abundance',
        tagColor: '#B45309', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
      { id: 'e5', title: 'Regenerative Sexual Health', tag: 'Health',
        tagColor: '#7C3AED', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
      { id: 'e6', title: 'Calling in The One', tag: 'Relationships',
        tagColor: '#DB2777', image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80' },
    ],
  },
  {
    id: 'show3', name: 'Mentoring At Work', episodeCount: 46,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=120&q=80',
    episodes: [
      { id: 'e7', title: 'A Million Followers in 30 Days', tag: 'Social Media',
        tagColor: '#0284C7', image: require('../../assets/authors/brendan-kane.jpg') },
      { id: 'e8', title: 'Creating Change, Measuring Impact', tag: 'Leadership',
        tagColor: '#059669', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80' },
    ],
  },
  {
    id: 'show4', name: 'Mindvalley Films', episodeCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=120&q=80',
    episodes: [
      { id: 'e9', title: 'Human Longevity', tag: 'Health',
        tagColor: '#059669', image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80' },
    ],
  },
];

export const recordingCategories = [
  'Career', 'Character', 'Emotional Life', 'Financial',
  'Health & Fitness', 'Intellectual Life', 'Life Vision', 'Love Relationship',
  'Parenting', 'Quality of Life', 'Social Life', 'Spiritual',
];

// ─── Courses tab ────────────────────────────────────────────────────────────
export const coursesGrid = [
  { id: 'c1', title: 'Philosophers Notes', author: 'Brian Johnson',
    coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80' },
  { id: 'c2', title: '8 Flawesome Meditations', author: 'Kristina Mänd-Lakhiani',
    coverImage: require('../../assets/authors/kristina.jpg') },
  { id: 'c3', title: 'Abundance Meditation', author: 'Bob Proctor',
    coverImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&q=80' },
  { id: 'c4', title: 'Moving Meditation', author: 'Lee Holden',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80' },
  { id: 'c5', title: 'Silva Intuition System', author: 'Jose Silva',
    coverImage: coverImages.silvaUltramind },
  { id: 'c6', title: 'Silva Life System', author: 'Jose Silva',
    coverImage: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=400&q=80' },
  { id: 'c7', title: 'The Winning Sage', author: 'Helene Hadsell',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80' },
];

// ─── Quest / Lesson detail ──────────────────────────────────────────────────
export const questLessons = {
  silvaUltramind: {
    programTitle: 'The Silva Ultramind System',
    currentLesson: {
      number: 2,
      title: 'Tap into Alpha with the Centering Exercise',
      author: 'Vishen',
      duration: '27m',
      videoThumbnail: coverImages.silvaUltramind,
      videoDuration: '7m',
      meditation: {
        title: 'The Silva Centering Exercise - Alpha',
        author: 'Vishen',
        duration: '20m',
        image: coverImages.silvaUltramind,
      },
      bodyText: "Welcome to the second day of your Silva Ultramind journey.\n\nToday you will learn about the Silva Centering Exercise which is the foundation of the entire Silva UltraMind System. It will start you on the road re-building the intuitive genius you were born with.\n\n**Today's Tasks**\n\n1. Watch the video above and once you have completed it, listen to the Centering exercise. You do not need to repeat the Centering exercise today.\n\n2. Practice going to your center by using the 3-2-1 countdown. Jose Silva recommends that this is done up to 3 times a day for a minimum of 5 minutes each time.\n\n3. You will find the Beneficial, ESP, and Positive Statements listed below and you can repeat them to yourself while at your center.\n\n**Your Daily Practice - Going to your Center**\n\nWe recommend that you practice going to your center (also known as your 'level') 1 to 3 times every day. Do this by using the 3-2-1 Technique for a minimum of 5 minutes each time. When you reach your level, you can either relax at that state, or continue with any meditation practice you have.",
    },
    weeks: [
      {
        title: 'Week 1: The Mental Screen, Projection of Consciousness & Intuition',
        lessons: [
          { number: 1, title: 'Mastering Posture and Style', author: 'Vishen', duration: '23 mins', completed: true, image: coverImages.silvaUltramind },
          { number: 2, title: 'Tap into Alpha with the Centering Exercise', author: 'Vishen', duration: '27 mins', completed: false, image: coverImages.silvaUltramind },
          { number: 3, title: 'E.S.P. & the Mental Screen', author: 'Vishen', duration: '22 mins', completed: false, image: coverImages.silvaUltramind },
          { number: 4, title: 'The Mental Video Technique: Enlist Higher Intelligence to Solve Problems', author: 'Vishen', duration: '34 mins', completed: false, image: coverImages.silvaUltramind },
          { number: 5, title: 'Projection into Your Home', author: 'Vishen', duration: '41 mins', completed: false, image: coverImages.silvaUltramind },
          { number: 6, title: 'Centering Exercise 2', author: 'Vishen', duration: '27 mins', completed: false, image: coverImages.silvaUltramind },
          { number: 7, title: 'The Compass & The Rocket', author: 'Vishen', duration: '14 mins', completed: false, image: coverImages.silvaUltramind },
        ],
      },
    ],
  },
};

// ─── Meditations page data ──────────────────────────────────────────────────
export const meditationPractices = [
  { id: 'med',  label: 'Meditation',    icon: 'person-outline',   image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80' },
  { id: 'snd',  label: 'Soundscape',   icon: 'musical-note-outline', image: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80' },
  { id: 'heal', label: 'Sound Healing', icon: 'pulse-outline',    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80' },
  { id: 'hyp',  label: 'Hypnotherapy', icon: 'radio-button-on-outline', image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?w=400&q=80' },
  { id: 'vis',  label: 'Visualization', icon: 'eye-outline',      image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&q=80' },
  { id: 'bth',  label: 'Breathwork',   icon: 'cloud-outline',    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
];

export const meditationCategories = [
  { id: 'sleep',  label: 'BETTER SLEEP',  image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80' },
  { id: 'perf',   label: 'PERFORMANCE',   image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80' },
  { id: 'stress', label: 'STRESS RELIEF', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { id: 'focus',  label: 'FOCUS',         image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&q=80' },
];

export const soundCategories = [
  { id: 'altered', label: 'ALTERED STATES', image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800&q=80' },
  { id: 'nature',  label: 'NATURE',         image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { id: 'sleep2',  label: 'SLEEP',          image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&q=80' },
  { id: 'focus2',  label: 'FOCUS MUSIC',    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80' },
];

export const recentlyPlayed = [
  { id: 'rp1', title: 'Releasing Anxiety',      author: 'Brett Bevell',       duration: '3m',  image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&q=80' },
  { id: 'rp2', title: '3x3 Restful Sleep',       author: 'Dina Proctor',       duration: '3m',  image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&q=80' },
  { id: 'rp3', title: 'Sleep Inducing Body Scan', author: 'House of Wellbeing', duration: '25m', image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=200&q=80' },
  { id: 'rp4', title: 'Deep Stillness Gratitude Meditation', author: 'Tom Cronin', duration: '7m', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80' },
];

export const programMeditations = [
  {
    id: 'pm1',
    programTitle: 'The Silva Ultramind System',
    meditations: [
      { id: 'pmed1', title: 'The Mental Screen',                      image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=200&q=80' },
      { id: 'pmed2', title: 'The Silva Centering Exercise (Alpha Beats)', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&q=80' },
      { id: 'pmed3', title: 'The Short Relaxation',                   image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&q=80' },
    ],
  },
  {
    id: 'pm2',
    programTitle: 'Manifestation Mastery',
    meditations: [
      { id: 'pmed4', title: '8-Hour Manifestation', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80' },
      { id: 'pmed5', title: 'Morning Visualisation', image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=200&q=80' },
    ],
  },
];
