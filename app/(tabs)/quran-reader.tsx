import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Book,
  Volume2,
  Bookmark,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function QuranReaderScreen() {
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [showTafsir, setShowTafsir] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyat, setCurrentAyat] = useState(1);

  const surahList = [
    { number: 1, name: 'Al-Fatihah', arabic: 'الفاتحة', ayatCount: 7 },
    { number: 2, name: 'Al-Baqarah', arabic: 'البقرة', ayatCount: 286 },
    { number: 3, name: 'Ali \'Imran', arabic: 'آل عمران', ayatCount: 200 },
    // Add more surahs...
  ];

  const ayatData = [
    {
      number: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.',
      tafsir: 'Basmalah adalah kalimat pembuka yang mengandung makna memulai segala sesuatu dengan nama Allah...',
    },
    {
      number: 2,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'Segala puji bagi Allah, Tuhan seluruh alam.',
      tafsir: 'Alhamdulillahi rabbil alamiin mengandung makna bahwa segala pujian hanya milik Allah...',
    },
    // Add more ayat...
  ];

  const SurahSelector = () => (
    <View style={styles.surahSelector}>
      <Text style={styles.sectionTitle}>Pilih Surah</Text>
      <FlatList
        data={surahList}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.surahCard,
              selectedSurah === item.number && styles.surahCardActive,
            ]}
            onPress={() => setSelectedSurah(item.number)}>
            <Text style={styles.surahNumber}>{item.number}</Text>
            <Text style={styles.surahName}>{item.name}</Text>
            <Text style={styles.surahArabic}>{item.arabic}</Text>
            <Text style={styles.ayatCount}>{item.ayatCount} Ayat</Text>
          </TouchableOpacity>
        )}
        style={styles.surahList}
      />
    </View>
  );

  const AyatDisplay = ({ item }: { item: any }) => (
    <View style={styles.ayatContainer}>
      <View style={styles.ayatHeader}>
        <View style={styles.ayatNumber}>
          <Text style={styles.ayatNumberText}>{item.number}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Bookmark size={16} color="#64748b" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <Text style={styles.ayatArabic}>{item.arabic}</Text>
      
      <Text style={styles.ayatTranslation}>{item.translation}</Text>

      {showTafsir && (
        <View style={styles.tafsirContainer}>
          <Text style={styles.tafsirLabel}>Tafsir:</Text>
          <Text style={styles.tafsirText}>{item.tafsir}</Text>
        </View>
      )}

      <View style={styles.ayatControls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            setCurrentAyat(item.number);
            setIsPlaying(!isPlaying);
          }}>
          {isPlaying && currentAyat === item.number ? (
            <Pause size={16} color="#22c55e" strokeWidth={2} />
          ) : (
            <Play size={16} color="#22c55e" strokeWidth={2} />
          )}
        </TouchableOpacity>
        <Text style={styles.playText}>
          {isPlaying && currentAyat === item.number ? 'Jeda' : 'Putar'}
        </Text>
      </View>
    </View>
  );

  const AudioControls = () => (
    <View style={styles.audioControls}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.9)']}
        style={styles.audioControlsGradient}>
        
        <View style={styles.audioInfo}>
          <Text style={styles.audioTitle}>
            {surahList.find(s => s.number === selectedSurah)?.name}
          </Text>
          <Text style={styles.audioSubtitle}>
            Qori: Mishary Rashid Alafasy
          </Text>
        </View>

        <View style={styles.audioButtons}>
          <TouchableOpacity style={styles.audioButton}>
            <SkipBack size={24} color="#1e293b" strokeWidth={2} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.mainPlayButton}
            onPress={() => setIsPlaying(!isPlaying)}>
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              style={styles.playButtonGradient}>
              {isPlaying ? (
                <Pause size={28} color="white" strokeWidth={2} />
              ) : (
                <Play size={28} color="white" strokeWidth={2} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.audioButton}>
            <SkipForward size={24} color="#1e293b" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Al-Qur'an</Text>
        <Text style={styles.headerSubtitle}>
          Baca, dengar, dan pelajari Al-Qur'an
        </Text>
      </LinearGradient>

      <SurahSelector />

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>
            {surahList.find(s => s.number === selectedSurah)?.name}
          </Text>
          
          <View style={styles.contentControls}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                showTafsir && styles.toggleButtonActive,
              ]}
              onPress={() => setShowTafsir(!showTafsir)}>
              <Book size={16} color={showTafsir ? 'white' : '#64748b'} strokeWidth={2} />
              <Text
                style={[
                  styles.toggleText,
                  showTafsir && styles.toggleTextActive,
                ]}>
                Tafsir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.audioToggle}>
              <Volume2 size={16} color="#64748b" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={ayatData}
          keyExtractor={(item) => item.number.toString()}
          renderItem={AyatDisplay}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ayatList}
          style={styles.ayatScrollView}
        />
      </View>

      <AudioControls />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  surahSelector: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
    marginLeft: 20,
  },
  surahList: {
    paddingLeft: 20,
  },
  surahCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  surahCardActive: {
    backgroundColor: '#22c55e',
  },
  surahNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  surahName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  surahArabic: {
    fontSize: 16,
    color: '#1e293b',
    marginBottom: 4,
    textAlign: 'right',
  },
  ayatCount: {
    fontSize: 11,
    color: '#94a3b8',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  contentControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  toggleButtonActive: {
    backgroundColor: '#22c55e',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 4,
  },
  toggleTextActive: {
    color: 'white',
  },
  audioToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
  },
  ayatScrollView: {
    flex: 1,
  },
  ayatList: {
    paddingBottom: 120,
  },
  ayatContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ayatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ayatNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ayatNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  bookmarkButton: {
    padding: 8,
  },
  ayatArabic: {
    fontSize: 24,
    textAlign: 'right',
    color: '#1e293b',
    lineHeight: 40,
    marginBottom: 16,
    fontFamily: 'Arial',
  },
  ayatTranslation: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 12,
  },
  tafsirContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  tafsirLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 8,
  },
  tafsirText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  ayatControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  playText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  audioControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  audioControlsGradient: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  audioInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  audioSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  audioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  audioButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPlayButton: {
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  playButtonGradient: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});