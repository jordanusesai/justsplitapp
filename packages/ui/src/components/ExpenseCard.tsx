import React from 'react'
import { clsx } from 'clsx'
import { Button } from './Button'
import { Card } from './Card'

export interface ExpenseCardProps {
  title: string
  amount: number
  currency: string
  date: string
  participants: Array<{ name: string; avatar?: string }>
  onApprove?: () => void
  onAdjust?: () => void
  onSettle?: () => void
  onViewReceipt?: () => void
  className?: string
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  currency,
  date,
  participants,
  onApprove,
  onAdjust,
  onSettle,
  onViewReceipt,
  className,
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)

  return (
    <Card className={clsx('p-4 space-y-4 shadow-md border-l-4 border-l-blue-500', className)}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="text-xl font-bold text-blue-600">{formattedAmount}</div>
      </div>

      <div className="flex -space-x-2 overflow-hidden">
        {participants.map((participant, index) => (
          <div
            key={index}
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600"
            title={participant.name}
          >
            {participant.avatar ? (
              <img src={participant.avatar} alt={participant.name} className="h-full w-full rounded-full" />
            ) : (
              participant.name.charAt(0).toUpperCase()
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        {onApprove && (
          <Button variant="primary" size="sm" onClick={onApprove} className="w-full min-h-[44px]">
            Approve
          </Button>
        )}
        {onAdjust && (
          <Button variant="outline" size="sm" onClick={onAdjust} className="w-full min-h-[44px]">
            Adjust
          </Button>
        )}
        {onSettle && (
          <Button variant="secondary" size="sm" onClick={onSettle} className="w-full min-h-[44px]">
            Settle
          </Button>
        )}
        {onViewReceipt && (
          <Button variant="outline" size="sm" onClick={onViewReceipt} className="w-full min-h-[44px]">
            View Receipt
          </Button>
        )}
      </div>
    </Card>
  )
}
