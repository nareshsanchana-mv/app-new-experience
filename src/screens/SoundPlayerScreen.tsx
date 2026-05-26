import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { typography } from '../theme/typography';
import type { RootStackParamList } from '../navigation/RootNavigator';

const { width, height } = Dimensions.get('window');

type SoundPlayerRouteProp = RouteProp<RootStackParamList, 'SoundPlayer'>;

export default function SoundPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<SoundPlayerRouteProp>();
  const { title, author, image } = route.params;

  const [isPlaying, setIsPlaying] = useState(true);

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2D1810', '#8B4513', '#CD853F']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
            >
              <Ionicons name="close" size={24} color="#1a1a1a" />
            </TouchableOpacity>

            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="download-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="share-outline" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Ionicons name="bookmark-outline" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Album Artwork - Circular */}
            <View style={styles.artworkContainer}>
              <Image
                source={typeof image === 'string' ? { uri: image } : (image as any)}
                style={styles.artwork}
              />
              <View style={styles.artworkOverlay}>
                <Text style={styles.artworkTitle}>{title.toUpperCase()}</Text>
                <Text style={styles.artworkAuthor}>{author.toUpperCase()}</Text>
              </View>
              <View style={styles.mindvalleyLogo}>
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </View>
            </View>

            {/* Title and Author */}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>

            {/* Loop Icon */}
            <View style={styles.loopContainer}>
              <Ionicons name="infinite" size={28} color="rgba(255,255,255,0.7)" />
            </View>

            {/* Play/Pause Button */}
            <TouchableOpacity
              style={styles.playButton}
              onPress={() => setIsPlaying(!isPlaying)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={40}
                color="#8B4513"
              />
            </TouchableOpacity>
          </View>

          {/* Timer Button */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.timerButton} activeOpacity={0.8}>
              <Ionicons name="timer-outline" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.timerText}>Set a timer</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  artworkContainer: {
    width: width * 0.65,
    height: width * 0.65,
    borderRadius: (width * 0.65) / 2,
    overflow: 'hidden',
    marginBottom: 32,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  artwork: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  artworkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  artworkTitle: {
    ...typography.h2,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  artworkAuthor: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mindvalleyLogo: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    ...typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 24,
    textAlign: 'center',
  },
  loopContainer: {
    marginBottom: 32,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
  },
  timerText: {
    ...typography.label,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
});
