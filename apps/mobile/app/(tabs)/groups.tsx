import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function GroupsScreen() {
  const { t } = useTranslation();

  const mockGroups = [
    { id: '1', name: 'Roommates', members: 4, totalExpenses: 1250.50, color: '#3B82F6' },
    { id: '2', name: 'Trip to Paris', members: 6, totalExpenses: 3400.00, color: '#10B981' },
    { id: '3', name: 'Office Lunch', members: 8, totalExpenses: 320.75, color: '#F59E0B' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('groups.title', 'Groups')}</Text>
          <TouchableOpacity style={styles.addButton} accessibilityLabel="Add new group">
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.groupsList}>
          {mockGroups.map((group) => (
            <TouchableOpacity key={group.id} style={styles.groupCard} accessibilityRole="button">
              <View style={[styles.groupIcon, { backgroundColor: group.color }]}>
                <Text style={styles.groupIconText}>{group.name.charAt(0)}</Text>
              </View>
              <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{group.members} members</Text>
              </View>
              <View style={styles.groupBalance}>
                <Text style={styles.balanceLabel}>Total</Text>
                <Text style={styles.balanceAmount}>${group.totalExpenses.toFixed(2)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.createButton} accessibilityRole="button">
          <Text style={styles.createButtonText}>{t('groups.createGroup', 'Create New Group')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupsList: {
    gap: 12,
    marginBottom: 32,
  },
  groupCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  groupIconText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  groupMembers: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  groupBalance: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  balanceLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  createButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  createButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
