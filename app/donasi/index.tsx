import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Users, GraduationCap, Hop as Home, Baby, DollarSign, CreditCard, Smartphone, Building, X, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function DonasiScreen() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('operasional');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const donationPurposes = [
    {
      id: 'operasional',
      name: 'Operasional App',
      description: 'Mendukung pengembangan dan maintenance aplikasi',
      icon: Smartphone,
      color: '#3b82f6',
      target: 50000000,
      collected: 32500000,
    },
    {
      id: 'beasiswa',
      name: 'Beasiswa Santri',
      description: 'Membantu santri kurang mampu untuk belajar',
      icon: GraduationCap,
      color: '#22c55e',
      target: 100000000,
      collected: 67800000,
    },
    {
      id: 'masjid',
      name: 'Pembangunan Masjid',
      description: 'Membantu pembangunan masjid di daerah terpencil',
      icon: Home,
      color: '#f59e0b',
      target: 200000000,
      collected: 145600000,
    },
    {
      id: 'yatim',
      name: 'Yatim Piatu',
      description: 'Membantu anak yatim piatu untuk pendidikan',
      icon: Baby,
      color: '#ef4444',
      target: 75000000,
      collected: 43200000,
    },
  ];

  const quickAmounts = [25000, 50000, 100000, 250000, 500000, 1000000];

  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', icon: Smartphone, color: '#00AA13' },
    { id: 'ovo', name: 'OVO', icon: Smartphone, color: '#4C3494' },
    { id: 'dana', name: 'DANA', icon: Smartphone, color: '#118EEA' },
    { id: 'bca', name: 'BCA Virtual Account', icon: Building, color: '#0066CC' },
    { id: 'mandiri', name: 'Mandiri Virtual Account', icon: Building, color: '#003D79' },
    { id: 'bni', name: 'BNI Virtual Account', icon: Building, color: '#F47920' },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const PurposeCard = ({ purpose }: { purpose: any }) => {
    const IconComponent = purpose.icon;
    const progress = (purpose.collected / purpose.target) * 100;
    const isSelected = selectedPurpose === purpose.id;

    return (
      <TouchableOpacity
        style={[
          styles.purposeCard,
          isSelected && { borderColor: purpose.color, borderWidth: 2 }
        ]}
        onPress={() => setSelectedPurpose(purpose.id)}>
        
        <View style={styles.purposeHeader}>
          <View style={[styles.purposeIcon, { backgroundColor: `${purpose.color}20` }]}>
            <IconComponent size={24} color={purpose.color} strokeWidth={2} />
          </View>
          
          <View style={styles.purposeInfo}>
            <Text style={styles.purposeName}>{purpose.name}</Text>
            <Text style={styles.purposeDescription}>{purpose.description}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${progress}%`, backgroundColor: purpose.color }
              ]} 
            />
          </View>
          
          <View style={styles.progressInfo}>
            <Text style={styles.collectedText}>
              {formatCurrency(purpose.collected)}
            </Text>
            <Text style={styles.targetText}>
              dari {formatCurrency(purpose.target)}
            </Text>
          </View>
        </View>

        <Text style={styles.progressPercent}>{progress.toFixed(1)}% tercapai</Text>
      </TouchableOpacity>
    );
  };

  const AmountSelector = () => (
    <View style={styles.amountSelector}>
      <Text style={styles.sectionTitle}>Pilih Nominal Donasi</Text>
      
      <View style={styles.quickAmountsGrid}>
        {quickAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              selectedAmount === amount && styles.amountButtonActive
            ]}
            onPress={() => {
              setSelectedAmount(amount);
              setCustomAmount('');
            }}>
            <Text style={[
              styles.amountButtonText,
              selectedAmount === amount && styles.amountButtonTextActive
            ]}>
              {formatCurrency(amount)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.customAmountContainer}>
        <Text style={styles.customAmountLabel}>Atau masukkan nominal lain:</Text>
        <TextInput
          style={styles.customAmountInput}
          placeholder="Masukkan nominal"
          value={customAmount}
          onChangeText={(text) => {
            setCustomAmount(text);
            setSelectedAmount(null);
          }}
          keyboardType="numeric"
        />
      </View>
    </View>
  );

  const PaymentModal = () => (
    <Modal
      visible={showPaymentModal}
      transparent
      animationType="slide"
      onRequestClose={() => setShowPaymentModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Pilih Metode Pembayaran</Text>
            <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
              <X size={24} color="#64748b" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.paymentMethods}>
            {paymentMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.paymentMethod,
                    selectedPayment === method.id && styles.paymentMethodActive
                  ]}
                  onPress={() => setSelectedPayment(method.id)}>
                  <View style={[styles.paymentIcon, { backgroundColor: `${method.color}20` }]}>
                    <IconComponent size={20} color={method.color} strokeWidth={2} />
                  </View>
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <TouchableOpacity
            style={styles.confirmPaymentButton}
            onPress={() => {
              setShowPaymentModal(false);
              setShowSuccessModal(true);
            }}>
            <LinearGradient
              colors={['#22c55e', '#16a34a']}
              style={styles.confirmPaymentGradient}>
              <Text style={styles.confirmPaymentText}>Konfirmasi Pembayaran</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const SuccessModal = () => (
    <Modal
      visible={showSuccessModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowSuccessModal(false)}>
      <View style={styles.modalOverlay}>
        <View style={styles.successModalContent}>
          <CheckCircle size={64} color="#22c55e" strokeWidth={2} />
          <Text style={styles.successTitle}>Donasi Berhasil!</Text>
          <Text style={styles.successMessage}>
            Jazakallahu khairan atas donasi Anda. Semoga menjadi amal jariyah yang berkah.
          </Text>
          <TouchableOpacity
            style={styles.successButton}
            onPress={() => setShowSuccessModal(false)}>
            <Text style={styles.successButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const getDonationAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1e3a8a', '#3b82f6']}
        style={styles.header}>
        <Heart size={32} color="white" strokeWidth={2} />
        <Text style={styles.headerTitle}>Donasi</Text>
        <Text style={styles.headerSubtitle}>
          Berbagi kebaikan untuk kemajuan umat
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.purposesSection}>
          <Text style={styles.sectionTitle}>Pilih Tujuan Donasi</Text>
          {donationPurposes.map((purpose) => (
            <PurposeCard key={purpose.id} purpose={purpose} />
          ))}
        </View>

        <AmountSelector />

        {getDonationAmount() > 0 && (
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Ringkasan Donasi</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tujuan:</Text>
                <Text style={styles.summaryValue}>
                  {donationPurposes.find(p => p.id === selectedPurpose)?.name}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Nominal:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(getDonationAmount())}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.donateButton}
              onPress={() => setShowPaymentModal(true)}>
              <LinearGradient
                colors={['#22c55e', '#16a34a']}
                style={styles.donateGradient}>
                <DollarSign size={20} color="white" strokeWidth={2} />
                <Text style={styles.donateButtonText}>Donasi Sekarang</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <PaymentModal />
      <SuccessModal />
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
    marginTop: 12,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  purposesSection: {
    marginTop: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  purposeCard: {
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
  purposeHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  purposeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  purposeInfo: {
    flex: 1,
  },
  purposeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  purposeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  targetText: {
    fontSize: 14,
    color: '#64748b',
  },
  progressPercent: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
  },
  amountSelector: {
    marginBottom: 30,
  },
  quickAmountsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  amountButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: '30%',
    alignItems: 'center',
  },
  amountButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  amountButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  amountButtonTextActive: {
    color: 'white',
  },
  customAmountContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  customAmountLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  customAmountInput: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summarySection: {
    marginBottom: 30,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  donateButton: {
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  donateGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 16,
  },
  donateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
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
  paymentMethods: {
    maxHeight: 400,
    paddingHorizontal: 20,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  paymentMethodActive: {
    backgroundColor: '#f0f9ff',
    borderColor: '#3b82f6',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  confirmPaymentButton: {
    margin: 20,
    shadowColor: '#22c55e',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmPaymentGradient: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmPaymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  successModalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  successButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});