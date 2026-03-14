import React from 'react'
import { useTranslation } from 'react-i18next'

const HistoryPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="history-page">
      <h1>{t('history.title')}</h1>
      <div className="history-list">
        <p>{t('history.noHistory')}</p>
      </div>
    </div>
  )
}

export default HistoryPage
