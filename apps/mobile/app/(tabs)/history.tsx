import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityScreen() {
  const { t } = useTranslation();

  const mockActivities = [
    {
      id: '1',
      type: 'expense',
      title: 'Dinner at Italian Restaurant',
      amount: 85.50,
      date: '2024-03-14',
      status: 'pending',
    },
    {
      id: '2',
      type: 'payment',
      title: 'John settled lunch split',
      amount: 25.00,
      date: '2024-03-14',
      status: 'completed',
    },
    {
      id: '3',
      type: 'expense',
      title: 'Uber ride to airport',
      amount: 45.00,
      date: '2024-03-13',
      status: 'settled',
    },
  ];

  const renderItem = ({ item }: { item: typeof mockActivities[0] }) => (
    <View style={styles.activityCard}>
      <View style={styles.activityInfo}>
        <View style={styles.iconContainer}>
          <Ionicons 
            name={item.type === 'expense' ? 'receipt-outline' : 'cash-outline'} 
            size={24} 
            color="#2563EB" 
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityDate}>{new Date(item.date).toLocaleDateString()}</Text>
        </View>
      </View>
      <View style={styles.activityMeta}>
        <Text style={styles.activityAmount}>${item.amount.toFixed(2)}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'completed' ? '#DCFCE7' : item.status === 'pending' ? '#FEF3C7' : '#F3F4F6' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: item.status === 'completed' ? '#166534' : item.status === 'pending' ? '#92400E' : '#374151' }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('activity.title', 'Activity')}</Text>
      </View>
      <FlatList
        data={mockActivities}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="notifications-off-outline" size={64} color="#D1D5DB" />
            <Text style={styles.emptyText}>{t('activity.description', 'No recent activity')}</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  activityMeta: {
    alignItems: 'flex-end',
  },
  activityAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
});
