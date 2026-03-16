import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button } from '@justsplitapp/ui'

export function GroupsPage() {
  const { t } = useTranslation()

  const mockGroups = [
    { id: '1', name: 'Roommates', members: 4, totalExpenses: 1250.50 },
    { id: '2', name: 'Trip to Paris', members: 6, totalExpenses: 3400.00 },
    { id: '3', name: 'Office Lunch', members: 8, totalExpenses: 320.75 },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('groups.title', 'Groups')}
        </h1>
        <p className="text-gray-600">
          {t('groups.description', 'Manage your expense groups')}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockGroups.map(group => (
          <Card key={group.id} className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {group.name}
            </h3>
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p>{group.members} members</p>
              <p>Total: ${group.totalExpenses.toFixed(2)}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              {t('groups.viewGroup', 'View Group')}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg">
          {t('groups.createGroup', 'Create New Group')}
        </Button>
      </div>
    </div>
  )
}
