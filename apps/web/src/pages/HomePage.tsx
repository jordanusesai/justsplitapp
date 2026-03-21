import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card, Button, RecommendationCard, FAB } from '@justsplitapp/ui'

export function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [locationConsent, setLocationConsent] = useState<boolean | null>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])

  const mockBalances = {
    total: 120.50,
    youOwe: 45.00,
    youAreOwed: 165.50
  }

  const mockPlaces = [
    { name: 'Blue Bottle Coffee', address: '123 Market St', category: 'Coffee Shop', distance: 150, isMock: true },
    { name: 'Whole Foods Market', address: '200 4th St', category: 'Grocery Store', distance: 450, isMock: true },
  ]

  useEffect(() => {
    if (locationConsent) {
      // Simulate fetching recommendations
      setRecommendations(mockPlaces)
    }
  }, [locationConsent])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center border-t-4 border-t-blue-500">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{t('home.totalBalance', 'Total Balance')}</p>
          <p className={`text-3xl font-bold mt-2 ${mockBalances.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${mockBalances.total.toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 text-center border-t-4 border-t-red-500">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{t('home.youOwe', 'You Owe')}</p>
          <p className="text-3xl font-bold mt-2 text-red-600">
            ${mockBalances.youOwe.toFixed(2)}
          </p>
        </Card>
        <Card className="p-6 text-center border-t-4 border-t-green-500">
          <p className="text-sm text-gray-500 uppercase font-bold tracking-wider">{t('home.youAreOwed', 'You are Owed')}</p>
          <p className="text-3xl font-bold mt-2 text-green-600">
            ${mockBalances.youAreOwed.toFixed(2)}
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4">
        <Button size="lg" className="px-8 min-h-[44px]">
          {t('home.addExpense', 'Add Expense')}
        </Button>
        <Button variant="outline" size="lg" className="px-8 min-h-[44px]">
          {t('home.settleUp', 'Settle Up')}
        </Button>
      </div>

      {/* Location Recommendations */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-gray-900">{t('home.recommendationsTitle', 'Nearby Places to Split')}</h2>
          {locationConsent && (
            <button 
              onClick={() => setLocationConsent(false)}
              className="text-xs text-gray-500 hover:text-blue-600 underline"
            >
              {t('home.turnOffLocation', 'Turn off location')}
            </button>
          )}
        </div>

        {locationConsent === null && (
          <Card className="p-6 bg-blue-50 border-blue-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-blue-900">{t('home.locationConsentTitle', 'Discover Nearby Places')}</h3>
                <p className="text-sm text-blue-800 mt-1">
                  {t('home.locationConsentText', 'Use your location to suggest nearby restaurants and shops for your expenses. You can turn this off anytime.')}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button size="sm" variant="outline" onClick={() => setLocationConsent(false)}>
                  {t('home.notNow', 'Not now')}
                </Button>
                <Button size="sm" onClick={() => setLocationConsent(true)}>
                  {t('home.enableLocation', 'Enable')}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {locationConsent === true && (
          <div className="space-y-4">
            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((place, idx) => (
                  <RecommendationCard 
                    key={idx}
                    {...place}
                    onAttach={() => console.log('Attaching place:', place.name)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-gray-500 border-dashed border-2">
                <p>{t('home.noReceipts', 'No receipts yet—snap a photo to auto‑fill.')}</p>
              </Card>
            )}
          </div>
        )}

        {locationConsent === false && (
          <p className="text-center py-8 text-gray-500 italic text-sm">
            {t('home.locationDisabled', 'Location services are disabled.')}
          </p>
        )}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">{t('home.recentActivity', 'Recent Activity')}</h2>
        <Card className="p-12 text-center text-gray-500 border-dashed border-2">
          <p>{t('home.noExpenses', 'No expenses yet—add your first one.')}</p>
        </Card>
      </div>

      <FAB 
        icon="+" 
        label={t('home.addExpense', 'Add Expense')} 
        onClick={() => navigate('/add')} 
      />
    </div>
  )
}

export default HomePage
