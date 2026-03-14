import React from 'react'
import { clsx } from 'clsx'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardContent: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
