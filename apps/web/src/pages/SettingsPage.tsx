import React from 'react'
import { useTranslation } from 'react-i18next'

const SettingsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="settings-page">
      <h1>{t('settings.title')}</h1>
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="language">{t('settings.language')}</label>
          <select id="language">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="currency">{t('settings.currency')}</label>
          <select id="currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>{t('settings.theme')}</label>
          <div className="theme-options">
            <label>
              <input type="radio" name="theme" value="light" />
              {t('settings.lightMode')}
            </label>
            <label>
              <input type="radio" name="theme" value="dark" />
              {t('settings.darkMode')}
            </label>
          </div>
        </div>
        
        <button type="submit" className="save-button">
          {t('common.save')}
        </button>
      </form>
    </div>
  )
}

export default SettingsPage
