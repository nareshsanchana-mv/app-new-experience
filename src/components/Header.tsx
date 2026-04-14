import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { useUser } from '../context/UserContext';
import { useDemo, DemoScenario } from '../context/DemoContext';

export default function Header() {
  const { userAvatar } = useUser();
  const { activeScenario, scenarioState, setActiveScenario, allScenarios } = useDemo();
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
        <Image
          source={typeof userAvatar === 'string' ? { uri: userAvatar } : userAvatar as any}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Scenario Selector */}
      <TouchableOpacity
        style={styles.scenarioSelector}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Ionicons name="flask-outline" size={14} color={colors.primary} />
        <Text style={styles.scenarioLabel} numberOfLines={1}>
          {scenarioState.label}
        </Text>
        <Ionicons name="chevron-down" size={14} color={colors.textMuted} />
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Search' as never)}>
          <Ionicons name="search" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Notifications' as never)}>
          <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Scenario Picker Modal */}
      <Modal
        visible={showPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowPicker(false)}
        >
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>Demo Scenario</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Ionicons name="close" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            <ScrollView>
              {allScenarios.map((scenario) => {
                const isActive = scenario.id === activeScenario;
                return (
                  <TouchableOpacity
                    key={scenario.id}
                    style={[styles.pickerItem, isActive && styles.pickerItemActive]}
                    onPress={() => {
                      setActiveScenario(scenario.id as DemoScenario);
                      setShowPicker(false);
                    }}
                  >
                    <View style={styles.pickerItemLeft}>
                      {isActive ? (
                        <Ionicons name="radio-button-on" size={18} color={colors.primary} />
                      ) : (
                        <Ionicons name="radio-button-off" size={18} color={colors.textMuted} />
                      )}
                      <View style={styles.pickerItemText}>
                        <Text style={[styles.pickerItemLabel, isActive && styles.pickerItemLabelActive]}>
                          {scenario.label}
                        </Text>
                        <Text style={styles.pickerItemDesc}>{scenario.description}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundCard,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 16,
  },
  scenarioSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    gap: 6,
    maxWidth: 200,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  scenarioLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    flex: 1,
  },

  // Picker modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  pickerContainer: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: 16,
    width: '100%',
    maxHeight: 420,
    overflow: 'hidden',
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerTitle: {
    ...typography.h4,
    color: colors.textPrimary,
  },
  pickerItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pickerItemActive: {
    backgroundColor: `${colors.primary}10`,
  },
  pickerItemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  pickerItemText: {
    flex: 1,
  },
  pickerItemLabel: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  pickerItemLabelActive: {
    color: colors.primary,
  },
  pickerItemDesc: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
