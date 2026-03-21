import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AmountInput, ParticipantSelector, Button, Card, ReceiptCard, SplitSelector } from '@justsplitapp/ui'
import { OCRResult, ParticipantSplit, CreateSplitDto, ChatMessage } from '@justsplitapp/types'
import { io, Socket } from 'socket.io-client'
import { trackEvent, reportError } from '@justsplitapp/utils'

export function AddPage() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [description, setDescription] = useState('')
  const [selectedParticipants, setSelectedParticipants] = useState<any[]>([])
  const [ocrStatus, setOcrStatus] = useState<'idle' | 'scanning' | 'completed' | 'error'>('idle')
  const [ocrResult, setOcrResult] = useState<OCRResult | undefined>(undefined)
  const [srAnnouncement, setSrAnnouncement] = useState('')
  const [splits, setSplits] = useState<ParticipantSplit[]>([])
  const [rateInfo, setRateInfo] = useState<{ rate: number; provider: string; timestamp: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_WS_URL || 'http://localhost:4000'
    socketRef.current = io(`${socketUrl}/chat`)
    trackEvent('page_view', { page: 'add_expense' })
    return () => {
      socketRef.current?.disconnect()
    }
  }, [])

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

  const mockParticipants = [
    { id: '1', name: 'John Doe', avatar: '' },
    { id: '2', name: 'Jane Smith', avatar: '' },
    { id: '3', name: 'Bob Johnson', avatar: '' },
  ]

  const handleParticipantsChange = (selectedIds: string[]) => {
    const selected = mockParticipants.filter(p => selectedIds.includes(p.id))
    setSelectedParticipants(selected)
    trackEvent('participants_selected', { count: selected.length })
  }

  const handleScanReceipt = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setOcrStatus('scanning')
    setSrAnnouncement(t('addExpense.scanningStarted', 'Starting receipt scan...'))
    trackEvent('ocr_scan_started', { file_type: file.type, file_size: file.size })

    setTimeout(() => {
      try {
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
        setOcrStatus('completed')
        setSrAnnouncement(t('addExpense.scanningComplete', 'Receipt scanned successfully. Total amount updated.'))
        trackEvent('ocr_scan_success', { merchant: result.merchant, total: result.total, confidence: result.confidence })
      } catch (error) {
        setOcrStatus('error')
        reportError(error instanceof Error ? error : new Error(String(error)), { context: 'ocr_scan' })
        trackEvent('ocr_scan_failed')
      }
    }, 2000)
  }

  const handleCreateExpense = async () => {
    if (amount <= 0 || selectedParticipants.length === 0) return;

    const payload: CreateSplitDto = {
      title: description || t('addExpense.defaultTitle', 'New Expense'),
      amount,
      currency,
      participants: selectedParticipants.map(p => ({
        userId: p.id,
        name: p.name,
        amount: splits.find(s => s.userId === p.id)?.amount || 0,
      })),
      exchangeRate: rateInfo?.rate,
      exchangeRateProvider: rateInfo?.provider,
      exchangeRateTimestamp: rateInfo?.timestamp,
    }

    trackEvent('expense_creation_started', { amount, currency, participant_count: selectedParticipants.length })

    // Post to chat if connected
    if (socketRef.current) {
      const chatMsg: Partial<ChatMessage> = {
        id: Math.random().toString(36).substr(2, 9),
        senderId: 'current-user',
        senderName: 'Me',
        type: 'expenseCard',
        content: payload.title,
        timestamp: new Date().toISOString(),
        status: 'sent',
      };
      socketRef.current.emit('sendMessage', chatMsg);
    }

    // Simulate navigation/success before server confirms
    setTimeout(() => {
      setSrAnnouncement(t('addExpense.expenseCreated', 'Expense created successfully with locked exchange rate.'))
      trackEvent('expense_creation_success', { id: payload.title })
      alert(t('addExpense.successAlert', 'Expense added.'))
    }, 500)

    console.log('Creating expense with rate-lock:', payload)
    // In a real app, this would be a fetch/axios call to /api/splits
    // await fetch('/api/splits', { method: 'POST', body: JSON.stringify(payload) })
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
        <ReceiptCard 
          status={ocrStatus}
          result={ocrResult}
          onClear={() => {
            setOcrResult(undefined)
            setOcrStatus('idle')
          }}
          onRetry={() => {
            setOcrStatus('idle')
            fileInputRef.current?.click()
          }}
        />

        <Card>
          <div className="p-6 space-y-6">
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
          </div>
        </Card>

        {ocrStatus === 'idle' && (
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
