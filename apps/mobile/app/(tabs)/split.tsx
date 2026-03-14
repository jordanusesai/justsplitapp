import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'

export default function SplitScreen() {
  const { t } = useTranslation()
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [participants, setParticipants] = useState<string[]>([])
  const [newParticipant, setNewParticipant] = useState('')

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([...participants, newParticipant.trim()])
      setNewParticipant('')
    }
  }

  const total = parseFloat(amount) || 0
  const perPerson = participants.length > 0 ? total / participants.length : 0

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('split.amount')}</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('split.description')}</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder={t('split.description')}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>{t('split.participants')}</Text>
          <View style={styles.participantInput}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={newParticipant}
              onChangeText={setNewParticipant}
              placeholder="Add participant"
            />
            <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          {participants.map((participant, index) => (
            <View key={index} style={styles.participantItem}>
              <Text>{participant}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.summary}>
          <Text style={styles.summaryText}>{t('split.total')}: ${total.toFixed(2)}</Text>
          <Text style={styles.summaryText}>{t('split.perPerson')}: ${perPerson.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>{t('split.settleUp')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  form: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  participantInput: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  participantItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  summary: {
    backgroundColor: '#f0f8ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})
