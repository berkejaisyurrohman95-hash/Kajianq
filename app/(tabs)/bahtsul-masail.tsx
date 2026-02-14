import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, Plus, Search, ListFilter as Filter, Clock, CircleCheck as CheckCircle, User, X } from 'lucide-react-native';

export default function BahtsulMasailScreen() {
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [questionCategory, setQuestionCategory] = useState('fiqh');

  const categories = [
    { id: 'all', name: 'Semua', color: '#64748b' },
    { id: 'fiqh', name: 'Fiqh', color: '#22c55e' },
    { id: 'aqidah', name: 'Aqidah', color: '#3b82f6' },
    { id: 'akhlaq', name: 'Akhlaq', color: '#8b5cf6' },
    { id: 'muamalat', name: 'Muamalat', color: '#f59e0b' },
  ];

  const questions = [
    {
      id: '1',
      question: 'Bagaimana hukum jual beli online yang pembayarannya menggunakan sistem cicilan?',
      answer: 'Jual beli online dengan sistem cicilan diperbolehkan dalam Islam selama memenuhi syarat-syarat tertentu...',
      category: 'muamalat',
      status: 'answered',
      asatidz: 'Ust. Ahmad Fauzan',
      created_at: '2024-01-15',
      answered_at: '2024-01-16',
    },
    {
      id: '2',
      question: 'Apakah boleh shalat dengan menggunakan pakaian yang ada gambar kartun?',
      category: 'fiqh',
      status: 'pending',
      created_at: '2024-01-17',
    },
    {
      id: '3',
      question: 'Bagaimana cara menghilangkan sifat riya dalam beribadah?',
      answer: 'Riya adalah penyakit hati yang sangat berbahaya. Untuk menghilangkannya, kita perlu...',
      category: 'akhlaq',
      status: 'answered',
      asatidz: 'Ust. Mahmud Syakir',
      created_at: '2024-01-14',
      answered_at: '2024-01-15',
    },
  ];

  const CategoryFilter = () => (
    <View style={styles.categoryFilter}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && { 
                backgroundColor: category.color 
              }
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Text style={[
              styles.categoryChipText,
              selectedCategory === category.id && { color: 'white' }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const QuestionCard = ({ item }: { item: any }) => (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <View style={[
          styles.categoryBadge,
          { backgroundColor: categories.find(c => c.id === item.category)?.color }
        ]}>
          <Text style={styles.categoryBadgeText}>
            {categories.find(c => c.id === item.category)?.name}
          </Text>
        </View>
        
        <View style={styles.statusContainer}>
          {item.status === 'answered' ? (
            <CheckCircle size={16} color="#22c55e" strokeWidth={2} />
          ) : (
            <Clock size={16} color="#f59e0b" strokeWidth={2} />
          )}
          <Text style={[
            styles.statusText,
            { color: item.status === 'answered' ? '#22c55e' : '#f59e0b' }
          ]}>
            {item.status === 'answered' ? 'Terjawab' : 'Menunggu'}
          </Text>
        </View>
      </View>

      <Text style={styles.questionText}>{item.question}</Text>

      {item.answer && (
        <View style={styles.answerContainer}>
          <View style={styles.answerHeader}>
            <User size={14} color="#64748b" strokeWidth={2} />
            <Text style={styles.asatidzName}>{item.asatidz}</Text>
          </View>
          <Text style={styles.answerText}>{item.answer}</Text>
        </View>
      )}

      <View style={styles.questionFooter}>
        <Text style={styles.dateText}>
          Ditanya: {new Date(item.created_at).toLocaleDateString('id-ID')}
        </Text>
        {item.answered_at && (
          <Text style={styles.dateText}>
            Dijawab: {new Date(item.answered_at).toLocaleDateString('id-ID')}
          </Text>
        )}
      </View>
    </View>
  );

  const AddQuestionModal = () => (
    <Modal
      visible={showAddQuestion}
      transparent
      animationType="slide"
      onRequestClose={() => setShowAddQuestion(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ajukan Pertanyaan</Text>
            <TouchableOpacity onPress={() => setShowAddQuestion(false)}>
              <X size={24} color="#64748b" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Text style={styles.inputLabel}>Kategori</Text>
            <View style={styles.categorySelector}>
              {categories.slice(1).map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categorySelectorItem,
                    questionCategory === category.id && {
                      backgroundColor: category.color
                    }
                  ]}
                  onPress={() => setQuestionCategory(category.id)}>
                  <Text style={[
                    styles.categorySelectorText,
                    questionCategory === category.id && { color: 'white' }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.inputLabel}>Pertanyaan</Text>
            <TextInput
              style={styles.questionInput}
              placeholder="Tulis pertanyaan Anda di sini..."
              value={newQuestion}
              onChangeText={setNewQuestion}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                // Submit question logic
                setShowAddQuestion(false);
                setNewQuestion('');
              }}>
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.submitGradient}>
                <Text style={styles.submitText}>Kirim Pertanyaan</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Bahtsul Masail</Text>
        <Text style={styles.headerSubtitle}>
          Forum tanya jawab keagamaan dengan para asatidz
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Search size={20} color="#64748b" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari pertanyaan..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#64748b" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <CategoryFilter />

      <View style={styles.content}>
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={QuestionCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.questionsList}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowAddQuestion(true)}>
        <LinearGradient
          colors={['#22c55e', '#16a34a']}
          style={styles.fabGradient}>
          <Plus size={24} color="white" strokeWidth={2} />
        </LinearGradient>
      </TouchableOpacity>

      <AddQuestionModal />
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryFilter: {
    paddingBottom: 16,
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryChip: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  questionsList: {
    paddingBottom: 100,
  },
  questionCard: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 24,
    marginBottom: 16,
  },
  answerContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  asatidzName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
    marginLeft: 6,
  },
  answerText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  questionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
  },
  modalBody: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categorySelectorItem: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categorySelectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  questionInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 120,
  },
  modalActions: {
    padding: 20,
  },
  submitButton: {
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitGradient: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});