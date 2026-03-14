import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function SettingsScreen() {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.language')}</Text>
        <TouchableOpacity style={styles.option}>
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Español</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>Français</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.currency')}</Text>
        <TouchableOpacity style={styles.option}>
          <Text>USD</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>EUR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>GBP</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('settings.theme')}</Text>
        <TouchableOpacity style={styles.option}>
          <Text>{t('settings.lightMode')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text>{t('settings.darkMode')}</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  option: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
})
