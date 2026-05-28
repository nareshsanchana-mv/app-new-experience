import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Header from '../components/Header';
import AdaptiveGreeting from '../components/AdaptiveGreeting';
import LearnSection, { NewUserOwnedSection, NewUserExploreSection } from '../components/LearnSection';
import PracticeSection from '../components/PracticeSection';
import StreakBrokenCard from '../components/StreakBrokenCard';
import ReferAFriendCard from '../components/ReferAFriendCard';
import FreeUserContent from '../components/FreeUserContent';
import DemoPanel from '../components/DemoPanel';
import EveChat from '../components/EveChat';
import CollectionUpsell from '../components/CollectionUpsell';
import { useDemo } from '../context/DemoContext';
import { getSoundCover } from '../data/mockData';
import { allManifestingPrograms } from '../data/manifestingCollection';
import { browseCollections } from '../data/allCollectionsData';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewTodayScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { scenarioState } = useDemo();
  const [showEveChat, setShowEveChat] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [upsellCollection, setUpsellCollection] = useState<string>('longevity');
  const [eveChatInitialMessage, setEveChatInitialMessage] = useState<string | undefined>();
  const [eveChatVoiceMode, setEveChatVoiceMode] = useState(false);

  const closeEveChat = () => {
    setShowEveChat(false);
    setEveChatVoiceMode(false);
    setEveChatInitialMessage(undefined);
  };

  const handleStartProgram = (programId: string) => {
    const program = allManifestingPrograms.find(p => p.id === programId);
    if (program) {
      navigation.navigate('QuestDetail', {
        questId: programId,
        questTitle: program.title,
        questImage: program.image,
        author: program.author,
      });
    }
  };

  const handleTalkToEve = () => {
    setEveChatInitialMessage(undefined);
    setEveChatVoiceMode(false);
    setShowEveChat(true);
  };

  const handleVoiceToEve = () => {
    setEveChatInitialMessage(undefined);
    setEveChatVoiceMode(true);
    setShowEveChat(true);
  };

  const handleChipPress = (chip: string) => {
    setEveChatInitialMessage(`I'm interested in: ${chip}`);
    setEveChatVoiceMode(false);
    setShowEveChat(true);
  };

  const handleProgramPress = (programId: string) => {
    // Free user: all programs trigger upsell with the matching collection
    if (scenarioState.id === 'free-user') {
      const matchedCollection = browseCollections.find(c =>
        c.programs.some(p => p.id === programId)
      );
      setUpsellCollection(matchedCollection?.slug ?? 'manifesting');
      setShowUpsell(true);
      return;
    }

    const program = allManifestingPrograms.find(p => p.id === programId);
    if (!program) return;

    // If the program is not owned, show upsell
    if (!program.owned) {
      setShowUpsell(true);
      return;
    }

    navigation.navigate('QuestDetail', {
      questId: programId,
      questTitle: program.title,
      questImage: program.image,
      author: program.author,
    });
  };

  const handleCollectionPress = (slug: string) => {
    setUpsellCollection(slug);
    setShowUpsell(true);
  };

  const handleMeditationPress = (
    id: string,
    title: string,
    author: string,
    image: string,
    duration: string,
  ) => {
    navigation.navigate('MeditationPlayer', {
      id,
      title,
      author,
      image,
      duration,
    });
  };

  const handleSoundPress = (id: string, title: string, author: string) => {
    navigation.navigate('SoundPlayer', {
      id,
      title,
      author,
      image: getSoundCover(title) ?? '/sound-covers/Ocean_Healing.jpg',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Adaptive AI Greeting */}
        <AdaptiveGreeting
          onTalkToEve={handleTalkToEve}
          onVoiceToEve={handleVoiceToEve}
          onStartProgram={handleStartProgram}
          onChipPress={handleChipPress}
          onPlayMeditation={handleMeditationPress}
          onPlaySound={handleSoundPress}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {scenarioState.id !== 'free-user' ? (
          <>
            {/* Returning-inactive: streak-broken state with social proof,
                bridging the focus section above and Your Programs below. */}
            {scenarioState.id === 'returning-inactive' && (
              <StreakBrokenCard
                lastStreak={7}
                daysSince={scenarioState.daysInactive}
              />
            )}

            {/* Returning-active: refer-a-friend nudge (renewal discount).
                Subscribed users only — never shown to free users. */}
            {scenarioState.id === 'returning-active' && (
              <ReferAFriendCard />
            )}

            {/* Programs — owned Manifesting collection */}
            <NewUserOwnedSection onProgramPress={handleProgramPress} />

            <View style={styles.divider} />

            {/* Meditations — top 10 */}
            <PracticeSection onMeditationPress={handleMeditationPress} />

            <View style={styles.divider} />

            {/* Explore other collections */}
            <NewUserExploreSection onCollectionPress={handleCollectionPress} />
          </>
        ) : (
          <>
            {/* Free content focus: 3 sample sections to drive activation
                before exposing the full collection browse. */}
            <FreeUserContent
              onProgramPress={handleProgramPress}
              onPlayMeditation={handleMeditationPress}
              onPlaySound={handleSoundPress}
            />

            <View style={styles.divider} />

            {/* Browse-all-collections rail kept as the explore tail
                (upsell-aware — each collection shows price). */}
            <LearnSection
              onProgramPress={handleProgramPress}
              onCollectionPress={handleCollectionPress}
              onUnlockAll={() => {
                setUpsellCollection('manifesting');
                setShowUpsell(true);
              }}
            />
          </>
        )}

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Demo Panel (hidden, triggered by triple-tap) */}
      <DemoPanel />

      {/* Eve Chat Modal */}
      <Modal
        visible={showEveChat}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={closeEveChat}
      >
        <EveChat
          onClose={closeEveChat}
          initialMessage={eveChatInitialMessage}
          startInVoiceMode={eveChatVoiceMode}
        />
      </Modal>

      {/* Collection Upsell Modal */}
      <CollectionUpsell
        visible={showUpsell}
        onClose={() => setShowUpsell(false)}
        triggerCollection={upsellCollection}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  bottomPadding: {
    height: 100,
  },
});
