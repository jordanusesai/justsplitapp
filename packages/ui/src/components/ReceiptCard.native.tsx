import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, TextInput } from 'react-native';
import { Card } from './Card.native';
import { LoadingSpinner } from './LoadingSpinner.native';
import { colors } from '@justsplitapp/tokens';
import { OCRResult } from '@justsplitapp/types';

export interface ReceiptCardProps {
  status: 'idle' | 'scanning' | 'completed' | 'error';
  result?: OCRResult;
  onRetry?: () => void;
  onClear?: () => void;
  onEditItem?: (index: number, field: 'description' | 'amount', value: string | number) => void;
  style?: any;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  status,
  result,
  onRetry,
  onClear,
  onEditItem,
  style,
}) => {
  if (status === 'idle') return null;

  return (
    <Card style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.icon}>🧾</Text>
          <Text style={styles.title}>Receipt Details</Text>
          {result?.isMock && (
            <View style={styles.mockBadgeSmall}>
              <Text style={styles.mockTextSmall}>MOCK DATA</Text>
            </View>
          )}
        </View>
        {status === 'completed' && onClear && (
          <TouchableOpacity onPress={onClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {status === 'scanning' && (
        <View style={styles.scanningContainer}>
          <LoadingSpinner size="large" />
          <Text style={styles.scanningText}>AI is parsing your receipt...</Text>
        </View>
      )}

      {status === 'error' && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>We couldn't read this receipt. You can edit and retry.</Text>
          {onRetry && (
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {status === 'completed' && result && (
        <View style={styles.resultContainer}>
          <View style={styles.metaRow}>
            <View>
              <Text style={styles.metaLabel}>Merchant</Text>
              <Text style={styles.merchantName}>{result.merchant}</Text>
            </View>
            <View style={styles.confidenceBadge}>
              <Text style={styles.metaLabel}>Confidence</Text>
              <Text style={[
                styles.confidenceText,
                { color: result.confidence > 0.8 ? '#16A34A' : '#D97706' }
              ]}>
                {Math.round(result.confidence * 100)}%
              </Text>
            </View>
          </View>

          <View style={styles.itemsContainer}>
            <Text style={styles.metaLabel}>Items (Editable)</Text>
            {result.items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <TextInput
                  style={styles.itemNameInput}
                  value={item.description}
                  onChangeText={(val) => onEditItem?.(idx, 'description', val)}
                  placeholder="Item description"
                />
                <View style={styles.amountInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.itemAmountInput}
                    value={item.amount.toString()}
                    keyboardType="decimal-pad"
                    onChangeText={(val) => onEditItem?.(idx, 'amount', parseFloat(val) || 0)}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerLabel}>Total Detected</Text>
            <Text style={styles.totalAmount}>${result.total.toFixed(2)}</Text>
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  mockBadgeSmall: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  mockTextSmall: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  clearText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
  },
  scanningContainer: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 12,
  },
  scanningText: {
    fontSize: 14,
    color: '#1E40AF',
    fontWeight: '500',
  },
  errorContainer: {
    paddingVertical: 16,
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultContainer: {
    gap: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#60A5FA',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  merchantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  confidenceBadge: {
    alignItems: 'flex-end',
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemsContainer: {
    maxHeight: 250,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(219, 234, 254, 0.5)',
  },
  itemNameInput: {
    fontSize: 14,
    color: '#1E40AF',
    flex: 1,
    padding: 4,
    marginRight: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  currencySymbol: {
    fontSize: 12,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  itemAmountInput: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    width: 60,
    textAlign: 'right',
    padding: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#DBEAFE',
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#2563EB',
  },
});
