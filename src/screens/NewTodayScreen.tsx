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
import LearnSection from '../components/LearnSection';
import PracticeSection from '../components/PracticeSection';
import DemoPanel from '../components/DemoPanel';
import EveChat from '../components/EveChat';
import CollectionUpsell from '../components/CollectionUpsell';
import { useDemo } from '../context/DemoContext';
import { allManifestingPrograms } from '../data/manifestingCollection';
import { colors } from '../theme/colors';
import type { RootStackParamList } from '../navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewTodayScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { scenarioState } = useDemo();
  const [showEveChat, setShowEveChat] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [eveChatInitialMessage, setEveChatInitialMessage] = useState<string | undefined>();

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
    setShowEveChat(true);
  };

  const handleChipPress = (chip: string) => {
    setEveChatInitialMessage(`I'm interested in: ${chip}`);
    setShowEveChat(true);
  };

  const handleProgramPress = (programId: string) => {
    const program = allManifestingPrograms.find(p => p.id === programId);
    if (!program) return;

    // If the program is not owned (for demo scenario 5), show upsell
    if (!program.owned || scenarioState.id === 'browsing-unowned') {
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
          onStartProgram={handleStartProgram}
          onChipPress={handleChipPress}
        />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Learn Section — Collection Curriculum */}
        <LearnSection onProgramPress={handleProgramPress} />

        {/* Divider */}
        <View style={styles.divider} />

        {/* Practice Section — Meditation Library */}
        <PracticeSection onMeditationPress={handleMeditationPress} />

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
        onRequestClose={() => setShowEveChat(false)}
      >
        <EveChat
          onClose={() => setShowEveChat(false)}
          initialMessage={eveChatInitialMessage}
        />
      </Modal>

      {/* Collection Upsell Modal */}
      <CollectionUpsell
        visible={showUpsell}
        onClose={() => setShowUpsell(false)}
        triggerCollection="longevity"
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
    height: 8,
    backgroundColor: colors.border,
    marginVertical: 4,
    opacity: 0.3,
  },
  bottomPadding: {
    height: 100,
  },
});
