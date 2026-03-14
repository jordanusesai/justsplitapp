import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function HomeScreen() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={() => router.push('/split')}
      >
        <Text style={styles.ctaButtonText}>{t('home.newSplit')}</Text>
      </TouchableOpacity>
      
      <View style={styles.recentSplits}>
        <Text style={styles.sectionTitle}>{t('home.recentSplits')}</Text>
        <Text style={styles.emptyText}>{t('home.noSplits')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  recentSplits: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  emptyText: {
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
})
