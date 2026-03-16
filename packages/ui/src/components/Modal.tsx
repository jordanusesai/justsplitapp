import React from 'react'
import { clsx } from 'clsx'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-in fade-in duration-200">
      <div 
        className={clsx(
          'bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform animate-in zoom-in-95 duration-200',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          {title && (
            <h2 id="modal-title" className="text-lg font-bold text-gray-900">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
