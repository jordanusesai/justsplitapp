import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation()
  const location = useLocation()

  const navigation = [
    { name: t('nav.home', 'Home'), href: '/', icon: '🏠' },
    { name: t('nav.add', 'Add'), href: '/add', icon: '➕' },
    { name: t('nav.groups', 'Groups'), href: '/groups', icon: '👥' },
    { name: t('nav.activity', 'Activity'), href: '/activity', icon: '📊' },
    { name: t('nav.profile', 'Profile'), href: '/profile', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">JustSplit</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                location.pathname === item.href
                  ? 'text-blue-600'
                  : 'text-gray-500'
              } flex flex-col items-center py-2 px-1 text-xs`}
            >
              <span className="text-lg mb-1">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Layout
