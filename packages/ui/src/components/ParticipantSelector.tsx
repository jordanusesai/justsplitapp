import React, { useState } from 'react'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

export interface Participant {
  id: string
  name: string
  avatar?: string
  selected?: boolean
}

export interface ParticipantSelectorProps {
  participants: Participant[]
  onSelectionChange: (selectedIds: string[]) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const ParticipantSelector: React.FC<ParticipantSelectorProps> = ({
  participants,
  onSelectionChange,
  placeholder = 'Search participants...',
  disabled = false,
  className
}) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredParticipants = participants.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleParticipant = (id: string) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter(selectedId => selectedId !== id)
      : [...selectedIds, id]
    
    setSelectedIds(newSelected)
    onSelectionChange(newSelected)
  }

  return (
    <div className={clsx('space-y-3', className)}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[44px]"
          aria-label={t('participants.searchLabel', 'Search participants')}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {filteredParticipants.map(participant => (
          <div
            key={participant.id}
            role="checkbox"
            aria-checked={selectedIds.includes(participant.id)}
            tabIndex={disabled ? -1 : 0}
            onClick={() => !disabled && toggleParticipant(participant.id)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                !disabled && toggleParticipant(participant.id);
              }
            }}
            className={clsx(
              'flex items-center p-3 rounded-lg border cursor-pointer transition-colors min-h-[44px]',
              selectedIds.includes(participant.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="flex items-center flex-1">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                {participant.avatar ? (
                  <img src={participant.avatar} alt={participant.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-gray-600">
                    {participant.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <span className="font-medium text-gray-900">{participant.name}</span>
            </div>
            <div className={clsx(
              'w-5 h-5 rounded border-2 flex items-center justify-center',
              selectedIds.includes(participant.id)
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300'
            )}>
              {selectedIds.includes(participant.id) && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">
            {selectedIds.length} participant{selectedIds.length !== 1 ? 's' : ''} selected
          </span>
          <button
            onClick={() => {
              setSelectedIds([])
              onSelectionChange([])
            }}
            disabled={disabled}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
