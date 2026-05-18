import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { withFadeOnFocus } from './withFadeOnFocus';

import NewTodayScreen from '../screens/NewTodayScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import EveAIScreen from '../screens/EveAIScreen';
import MeditationsScreen from '../screens/MeditationsScreen';
import CommunityScreen from '../screens/CommunityScreen';

const Tab = createBottomTabNavigator();

const FadeNewToday = withFadeOnFocus(NewTodayScreen);
const FadePrograms = withFadeOnFocus(ProgramsScreen);
const FadeEveAI = withFadeOnFocus(EveAIScreen);
const FadeMeditations = withFadeOnFocus(MeditationsScreen);
const FadeCommunity = withFadeOnFocus(CommunityScreen);

type IconName = keyof typeof Ionicons.glyphMap;

const TAB_META: Record<string, { active: IconName; inactive: IconName }> = {
  Today: { active: 'today', inactive: 'today-outline' },
  Programs: { active: 'book', inactive: 'book-outline' },
  'Eve AI': { active: 'aperture', inactive: 'aperture-outline' },
  Meditations: { active: 'leaf', inactive: 'leaf-outline' },
  Community: { active: 'people', inactive: 'people-outline' },
};

// Apple-style "liquid glass" pill background — strong blur, low tint,
// top-edge specular highlight, bright inner rim, soft outer shadow.
const GlassPill = ({ radius }: { radius: number }) => (
  <View style={StyleSheet.absoluteFill} pointerEvents="none">
    <BlurView
      tint="dark"
      intensity={Platform.OS === 'ios' ? 90 : 100}
      style={[StyleSheet.absoluteFill, { borderRadius: radius, overflow: 'hidden' }]}
    />
    <View
      style={[
        StyleSheet.absoluteFill,
        { borderRadius: radius, backgroundColor: 'rgba(28, 22, 56, 0.28)' },
      ]}
    />
    {/* Top-edge specular highlight */}
    <LinearGradient
      colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0.04)', 'rgba(255,255,255,0)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.5 }}
      style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
    />
    {/* Soft purple under-glow */}
    <LinearGradient
      colors={['rgba(155,143,255,0)', 'rgba(155,143,255,0.10)']}
      start={{ x: 0.5, y: 0.4 }}
      end={{ x: 0.5, y: 1 }}
      style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
    />
    {/* Inner rim light (1px-ish) */}
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          borderRadius: radius,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.16)',
        },
      ]}
    />
  </View>
);

// Active-state highlight behind icon — purple-tinted glass capsule
const ActiveHighlight = () => (
  <View style={styles.activeHighlight} pointerEvents="none">
    <BlurView
      tint="light"
      intensity={Platform.OS === 'ios' ? 50 : 80}
      style={[StyleSheet.absoluteFill, styles.activeHighlightBlur]}
    />
    <View style={[StyleSheet.absoluteFill, styles.activeHighlightTint]} />
    <LinearGradient
      colors={['rgba(255,255,255,0.28)', 'rgba(255,255,255,0)']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 0.7 }}
      style={[StyleSheet.absoluteFill, styles.activeHighlightBlur]}
    />
    <View style={styles.activeHighlightRim} />
  </View>
);

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const meta = TAB_META[name];
  const iconName = focused ? meta.active : meta.inactive;
  return (
    <View style={styles.tabIconWrap}>
      {focused && <ActiveHighlight />}
      <Ionicons
        name={iconName}
        size={24}
        color={focused ? colors.primaryLight : 'rgba(155, 143, 255, 0.55)'}
      />
    </View>
  );
};

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom - 8, 16);

  const leftRouteNames = ['Today', 'Programs', 'Meditations', 'Community'];
  const rightRouteNames = ['Eve AI'];

  const renderTab = (routeName: string, keySuffix: string) => {
    const route = state.routes.find((r) => r.name === routeName);
    if (!route) return null;
    const index = state.routes.findIndex((r) => r.name === routeName);
    const focused = state.index === index;
    const { options } = descriptors[route.key];

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!focused && !event.defaultPrevented) {
        (navigation.navigate as any)(route.name, route.params);
      }
    };

    const onLongPress = () => {
      navigation.emit({ type: 'tabLongPress', target: route.key });
    };

    return (
      <TouchableOpacity
        key={`${routeName}-${keySuffix}`}
        accessibilityRole="button"
        accessibilityState={focused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarButtonTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabButton}
        activeOpacity={0.7}
      >
        <TabIcon name={routeName} focused={focused} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.barContainer, { bottom }]} pointerEvents="box-none">
      <View style={[styles.pill, styles.leftPill]}>
        <GlassPill radius={36} />
        <View style={styles.pillRow}>
          {leftRouteNames.map((n) => renderTab(n, 'L'))}
        </View>
      </View>
      <View style={[styles.pill, styles.rightPill]}>
        <GlassPill radius={36} />
        <View style={styles.pillRow}>
          {rightRouteNames.map((n) => renderTab(n, 'R'))}
        </View>
      </View>
    </View>
  );
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Today" component={FadeNewToday} />
      <Tab.Screen name="Programs" component={FadePrograms} />
      <Tab.Screen name="Eve AI" component={FadeEveAI} />
      <Tab.Screen name="Meditations" component={FadeMeditations} />
      <Tab.Screen name="Community" component={FadeCommunity} />
    </Tab.Navigator>
  );
}

const TAB_HEIGHT = 64;
const TAB_BUTTON_WIDTH = 60;

const styles = StyleSheet.create({
  barContainer: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pill: {
    height: TAB_HEIGHT,
    borderRadius: 36,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 14,
  },
  leftPill: {
    flexShrink: 1,
  },
  rightPill: {
    marginLeft: 12,
  },
  pillRow: {
    flexDirection: 'row',
    height: TAB_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabButton: {
    width: TAB_BUTTON_WIDTH,
    height: TAB_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconWrap: {
    width: 52,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    overflow: 'hidden',
  },
  activeHighlightBlur: {
    borderRadius: 20,
  },
  activeHighlightTint: {
    borderRadius: 20,
    backgroundColor: 'rgba(155, 143, 255, 0.28)',
  },
  activeHighlightRim: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(155, 143, 255, 0.5)',
  },
});
