import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose?: () => void
  className?: string
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    warning: 'bg-yellow-500 text-white',
  }

  return (
    <div
      role="alert"
      className={clsx(
        'fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50',
        'px-6 py-3 rounded-lg shadow-lg transition-all transform animate-in fade-in slide-in-from-bottom-4',
        typeStyles[type],
        className
      )}
    >
      {message}
    </div>
  )
}
