import React, { useState } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

export interface AmountInputProps {
  value: number
  onChange: (value: number) => void
  currency?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onChange,
  currency = 'USD',
  placeholder = '0.00',
  disabled = false,
  className
}) => {
  const { t } = useTranslation()
  const [isFocused, setIsFocused] = useState(false)

  const handleValueChange = (newValue: string) => {
    const numericValue = parseFloat(newValue.replace(/[^0-9.]/g, ''))
    if (!isNaN(numericValue)) {
      onChange(numericValue)
    }
  }

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val)
  }

  return (
    <div className="relative" role="group" aria-label={t('addExpense.amountGroup', 'Expense amount')}>
      <div
        className={clsx(
          'flex items-center border rounded-lg px-4 py-3 bg-white',
          'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500',
          disabled && 'opacity-50 cursor-not-allowed',
          isFocused && 'border-blue-500 ring-2 ring-blue-500',
          className
        )}
      >
        <input
          type="text"
          inputMode="decimal"
          value={isFocused ? value.toString() : formatValue(value)}
          onChange={(e) => handleValueChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 outline-none text-lg font-medium"
          aria-label={t('addExpense.amountLabel', `Amount in ${currency}`)}
          aria-invalid={value < 0}
        />
        <button
          type="button"
          className="ml-2 px-3 py-2 min-h-[44px] min-w-[44px] text-sm text-gray-600 hover:text-gray-800 rounded-md focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
          aria-label={t('addExpense.switchCurrency', `Switch currency from ${currency}`)}
        >
          {currency}
        </button>
      </div>
    </div>
  )
}
