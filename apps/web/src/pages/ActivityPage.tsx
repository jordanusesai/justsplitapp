import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@justsplitapp/ui'

export function ActivityPage() {
  const { t } = useTranslation()

  const mockActivities = [
    {
      id: '1',
      type: 'expense',
      title: 'Dinner at Italian Restaurant',
      amount: 85.50,
      date: '2024-03-14',
      status: 'pending',
    },
    {
      id: '2',
      type: 'payment',
      title: 'John settled lunch split',
      amount: 25.00,
      date: '2024-03-14',
      status: 'completed',
    },
    {
      id: '3',
      type: 'expense',
      title: 'Uber ride to airport',
      amount: 45.00,
      date: '2024-03-13',
      status: 'settled',
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('activity.title', 'Activity')}
        </h1>
        <p className="text-gray-600">
          {t('activity.description', 'Recent expenses and payments')}
        </p>
      </div>

      <div className="space-y-4">
        {mockActivities.map(activity => (
          <Card key={activity.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(activity.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  ${activity.amount.toFixed(2)}
                </p>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  activity.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : activity.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
