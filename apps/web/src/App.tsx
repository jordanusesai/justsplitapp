import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFeatureFlags } from './hooks/useFeatureFlags'
import HomePage from './pages/HomePage'
import SplitPage from './pages/SplitPage'
import HistoryPage from './pages/HistoryPage'
import SettingsPage from './pages/SettingsPage'
import Layout from './components/Layout'

function App() {
  const { t } = useTranslation()
  const { flags } = useFeatureFlags()

  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/split" element={<SplitPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
