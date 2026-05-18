// Local asset requires for program covers
// React Native requires static require() calls for bundling

export const programCovers: Record<string, any> = {
  // === Manifesting Collection ===
  'sums': require('../../assets/covers/The_Silva_Ultramind_System.jpg'),
  'eld': require('../../assets/covers/Experience_Lucid_Dreaming.jpg'),
  'taap': require('../../assets/covers/The_Art_of_Astral_Projection.jpg'),
  'mb': require('../../assets/covers/Mystic_Brain.jpg'),
  'bw': require('../../assets/covers/Breathwork_for_Life.jpg'),
  'tem': require('../../assets/covers/Tapping_into_Emotional_Mastery.jpg'),
  'ygtj': require('../../assets/covers/A_Yogis_Guide_to_Joy.jpg'),
  '5eh': require('../../assets/covers/The_5_Elements_of_Happiness.jpg'),
  'ut': require('../../assets/covers/Unlocking_Transcendence.png'),
  'sss': require('../../assets/covers/Sixth_Sense_Superpower.jpg'),
  'lvm': require('../../assets/covers/Life_Visioning_Mastery.png'),
  'ua': require('../../assets/covers/Unlimited_Abundance.jpg'),
  'qj': require('../../assets/covers/Quantum_Jumping.jpg'),
  'cv': require('../../assets/covers/Creative_Visualization.png'),
  'sm': require('../../assets/covers/Success_Magic.jpg'),
  'tam': require('../../assets/covers/The_Art_of_Manifesting.png'),
  'em': require('../../assets/covers/Energy_Medicine.png'),
  'ch': require('../../assets/covers/Chakra_Healing.jpg'),
  'ats': require('../../assets/covers/Awaken_the_Species.png'),
  'sws': require('../../assets/covers/Speaking_with_Spirit.jpg'),
  'tus': require('../../assets/covers/The_Unbound_Self.jpg'),
  'hsa': require('../../assets/covers/Higher_Self_Activation.jpg'),
  'bml': require('../../assets/covers/Becoming_More_Loving.jpg'),
  'qsl': require('../../assets/covers/10_Questions_for_Self_Love.jpg'),
  'be': require('../../assets/covers/Be_Extraordinary.jpg'),
  'be4t': require('../../assets/covers/Be_Extraordinary_for_Teens.png'),
  'til': require('../../assets/covers/The_Integral_Life.jpg'),
  'fss': require('../../assets/covers/Forgiveness.jpg'),
  'tvfa': require('../../assets/covers/The_Values_Factor.jpg'),
  'du': require('../../assets/covers/Duality.jpg'),
  'fsl': require('../../assets/covers/Feng_Shui_for_Life.png'),
  'ajti': require('../../assets/covers/A_Journey_to_Infinitheism.jpg'),
  'up': require('../../assets/covers/Ultra_Presence.png'),

  // === Exponential Entrepreneur Collection ===
  'ub': require('../../assets/covers/Building_an_Unstoppable_Brand.jpg'),
  'nwc': require('../../assets/covers/Negotiate_with_Confidence_Clarity_in_Every_Conversation.jpg'),
  'meq': require('../../assets/covers/Money_EQ.png'),
  'sb': require('../../assets/covers/Superbrain.png'),
  '6pm': require('../../assets/covers/The_6_Phase_Meditation.jpg'),

  // === Longevity Collection ===
  '10xh': require('../../assets/covers/10X_Fitness.jpg'),
  'tlb': require('../../assets/covers/The_Longevity_Blueprint.png'),
  'wf': require('../../assets/covers/Wildfit.png'),

  // === Love & Family Collection ===
  'cpm': require('../../assets/covers/Conscious_Parenting_Mastery.png'),

  // === Speaking & Authorship Collection ===
  'sai': require('../../assets/covers/Speak_and_Inspire.png'),
};

// Collection hero covers (keyed by collection slug)
export const collectionCovers: Record<string, any> = {
  'manifesting': require('../../assets/collections/manifesting.jpg'),
  'speaking-authorship': require('../../assets/collections/speaking.jpg'),
  'love-family': require('../../assets/collections/love-family.jpg'),
  'exponential-entrepreneur': require('../../assets/collections/entrepreneur.jpg'),
  'longevity': require('../../assets/collections/longevity.jpg'),
};

export function getCollectionCover(slug: string): any {
  return collectionCovers[slug] ?? null;
}

// Meditation covers
export const meditationCoversLocal: Record<string, any> = {
  'profound-sleep': require('../../assets/meditation-covers/Profound_Sleep.jpg'),
  'deep-relaxation': require('../../assets/meditation-covers/Deep_Relaxation.jpg'),
  'sink-back': require('../../assets/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg'),
  'releasing-anxiety': require('../../assets/meditation-covers/Releasing_Anxiety.jpg'),
  'clarity-vision': require('../../assets/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg'),
  'abundance': require('../../assets/meditation-covers/Abundance_Meditation.jpg'),
  '6-phase': require('../../assets/meditation-covers/6-Phase_Meditation.jpg'),
  'manifesting-hwl': require('../../assets/meditation-covers/Manifesting_Health_Wealth_Love.jpg'),
  'sleep-body-scan': require('../../assets/meditation-covers/Sleep_Inducing_Body_Scan.jpg'),
  'third-eye': require('../../assets/meditation-covers/Third_Eye_Chakra_Intuition_Wisdom.jpg'),
};

// Path-to-require map for meditation covers (maps the string paths used in meditationLibrary)
const meditationCoversByPath: Record<string, any> = {
  '/meditation-covers/Profound_Sleep.jpg': require('../../assets/meditation-covers/Profound_Sleep.jpg'),
  '/meditation-covers/Deep_Relaxation.jpg': require('../../assets/meditation-covers/Deep_Relaxation.jpg'),
  '/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg': require('../../assets/meditation-covers/Sink_Back_Into_Deeper_Sleep.jpg'),
  '/meditation-covers/Releasing_Anxiety.jpg': require('../../assets/meditation-covers/Releasing_Anxiety.jpg'),
  '/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg': require('../../assets/meditation-covers/Clarity_of_Vision_The_Path_to_Your_Dreams.jpg'),
  '/meditation-covers/Abundance_Meditation.jpg': require('../../assets/meditation-covers/Abundance_Meditation.jpg'),
  '/meditation-covers/6-Phase_Meditation.jpg': require('../../assets/meditation-covers/6-Phase_Meditation.jpg'),
  '/meditation-covers/Manifesting_Health_Wealth_Love.jpg': require('../../assets/meditation-covers/Manifesting_Health_Wealth_Love.jpg'),
};

// Helper to get program cover by id
export function getProgramCover(programId: string): any {
  return programCovers[programId] ?? null;
}

// Helper to get meditation cover by path string
export function getMeditationCover(imagePath: string): any {
  return meditationCoversByPath[imagePath] ?? null;
}
