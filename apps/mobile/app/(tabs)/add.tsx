import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SplitSelector } from '@justsplitapp/ui';

export default function AddScreen() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('0.00');
  const [description, setDescription] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState<any>(null);
  const [rateInfo, setRateInfo] = useState<any>(null);
  const [selectedParticipants, setSelectedParticipants] = useState<any[]>([]);

  const mockParticipants = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
  ];

  // Mock currency rate fetch
  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      setRateInfo({
        rate: 0.92,
        provider: 'frankfurter',
        timestamp: Date.now()
      });
    }
  }, [amount]);

  const handleScanReceipt = () => {
    setIsScanning(true);
    // Simulate OCR processing delay
    setTimeout(() => {
      const result = {
        merchant: 'Whole Foods Market',
        total: 42.50,
        items: [
          { description: 'Organic Milk', amount: 5.99 },
          { description: 'Avocados (3ct)', amount: 4.50 },
          { description: 'Chicken Breast', amount: 12.50 },
        ],
      };
      setOcrResult(result);
      setAmount(result.total.toString());
      setIsScanning(false);
      Alert.alert(t('common.success'), t('addExpense.scanningComplete', 'Receipt scanned successfully.'));
    }, 2000);
  };

  const handleCreateExpense = () => {
    console.log('Creating expense:', { amount, description, participants: selectedParticipants });
    Alert.alert(t('common.success'), t('addExpense.expenseCreated', 'Expense created successfully.'));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{t('addExpense.title', 'Add Expense')}</Text>
          </View>

          {isScanning ? (
            <View style={styles.scanningContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.scanningText}>{t('addExpense.parsingReceipt', 'Parsing receipt...')}</Text>
            </View>
          ) : (
            <View style={styles.form}>
              {ocrResult && (
                <View style={styles.ocrPreview}>
                  <View style={styles.ocrHeader}>
                    <Text style={styles.ocrMerchant}>{ocrResult.merchant}</Text>
                    <TouchableOpacity onPress={() => setOcrResult(null)}>
                      <Text style={styles.ocrClear}>{t('common.clear', 'Clear')}</Text>
                    </TouchableOpacity>
                  </View>
                  {ocrResult.items.map((item: any, i: number) => (
                    <View key={i} style={styles.ocrItem}>
                      <Text style={styles.ocrItemName}>{item.description}</Text>
                      <Text style={styles.ocrItemAmount}>${item.amount.toFixed(2)}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('addExpense.amount', 'Amount')}</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                  />
                </View>
                {rateInfo && (
                  <Text style={styles.rateInfo}>
                    Rate: 1 USD = {rateInfo.rate} EUR • {rateInfo.provider}
                  </Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('addExpense.description', 'Description')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={description}
                  onChangeText={setDescription}
                  placeholder={t('addExpense.descriptionPlaceholder', 'What was this for?')}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('addExpense.participants', 'Participants')}</Text>
                <View style={styles.participantsList}>
                  {mockParticipants.map((p) => (
                    <TouchableOpacity key={p.id} style={styles.participantChip}>
                      <Text style={styles.participantName}>{p.name}</Text>
                      <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity style={styles.addParticipantButton}>
                    <Ionicons name="add" size={20} color="#2563EB" />
                    <Text style={styles.addParticipantText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>{t('addExpense.splitMethod', 'How to split?')}</Text>
                <SplitSelector
                  totalAmount={parseFloat(amount) || 0}
                  participants={mockParticipants}
                  onChange={(s) => setSelectedParticipants(s)}
                />
              </View>

              <TouchableOpacity style={styles.scanButton} onPress={handleScanReceipt}>
                <Ionicons name="camera" size={24} color="#2563EB" />
                <Text style={styles.scanButtonText}>{t('addExpense.scanReceipt', 'Scan Receipt')}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.submitButton, (!amount || amount === '0.00') && styles.submitButtonDisabled]}
                onPress={handleCreateExpense}
                disabled={!amount || amount === '0.00'}
              >
                <Text style={styles.submitButtonText}>{t('addExpense.create', 'Create Expense')}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  scanningContainer: {
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  scanningText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  form: {
    gap: 24,
  },
  ocrPreview: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  ocrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  ocrMerchant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  ocrClear: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  ocrItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  ocrItemName: {
    fontSize: 12,
    color: '#1E40AF',
  },
  ocrItemAmount: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1E40AF',
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  rateInfo: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 4,
  },
  textInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    color: '#111827',
  },
  participantsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  participantChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  participantName: {
    fontSize: 14,
    color: '#374151',
  },
  addParticipantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  addParticipantText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
    minHeight: 56,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  submitButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 56,
  },
  submitButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
