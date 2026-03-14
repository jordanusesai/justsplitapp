import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HomePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="home-page">
      <header className="hero">
        <h1>{t('home.title')}</h1>
        <p>{t('home.subtitle')}</p>
        <Link to="/split" className="cta-button">
          {t('home.newSplit')}
        </Link>
      </header>
      
      <section className="recent-splits">
        <h2>{t('home.recentSplits')}</h2>
        <p>{t('home.noSplits')}</p>
      </section>
    </div>
  )
}

export default HomePage
