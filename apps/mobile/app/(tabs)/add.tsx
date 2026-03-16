import React, { useState, useEffect, useRef } from 'react';
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
  Alert,
  AccessibilityInfo
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SplitSelector, ReceiptCard } from '@justsplitapp/ui';
import { OCRResult, ChatMessage, CreateSplitDto, ParticipantSplit } from '@justsplitapp/types';
import { io, Socket } from 'socket.io-client';

export default function AddScreen() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState('0.00');
  const [description, setDescription] = useState('');
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'completed' | 'error'>('idle');
  const [ocrResult, setOcrResult] = useState<OCRResult | undefined>(undefined);
  const [rateInfo, setRateInfo] = useState<{ rate: number; provider: string; timestamp: number } | null>(null);
  const [selectedSplits, setSelectedSplits] = useState<ParticipantSplit[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socketUrl = 'http://localhost:4000';
    socketRef.current = io(`${socketUrl}/chat`);
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

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

  const mockParticipants = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' },
  ];

  const handleScanReceipt = () => {
    setOcrStatus('scanning');
    AccessibilityInfo.announceForAccessibility(t('addExpense.scanningStarted', 'Starting receipt scan...'));
    
    // Simulate OCR processing delay
    setTimeout(() => {
      const result: OCRResult = {
        merchant: 'Whole Foods Market',
        date: new Date().toISOString(),
        total: 42.50,
        tax: 3.50,
        confidence: 0.95,
        isMock: true,
        items: [
          { description: 'Organic Milk', amount: 5.99, quantity: 1 },
          { description: 'Avocados (3ct)', amount: 4.50, quantity: 1 },
          { description: 'Chicken Breast', amount: 12.50, quantity: 1 },
        ],
      };
      setOcrResult(result);
      setAmount(result.total.toString());
      setOcrStatus('completed');
      AccessibilityInfo.announceForAccessibility(t('addExpense.scanningComplete', 'Receipt scanned successfully. Total amount updated.'));
      Alert.alert(t('common.success'), t('addExpense.scanningComplete', 'Receipt scanned successfully.'));
    }, 2000);
  };

  const handleCreateExpense = async () => {
    if (!amount || amount === '0.00' || selectedSplits.length === 0) return;

    const payload: CreateSplitDto = {
      title: description || t('addExpense.defaultTitle', 'New Expense'),
      amount: parseFloat(amount),
      currency: 'USD',
      participants: selectedSplits.map((s: ParticipantSplit) => ({
        userId: s.userId,
        name: s.name,
        amount: s.amount,
      })),
      exchangeRate: rateInfo?.rate,
      exchangeRateProvider: rateInfo?.provider,
      exchangeRateTimestamp: rateInfo?.timestamp,
    };

    const tempId = Math.random().toString(36).substr(2, 9);
    
    if (socketRef.current) {
      const chatMsg: Partial<ChatMessage> = {
        id: tempId,
        senderId: 'current-user',
        senderName: 'Me',
        type: 'expenseCard',
        content: payload.title,
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      socketRef.current.emit('sendMessage', chatMsg);
    }

    Alert.alert(
      t('common.success', 'Success'), 
      t('addExpense.successAlert', 'Expense saved! (Optimistic update)'),
      [{ text: 'OK' }]
    );

    setTimeout(() => {
      setAmount('0.00');
      setDescription('');
      setSelectedSplits([]);
      setOcrResult(undefined);
      setOcrStatus('idle');
    }, 500);
  };

  const handleEditOCRItem = (index: number, field: 'description' | 'amount', value: string | number) => {
    if (!ocrResult) return;
    const newItems = [...ocrResult.items];
    newItems[index] = { ...newItems[index], [field]: value };
    const newTotal = newItems.reduce((sum, item) => sum + item.amount, 0);
    setOcrResult({ ...ocrResult, items: newItems, total: newTotal });
    setAmount(newTotal.toString());
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

          <View style={styles.form}>
            <ReceiptCard 
              status={ocrStatus}
              result={ocrResult}
              onClear={() => {
                setOcrResult(undefined);
                setOcrStatus('idle');
              }}
              onRetry={() => {
                setOcrStatus('idle');
                handleScanReceipt();
              }}
              onEditItem={handleEditOCRItem}
              style={styles.receiptCard}
            />

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
                  accessibilityLabel={t('addExpense.amountLabel', 'Amount in USD')}
                />
              </View>
              {rateInfo && (
                <Text style={styles.rateInfo}>
                  Rate: 1 USD = {rateInfo.rate} EUR • {rateInfo.provider} • {new Date(rateInfo.timestamp).toLocaleTimeString()}
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
                accessibilityLabel={t('addExpense.descriptionLabel', 'Description')}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t('addExpense.participants', 'Participants')}</Text>
              <View style={styles.participantsList}>
                {mockParticipants.map((p) => (
                  <TouchableOpacity 
                    key={p.id} 
                    style={styles.participantChip}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${p.name}`}
                  >
                    <Text style={styles.participantName}>{p.name}</Text>
                    <Ionicons name="close-circle" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity 
                  style={styles.addParticipantButton}
                  accessibilityRole="button"
                  accessibilityLabel="Add participant"
                >
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
                onChange={(s: ParticipantSplit[]) => setSelectedSplits(s)}
              />
            </View>

            {ocrStatus === 'idle' && (
              <TouchableOpacity 
                style={styles.scanButton} 
                onPress={handleScanReceipt}
                accessibilityRole="button"
                accessibilityLabel={t('addExpense.scanReceipt', 'Scan Receipt')}
              >
                <Ionicons name="camera" size={24} color="#2563EB" />
                <Text style={styles.scanButtonText}>{t('addExpense.scanReceipt', 'Scan Receipt')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.submitButton, (!amount || amount === '0.00' || selectedSplits.length === 0) && styles.submitButtonDisabled]}
              onPress={handleCreateExpense}
              disabled={!amount || amount === '0.00' || selectedSplits.length === 0}
              accessibilityRole="button"
              accessibilityLabel={t('addExpense.create', 'Create Expense')}
            >
              <Text style={styles.submitButtonText}>{t('addExpense.create', 'Create Expense')}</Text>
            </TouchableOpacity>
          </View>
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
  form: {
    gap: 24,
  },
  receiptCard: {
    marginBottom: 8,
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
