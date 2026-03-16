import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button } from '@justsplitapp/ui'

export function ProfilePage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('profile.title', 'Profile')}
        </h1>
        <p className="text-gray-600">
          {t('profile.description', 'Manage your account settings')}
        </p>
      </div>

      <Card>
        <div className="p-6 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-2xl font-medium text-gray-600">JD</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.name', 'Name')}
              </label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.email', 'Email')}
              </label>
              <input
                type="email"
                defaultValue="john.doe@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('profile.currency', 'Default Currency')}
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="primary" className="w-full">
              {t('profile.saveChanges', 'Save Changes')}
            </Button>
            <Button variant="outline" className="w-full">
              {t('profile.changePassword', 'Change Password')}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('profile.preferences', 'Preferences')}
          </h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <span className="text-gray-700">{t('profile.notifications', 'Push Notifications')}</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">{t('profile.locationServices', 'Location Services')}</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-gray-700">{t('profile.darkMode', 'Dark Mode')}</span>
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
            </label>
          </div>
        </div>
      </Card>
    </div>
  )
}
