import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AmountInput, ParticipantSelector, Button, Card, LoadingSpinner, SplitSelector } from '@justsplitapp/ui'
import { OCRResult, ParticipantSplit } from '@justsplitapp/types'

export function AddPage() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [selectedParticipants, setSelectedParticipants] = useState<any[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null)
  const [srAnnouncement, setSrAnnouncement] = useState('')
  const [splits, setSplits] = useState<ParticipantSplit[]>([])
  const [rateInfo, setRateInfo] = useState<{ rate: number; provider: string; timestamp: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockParticipants = [
    { id: '1', name: 'John Doe', avatar: '' },
    { id: '2', name: 'Jane Smith', avatar: '' },
    { id: '3', name: 'Bob Johnson', avatar: '' },
  ]

  // Mock currency rate fetch
  useEffect(() => {
    if (amount > 0) {
      setRateInfo({
        rate: 0.92,
        provider: 'frankfurter',
        timestamp: Date.now()
      })
    }
  }, [amount, currency])

  const handleParticipantsChange = (selectedIds: string[]) => {
    const selected = mockParticipants.filter(p => selectedIds.includes(p.id))
    setSelectedParticipants(selected)
  }

  const handleScanReceipt = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsScanning(true)
    setSrAnnouncement(t('addExpense.scanningStarted', 'Starting receipt scan...'))

    setTimeout(() => {
      const result: OCRResult = {
        merchant: 'Whole Foods Market',
        date: new Date().toISOString(),
        total: 42.50,
        tax: 3.50,
        confidence: 0.95,
        items: [
          { description: 'Organic Milk', amount: 5.99, quantity: 1 },
          { description: 'Avocados (3ct)', amount: 4.50, quantity: 1 },
          { description: 'Whole Wheat Bread', amount: 3.99, quantity: 1 },
          { description: 'Chicken Breast', amount: 12.50, quantity: 1 },
          { description: 'Sparkling Water (12pk)', amount: 12.02, quantity: 1 },
        ],
      }
      setOcrResult(result)
      setAmount(result.total)
      setIsScanning(false)
      setSrAnnouncement(t('addExpense.scanningComplete', 'Receipt scanned successfully. Total amount updated.'))
    }, 2000)
  }

  const handleCreateExpense = () => {
    console.log('Creating expense:', { amount, currency, participants: selectedParticipants, splits, ocrResult, rate: rateInfo })
    setSrAnnouncement(t('addExpense.expenseCreated', 'Expense created successfully.'))
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 pb-24">
      <div className="sr-only" aria-live="polite">{srAnnouncement}</div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('addExpense.title', 'Add Expense')}
        </h1>
        <p className="text-gray-600">
          {t('addExpense.description', 'Split expenses with friends easily')}
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <div className="p-6 space-y-6">
            {isScanning ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <LoadingSpinner size="lg" />
                <p className="text-blue-600 font-medium">{t('addExpense.parsingReceipt', 'Parsing receipt...')}</p>
              </div>
            ) : (
              <>
                {ocrResult && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-blue-900">{ocrResult.merchant}</h3>
                      <button 
                        onClick={() => setOcrResult(null)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {t('common.clear', 'Clear')}
                      </button>
                    </div>
                    <div className="text-xs text-blue-700 space-y-1">
                      {ocrResult.items.map((item, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{item.description}</span>
                          <span>${item.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addExpense.amount', 'Amount')}
                  </label>
                  <AmountInput
                    value={amount}
                    onChange={setAmount}
                    currency={currency}
                    placeholder="0.00"
                    className="w-full"
                  />
                  {rateInfo && (
                    <p className="mt-2 text-[10px] text-gray-400">
                      Rate: 1 USD = {rateInfo.rate} EUR • Provider: {rateInfo.provider} • {new Date(rateInfo.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addExpense.participants', 'Participants')}
                  </label>
                  <ParticipantSelector
                    participants={mockParticipants}
                    onSelectionChange={handleParticipantsChange}
                    placeholder={t('addExpense.searchParticipants', 'Search participants...')}
                    className="w-full"
                  />
                </div>

                {selectedParticipants.length > 0 && (
                  <div className="pt-4 border-t border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      {t('addExpense.splitMethod', 'How to split?')}
                    </label>
                    <SplitSelector
                      totalAmount={amount}
                      participants={selectedParticipants}
                      onChange={setSplits}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('addExpense.descriptionLabel', 'Description (optional)')}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('addExpense.descriptionPlaceholder', 'What was this expense for?')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleCreateExpense}
                  disabled={amount <= 0 || selectedParticipants.length === 0}
                  className="w-full min-h-[56px]"
                  size="lg"
                >
                  {t('addExpense.create', 'Create Expense')}
                </Button>
              </>
            )}
          </div>
        </Card>

        {!isScanning && (
          <div className="text-center text-sm text-gray-500 space-y-4">
            <p>{t('addExpense.or', 'or')}</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleScanReceipt}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-800 font-medium min-h-[44px] px-4 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              {t('addExpense.scanReceipt', 'Scan Receipt')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
