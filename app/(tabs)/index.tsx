import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Book, 
  Mic, 
  Video, 
  MessageCircle, 
  Calendar,
  Users,
  Heart,
  TrendingUp,
  Gift,
  BookOpen,
  DollarSign
} from 'lucide-react-native';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuthStore();

  const MenuCard = ({ 
    title, 
    icon, 
    colors, 
    onPress 
  }: {
    title: string;
    icon: React.ReactNode;
    colors: string[];
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.menuCard} onPress={onPress}>
      <LinearGradient
        colors={colors}
        style={styles.menuGradient}>
        {icon}
      </LinearGradient>
      <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
  );

  const IslamicMenu = () => (
    <View style={styles.islamicMenu}>
      <Text style={styles.sectionTitle}>Menu Islami</Text>
      
      <View style={styles.menuGrid}>
        <MenuCard
          title="Keilmuan"
          icon={<BookOpen size={20} color="white" strokeWidth={2} />}
          colors={['#8b5cf6', '#7c3aed']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Doa Harian"
          icon={<Heart size={20} color="white" strokeWidth={2} />}
          colors={['#06b6d4', '#0891b2']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Bahtsul Masail"
          icon={<MessageCircle size={20} color="white" strokeWidth={2} />}
          colors={['#f59e0b', '#d97706']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Muamalat"
          icon={<DollarSign size={20} color="white" strokeWidth={2} />}
          colors={['#10b981', '#059669']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Quote Harian"
          icon={<Book size={20} color="white" strokeWidth={2} />}
          colors={['#ef4444', '#dc2626']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Donasi"
          icon={<Gift size={20} color="white" strokeWidth={2} />}
          colors={['#ec4899', '#db2777']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Kilas Balik"
          icon={<TrendingUp size={20} color="white" strokeWidth={2} />}
          colors={['#6366f1', '#4f46e5']}
          onPress={() => {}}
        />
        
        <MenuCard
          title="Kelas Private"
          icon={<Users size={20} color="white" strokeWidth={2} />}
          colors={['#f97316', '#ea580c']}
          onPress={() => {}}
        />
      </View>
    </View>
  );
  const QuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.sectionTitle}>Akses Cepat</Text>
      
      <View style={styles.actionsGrid}>
        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#22c55e', '#16a34a']}
            style={styles.actionGradient}>
            <Mic size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>AI Tahsin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            style={styles.actionGradient}>
            <Book size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Al-Quran</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#f59e0b', '#d97706']}
            style={styles.actionGradient}>
            <Video size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Live Class</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard}>
          <LinearGradient
            colors={['#8b5cf6', '#7c3aed']}
            style={styles.actionGradient}>
            <MessageCircle size={24} color="white" strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.actionText}>Bahtsul Masail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const LiveSchedule = () => (
    <View style={styles.liveSchedule}>
      <Text style={styles.sectionTitle}>Kajian Live Hari Ini</Text>
      
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleTime}>
          <Text style={styles.timeText}>20:00</Text>
          <Text style={styles.timeLabel}>WIB</Text>
        </View>
        
        <View style={styles.scheduleInfo}>
          <Text style={styles.scheduleTitle}>Tafsir Al-Baqarah</Text>
          <Text style={styles.scheduleAsatidz}>Ust. Ahmad Fauzan</Text>
          <View style={styles.scheduleStats}>
            <Users size={14} color="#64748b" strokeWidth={2} />
            <Text style={styles.statsText}>245 Jamaah</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Assalamu'alaikum</Text>
          <Text style={styles.userName}>{user?.name || 'Jamaah'}</Text>
          <Text style={styles.subtitle}>Selamat datang di KajianQU</Text>
        </View>
      </LinearGradient>

      {/* Daily Verse */}
      <View style={styles.dailyVerse}>
        <Text style={styles.verseLabel}>Ayat Hari Ini</Text>
        <Text style={styles.verseArabic}>
          وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ
        </Text>
        <Text style={styles.verseTranslation}>
          "Dan tidaklah Aku ciptakan jin dan manusia kecuali agar mereka beribadah kepada-Ku"
        </Text>
        <Text style={styles.verseSurah}>QS. Adz-Dzariyat: 56</Text>
      </View>

      <QuickActions />
      <LiveSchedule />
      <IslamicMenu />
    </ScrollView>
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
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  dailyVerse: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  verseLabel: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  verseArabic: {
    fontSize: 20,
    fontFamily: 'Arial',
    textAlign: 'center',
    color: '#1e293b',
    lineHeight: 32,
    marginBottom: 12,
  },
  verseTranslation: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  verseSurah: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    fontWeight: '600',
  },
  quickActions: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
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
  actionGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  liveSchedule: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  scheduleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scheduleTime: {
    alignItems: 'center',
    marginRight: 16,
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  timeLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  scheduleAsatidz: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  scheduleStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  islamicMenu: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: (width - 60) / 4,
    alignItems: 'center',
    marginBottom: 20,
  },
  menuGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    lineHeight: 14,
  },
});