import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

import NewTodayScreen from '../screens/NewTodayScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import EveAIScreen from '../screens/EveAIScreen';
import MeditationsScreen from '../screens/MeditationsScreen';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();

const EveAIButton = ({ children, onPress }: any) => (
  <TouchableOpacity style={styles.eveButton} onPress={onPress} activeOpacity={0.85}>
    <LinearGradient
      colors={['#6C5CE7', '#9B8FFF']}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={styles.eveGradient}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

const EveIcon = () => (
  // Geometric octagon-style Eve AI icon approximated with Ionicons
  <Ionicons name="aperture" size={26} color="#fff" />
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="Today"
        component={NewTodayScreen}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <LinearGradient
                colors={['#F5A623', '#E040FB', '#6C5CE7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientIcon}
              >
                <Ionicons name="today" size={18} color="#fff" />
              </LinearGradient>
            ) : (
              <Ionicons name="today-outline" size={22} color={colors.tabInactive} />
            ),
        }}
      />
      <Tab.Screen
        name="Programs"
        component={ProgramsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Eve AI"
        component={EveAIScreen}
        options={{
          tabBarIcon: () => <EveIcon />,
          tabBarButton: (props) => <EveAIButton {...props} />,
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Meditations"
        component={MeditationsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'leaf' : 'leaf-outline'} size={22} color={focused ? colors.primary : color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={22} color={focused ? colors.coral : color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.tabBar,
    borderTopWidth: 0,
    height: 85,
    paddingTop: 8,
    paddingBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  eveButton: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  eveGradient: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
