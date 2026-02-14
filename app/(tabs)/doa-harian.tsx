import React, { useState } from 'react';
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
  Sun,
  Moon,
  Utensils,
  Bed,
  Car,
  Play,
  Pause,
  Heart,
  Share,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function DoaHarianScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('pagi');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories = [
    { id: 'pagi', name: 'Pagi', icon: Sun, color: '#f59e0b' },
    { id: 'sore', name: 'Sore', icon: Moon, color: '#8b5cf6' },
    { id: 'makan', name: 'Makan', icon: Utensils, color: '#22c55e' },
    { id: 'tidur', name: 'Tidur', icon: Bed, color: '#3b82f6' },
    { id: 'perjalanan', name: 'Perjalanan', icon: Car, color: '#ef4444' },
  ];

  const doaData = [
    {
      id: '1',
      title: 'Doa Bangun Tidur',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      translation: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya kami akan dibangkitkan.',
      category: 'pagi',
    },
    {
      id: '2',
      title: 'Doa Pagi Hari',
      arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ',
      translation: 'Kami memasuki waktu pagi dan kerajaan hanya milik Allah, segala puji bagi Allah.',
      category: 'pagi',
    },
    {
      id: '3',
      title: 'Doa Sebelum Makan',
      arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
      translation: 'Dengan nama Allah dan atas berkah Allah.',
      category: 'makan',
    },
    {
      id: '4',
      title: 'Doa Sesudah Makan',
      arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      translation: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami muslim.',
      category: 'makan',
    },
  ];

  const filteredDoa = doaData.filter(doa => doa.category === selectedCategory);

  const CategorySelector = () => (
    <View style={styles.categorySelector}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}>
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                isSelected && { backgroundColor: category.color }
              ]}
              onPress={() => setSelectedCategory(category.id)}>
              <IconComponent 
                size={24} 
                color={isSelected ? 'white' : category.color} 
                strokeWidth={2} 
              />
              <Text style={[
                styles.categoryText,
                isSelected && { color: 'white' }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const DoaCard = ({ item }: { item: any }) => (
    <View style={styles.doaCard}>
      <View style={styles.doaHeader}>
        <Text style={styles.doaTitle}>{item.title}</Text>
        <View style={styles.doaActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={16} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Share size={16} color="#64748b" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.doaArabic}>{item.arabic}</Text>
      
      <Text style={styles.doaTranslation}>{item.translation}</Text>

      <View style={styles.doaControls}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => {
            if (playingId === item.id) {
              setPlayingId(null);
            } else {
              setPlayingId(item.id);
            }
          }}>
          {playingId === item.id ? (
            <Pause size={16} color="#22c55e" strokeWidth={2} />
          ) : (
            <Play size={16} color="#22c55e" strokeWidth={2} />
          )}
        </TouchableOpacity>
        <Text style={styles.playText}>
          {playingId === item.id ? 'Jeda' : 'Putar Audio'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Doa Harian</Text>
        <Text style={styles.headerSubtitle}>
          Kumpulan doa-doa pilihan untuk kehidupan sehari-hari
        </Text>
      </LinearGradient>

      <CategorySelector />

      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          Doa {categories.find(c => c.id === selectedCategory)?.name}
        </Text>
        
        <FlatList
          data={filteredDoa}
          keyExtractor={(item) => item.id}
          renderItem={DoaCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.doaList}
        />
      </View>
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
  categorySelector: {
    paddingVertical: 20,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  doaList: {
    paddingBottom: 20,
  },
  doaCard: {
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
  doaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  doaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  doaActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
  },
  doaArabic: {
    fontSize: 20,
    textAlign: 'right',
    color: '#1e293b',
    lineHeight: 32,
    marginBottom: 16,
    fontFamily: 'Arial',
  },
  doaTranslation: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  doaControls: {
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
});