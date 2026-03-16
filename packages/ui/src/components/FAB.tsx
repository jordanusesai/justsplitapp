import React from 'react'
import { clsx } from 'clsx'

export interface FABProps {
  icon: React.ReactNode
  onClick: () => void
  label: string
  className?: string
}

export const FAB: React.FC<FABProps> = ({
  icon,
  onClick,
  label,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'fixed bottom-24 right-6 md:bottom-8 md:right-8',
        'w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg',
        'flex items-center justify-center hover:bg-blue-700 transition-all active:scale-95',
        'focus:outline-none focus:ring-4 focus:ring-blue-300 z-40',
        className
      )}
      aria-label={label}
    >
      <span className="text-2xl">{icon}</span>
    </button>
  )
}
