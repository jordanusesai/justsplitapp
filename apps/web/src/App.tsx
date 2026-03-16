import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { AddPage } from './pages/AddPage'
import { GroupsPage } from './pages/GroupsPage'
import { ActivityPage } from './pages/ActivityPage'
import { ProfilePage } from './pages/ProfilePage'

import { ChatPage } from './pages/ChatPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
