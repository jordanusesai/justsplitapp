import React from 'react'
import { clsx } from 'clsx'

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  className?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className,
}) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-lg',
        className
      )}
      style={{ width, height }}
    />
  )
}
