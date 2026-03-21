import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors } from '@justsplitapp/tokens';

export type SplitType = 'equal' | 'exact' | 'percentage' | 'shares';

export interface ParticipantSplit {
  userId: string;
  name: string;
  amount: number;
  percentage?: number;
  shares?: number;
}

export interface SplitSelectorProps {
  totalAmount: number;
  participants: Array<{ id: string; name: string }>;
  onChange: (splits: ParticipantSplit[]) => void;
  style?: any;
}

export const SplitSelector: React.FC<SplitSelectorProps> = ({
  totalAmount,
  participants,
  onChange,
  style,
}) => {
  const [splitType, setSplitType] = useState<SplitType>('equal');
  const [values, setValues] = useState<Record<string, number>>({});

  const handleSplitTypeChange = (type: SplitType) => {
    setSplitType(type);
    if (type === 'equal') {
      const equalAmount = totalAmount / participants.length;
      const newSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: equalAmount
      }));
      onChange(newSplits);
    }
  };

  const handleValueChange = (userId: string, val: string) => {
    const numValue = parseFloat(val) || 0;
    const newValues = { ...values, [userId]: numValue };
    setValues(newValues);

    let finalSplits: ParticipantSplit[] = [];
    if (splitType === 'exact') {
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: newValues[p.id] || 0
      }));
    } else if (splitType === 'percentage') {
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: (totalAmount * (newValues[p.id] || 0)) / 100,
        percentage: newValues[p.id] || 0
      }));
    } else if (splitType === 'shares') {
      const totalShares = Object.values(newValues).reduce((sum, s) => sum + s, 0);
      finalSplits = participants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: totalShares > 0 ? (totalAmount * (newValues[p.id] || 0)) / totalShares : 0,
        shares: newValues[p.id] || 0
      }));
    }
    onChange(finalSplits);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.tabBar}>
        {(['equal', 'exact', 'percentage', 'shares'] as SplitType[]).map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => handleSplitTypeChange(type)}
            style={[styles.tab, splitType === type && styles.activeTab]}
          >
            <Text style={[styles.tabText, splitType === type && styles.activeTabText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.list}>
        {participants.map((p) => (
          <View key={p.id} style={styles.item}>
            <Text style={styles.name}>{p.name}</Text>
            {splitType === 'equal' ? (
              <Text style={styles.amount}>${(totalAmount / participants.length).toFixed(2)}</Text>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="decimal-pad"
                  placeholder="0"
                  onChangeText={(val) => handleValueChange(p.id, val)}
                  value={values[p.id]?.toString() || ''}
                />
                <Text style={styles.unit}>
                  {splitType === 'percentage' ? '%' : splitType === 'shares' ? 'sh' : '$'}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.primary[500],
  },
  list: {
    gap: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 56,
  },
  name: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    textAlign: 'right',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  unit: {
    fontSize: 14,
    color: '#6B7280',
    width: 20,
  },
});
