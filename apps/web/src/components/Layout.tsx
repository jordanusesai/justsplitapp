import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="layout">
      <nav className="navigation">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
          {t('common.home')}
        </Link>
        <Link to="/split" className={`nav-link ${isActive('/split') ? 'active' : ''}`}>
          {t('common.split')}
        </Link>
        <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
          {t('common.history')}
        </Link>
        <Link to="/settings" className={`nav-link ${isActive('/settings') ? 'active' : ''}`}>
          {t('common.settings')}
        </Link>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout
