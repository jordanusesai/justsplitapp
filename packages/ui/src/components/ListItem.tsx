import React from 'react'
import { clsx } from 'clsx'

export interface ListItemProps {
  title: string
  subtitle?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onClick?: () => void
  className?: string
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
  className,
}) => {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      onClick={onClick}
      className={clsx(
        'flex items-center w-full p-4 text-left transition-colors',
        onClick && 'hover:bg-gray-50 active:bg-gray-100 cursor-pointer',
        className
      )}
    >
      {leading && <div className="mr-4 flex-shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 truncate">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 truncate">{subtitle}</p>}
      </div>
      {trailing && <div className="ml-4 flex-shrink-0">{trailing}</div>}
    </Component>
  )
}
