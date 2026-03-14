import React from 'react'
import { useTranslation } from 'react-i18next'

const SplitPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="split-page">
      <h1>{t('split.title')}</h1>
      <form className="split-form">
        <div className="form-group">
          <label htmlFor="amount">{t('split.amount')}</label>
          <input type="number" id="amount" placeholder="0.00" />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">{t('split.description')}</label>
          <input type="text" id="description" placeholder={t('split.description')} />
        </div>
        
        <div className="form-group">
          <label>{t('split.participants')}</label>
          <div className="participants-list">
            <input type="text" placeholder="Add participant" />
            <button type="button">{t('split.addParticipant')}</button>
          </div>
        </div>
        
        <div className="split-options">
          <button type="button">{t('split.splitEqually')}</button>
          <button type="button">{t('split.splitByAmount')}</button>
        </div>
        
        <div className="summary">
          <p>{t('split.total')}: $0.00</p>
          <p>{t('split.perPerson')}: $0.00</p>
        </div>
        
        <button type="submit" className="submit-button">
          {t('split.settleUp')}
        </button>
      </form>
    </div>
  )
}

export default SplitPage
