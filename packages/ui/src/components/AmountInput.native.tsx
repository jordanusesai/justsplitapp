import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '@justsplitapp/tokens';

export interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: any;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  currency = 'USD',
  placeholder = '0.00',
  disabled = false,
  style,
}) => {
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);

  const handleValueChange = (text: string) => {
    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    if (!isNaN(numericValue)) {
      onChange(numericValue);
    } else if (text === '') {
      onChange(0);
    }
  };

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(val);
  };

  return (
    <View 
      style={[
        styles.container, 
        isFocused && styles.containerFocused,
        disabled && styles.disabled,
        style
      ]}
      accessibilityRole="none"
      accessibilityLabel={t('addExpense.amountGroup', 'Expense amount')}
    >
      <TextInput
        style={styles.input}
        value={isFocused ? (value === 0 ? '' : value.toString()) : formatValue(value)}
        onChangeText={handleValueChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType="decimal-pad"
        editable={!disabled}
        accessibilityLabel={t('addExpense.amountLabel', `Amount in ${currency}`)}
      />
      <TouchableOpacity 
        style={styles.currencyButton}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={t('addExpense.switchCurrency', `Switch currency from ${currency}`)}
      >
        <Text style={styles.currencyText}>{currency}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    minHeight: 56, // Matches 44pt+ requirement
  },
  containerFocused: {
    borderColor: colors.primary[500],
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: '#F3F4F6',
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    height: '100%',
  },
  currencyButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    marginLeft: 8,
    minHeight: 44, // 44pt target
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currencyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
  },
});
