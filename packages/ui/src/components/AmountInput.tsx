import React, { useState } from 'react'
import { clsx } from 'clsx'

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
    <div className="relative">
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
          value={isFocused ? value.toString() : formatValue(value)}
          onChange={(e) => handleValueChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 outline-none text-lg font-medium"
          aria-label={`Amount in ${currency}`}
        />
        <button
          type="button"
          className="ml-2 px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
          disabled={disabled}
          aria-label="Switch currency"
        >
          {currency}
        </button>
      </div>
    </div>
  )
}
