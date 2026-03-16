import React from 'react'
import { clsx } from 'clsx'
import { Card } from './Card'
import { LoadingSpinner } from './LoadingSpinner'
import { OCRResult } from '@justsplitapp/types'

export interface ReceiptCardProps {
  status: 'idle' | 'scanning' | 'completed' | 'error'
  result?: OCRResult
  onRetry?: () => void
  onClear?: () => void
  onEditItem?: (index: number, field: 'description' | 'amount', value: string | number) => void
  className?: string
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  status,
  result,
  onRetry,
  onClear,
  onEditItem,
  className,
}) => {
  if (status === 'idle') return null

  return (
    <Card className={clsx('overflow-hidden border-blue-100 bg-blue-50', className)}>
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-blue-100 pb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🧾</span>
            <h3 className="font-bold text-blue-900">Receipt Details</h3>
            {result?.isMock && (
              <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded border border-blue-200 font-bold uppercase tracking-tight">
                Mock Data
              </span>
            )}
          </div>
          {status === 'completed' && onClear && (
            <button 
              onClick={onClear}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {status === 'scanning' && (
          <div className="flex flex-col items-center py-6 space-y-3">
            <LoadingSpinner size="md" />
            <p className="text-sm text-blue-700 font-medium animate-pulse">
              AI is parsing your receipt...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-red-600">We couldn't read this receipt. You can edit and retry.</p>
            {onRetry && (
              <button 
                onClick={onRetry}
                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {status === 'completed' && result && (
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] uppercase text-blue-400 font-bold tracking-wider">Merchant</p>
                <p className="text-lg font-bold text-blue-900">{result.merchant}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase text-blue-400 font-bold tracking-wider">Confidence</p>
                <p className={clsx(
                  'text-xs font-bold',
                  result.confidence > 0.8 ? 'text-green-600' : 'text-yellow-600'
                )}>
                  {Math.round(result.confidence * 100)}%
                </p>
              </div>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              <p className="text-[10px] uppercase text-blue-400 font-bold tracking-wider mb-1">Items (Editable)</p>
              {result.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 py-1 border-b border-blue-50 border-opacity-50">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => onEditItem?.(idx, 'description', e.target.value)}
                    className="flex-1 text-sm text-blue-800 bg-transparent border-none focus:ring-1 focus:ring-blue-200 rounded px-1 truncate"
                  />
                  <div className="flex items-center">
                    <span className="text-blue-900 text-sm mr-1">$</span>
                    <input
                      type="number"
                      value={item.amount}
                      step="0.01"
                      onChange={(e) => onEditItem?.(idx, 'amount', parseFloat(e.target.value) || 0)}
                      className="w-20 text-sm font-mono font-bold text-blue-900 bg-transparent border-none text-right focus:ring-1 focus:ring-blue-200 rounded px-1"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-blue-100">
              <span className="text-sm font-bold text-blue-900">Total Detected</span>
              <span className="text-lg font-black text-blue-600">${result.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
