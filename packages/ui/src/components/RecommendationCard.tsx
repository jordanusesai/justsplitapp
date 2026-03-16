import React from 'react'
import { clsx } from 'clsx'
import { Card } from './Card'
import { Button } from './Button'

export interface RecommendationCardProps {
  name: string
  address: string
  category: string
  distance?: number
  isMock?: boolean
  onAttach?: () => void
  className?: string
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  name,
  address,
  category,
  distance,
  isMock = false,
  onAttach,
  className,
}) => {
  return (
    <Card className={clsx('overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow', className)}>
      <div className="p-4 flex-1 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-900 line-clamp-1">{name}</h3>
          {isMock && (
            <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">
              MOCK DATA
            </span>
          )}
        </div>
        <p className="text-xs text-blue-600 font-medium">{category}</p>
        <p className="text-sm text-gray-500 line-clamp-2">{address}</p>
        {distance && (
          <p className="text-xs text-gray-400">
            {distance < 1000 ? `${distance}m away` : `${(distance / 1000).toFixed(1)}km away`}
          </p>
        )}
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAttach} 
          className="w-full text-xs min-h-[36px]"
        >
          Attach to Expense
        </Button>
      </div>
    </Card>
  )
}
