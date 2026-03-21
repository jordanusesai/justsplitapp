import React from 'react'
import { clsx } from 'clsx'
import { Button } from './Button'
import { Card } from './Card'

import { ActionChips, ActionChipProps } from './ActionChips'

export interface ExpenseCardProps {
  title: string
  amount: number
  currency: string
  date: string
  participants: Array<{ name: string; avatar?: string }>
  actions?: ActionChipProps[]
  className?: string
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  title,
  amount,
  currency,
  date,
  participants,
  actions = [],
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

      {actions.length > 0 && (
        <div className="pt-2 border-t border-gray-50">
          <ActionChips actions={actions} />
        </div>
      )}
    </Card>
  )
}
