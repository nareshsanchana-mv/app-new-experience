import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDemo, DemoScenario } from '../context/DemoContext';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

export default function DemoPanel() {
  const { isDemoPanelVisible, toggleDemoPanel, activeScenario, setActiveScenario, allScenarios } = useDemo();

  if (!isDemoPanelVisible) return null;

  return (
    <Modal
      visible={isDemoPanelVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={toggleDemoPanel}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Demo Scenarios</Text>
          <TouchableOpacity onPress={toggleDemoPanel} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Switch between user states to demo different experiences
        </Text>

        <ScrollView style={styles.scenarioList}>
          {allScenarios.map((scenario) => {
            const isActive = scenario.id === activeScenario;
            return (
              <TouchableOpacity
                key={scenario.id}
                style={[styles.scenarioCard, isActive && styles.scenarioCardActive]}
                onPress={() => {
                  setActiveScenario(scenario.id as DemoScenario);
                  toggleDemoPanel();
                }}
              >
                <View style={styles.scenarioHeader}>
                  <View style={[styles.radioOuter, isActive && styles.radioOuterActive]}>
                    {isActive && <View style={styles.radioInner} />}
                  </View>
                  <Text style={[styles.scenarioLabel, isActive && styles.scenarioLabelActive]}>
                    {scenario.label}
                  </Text>
                </View>
                <Text style={styles.scenarioDescription}>{scenario.description}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Triple-tap the greeting area to open this panel
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginBottom: 24,
  },
  scenarioList: {
    flex: 1,
  },
  scenarioCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  scenarioCardActive: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterActive: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  scenarioLabel: {
    ...typography.h4,
    color: colors.textPrimary,
    flex: 1,
  },
  scenarioLabelActive: {
    color: colors.primary,
  },
  scenarioDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginLeft: 30,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
