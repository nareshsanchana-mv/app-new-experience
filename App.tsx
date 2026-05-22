import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform, View, StyleSheet } from 'react-native';
import { UserProvider } from './src/context/UserContext';
import { DemoProvider } from './src/context/DemoContext';
import { ReflectionsProvider } from './src/context/ReflectionsContext';
import RootNavigator from './src/navigation/RootNavigator';

function AppContent() {
  return (
    <UserProvider>
      <DemoProvider>
        <ReflectionsProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </ReflectionsProvider>
      </DemoProvider>
    </UserProvider>
  );
}

export default function App() {
  if (Platform.OS === 'web') {
    return (
      <View style={webStyles.outer}>
        <View style={webStyles.device}>
          <AppContent />
        </View>
      </View>
    );
  }

  return <AppContent />;
}

const webStyles = StyleSheet.create({
  outer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh' as any,
  },
  device: {
    width: 390,
    height: 844,
    maxHeight: '100vh' as any,
    overflow: 'hidden',
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#333',
    backgroundColor: '#000',
  },
});
