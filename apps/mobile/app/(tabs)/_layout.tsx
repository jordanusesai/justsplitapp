import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function TabLayout() {
  const { t } = useTranslation()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('common.home'),
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="split"
        options={{
          title: t('common.split'),
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>💰</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t('common.history'),
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>📋</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('common.settings'),
          tabBarIcon: ({ color }) => (
            <Text style={{ color }}>⚙️</Text>
          ),
        }}
      />
    </Tabs>
  )
}
