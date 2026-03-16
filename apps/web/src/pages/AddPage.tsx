import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AmountInput, ParticipantSelector, Button, Card } from '@justsplitapp/ui'

export function AddPage() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState(0)
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([])

  const mockParticipants = [
    { id: '1', name: 'John Doe', avatar: '' },
    { id: '2', name: 'Jane Smith', avatar: '' },
    { id: '3', name: 'Bob Johnson', avatar: '' },
  ]

  const handleCreateExpense = () => {
    console.log('Creating expense:', { amount, participants: selectedParticipants })
    // TODO: Implement expense creation logic
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('addExpense.title', 'Add Expense')}
        </h1>
        <p className="text-gray-600">
          {t('addExpense.description', 'Split expenses with friends easily')}
        </p>
      </div>

      <Card>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('addExpense.amount', 'Amount')}
            </label>
            <AmountInput
              value={amount}
              onChange={setAmount}
              placeholder="0.00"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('addExpense.participants', 'Participants')}
            </label>
            <ParticipantSelector
              participants={mockParticipants}
              onSelectionChange={setSelectedParticipants}
              placeholder={t('addExpense.searchParticipants', 'Search participants...')}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('addExpense.description', 'Description (optional)')}
            </label>
            <textarea
              placeholder={t('addExpense.descriptionPlaceholder', 'What was this expense for?')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <Button
            onClick={handleCreateExpense}
            disabled={amount <= 0 || selectedParticipants.length === 0}
            className="w-full"
            size="lg"
          >
            {t('addExpense.create', 'Create Expense')}
          </Button>
        </div>
      </Card>

      <div className="text-center text-sm text-gray-500">
        <p>{t('addExpense.or', 'or')}</p>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          {t('addExpense.scanReceipt', 'Scan Receipt')}
        </button>
      </div>
    </div>
  )
}
