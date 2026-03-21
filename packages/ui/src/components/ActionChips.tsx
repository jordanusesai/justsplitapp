import React from 'react'
import { clsx } from 'clsx'

export interface ActionChipProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'critical'
  icon?: React.ReactNode
  className?: string
}

export const ActionChip: React.FC<ActionChipProps> = ({
  label,
  onClick,
  variant = 'outline',
  icon,
  className,
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    critical: 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100',
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors min-h-[32px]',
        variants[variant],
        className
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </button>
  )
}

export interface ActionChipsProps {
  actions: ActionChipProps[]
  className?: string
}

export const ActionChips: React.FC<ActionChipsProps> = ({ actions, className }) => {
  return (
    <div className={clsx('flex flex-wrap gap-2', className)}>
      {actions.map((action, index) => (
        <ActionChip key={index} {...action} />
      ))}
    </div>
  )
}
