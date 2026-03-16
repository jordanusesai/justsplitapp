import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [locationConsent, setLocationConsent] = useState<boolean | null>(null);

  const mockBalances = {
    total: 120.50,
    youOwe: 45.00,
    youAreOwed: 165.50
  };

  const mockPlaces = [
    { name: 'Blue Bottle Coffee', address: '123 Market St', category: 'Coffee Shop', distance: '150m' },
    { name: 'Whole Foods Market', address: '200 4th St', category: 'Grocery Store', distance: '450m' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>JustSplit</Text>
        </View>

        {/* Balance Cards */}
        <View style={styles.balanceGrid}>
          <View style={[styles.balanceCard, { borderTopColor: '#2563EB' }]}>
            <Text style={styles.balanceLabel}>{t('home.totalBalance')}</Text>
            <Text style={[styles.balanceAmount, { color: '#16A34A' }]}>${mockBalances.total.toFixed(2)}</Text>
          </View>
          <View style={styles.balanceRow}>
            <View style={[styles.balanceCard, { flex: 1, borderTopColor: '#DC2626' }]}>
              <Text style={styles.balanceLabel}>{t('home.youOwe')}</Text>
              <Text style={[styles.balanceAmount, { color: '#DC2626', fontSize: 20 }]}>${mockBalances.youOwe.toFixed(2)}</Text>
            </View>
            <View style={[styles.balanceCard, { flex: 1, marginLeft: 10, borderTopColor: '#16A34A' }]}>
              <Text style={styles.balanceLabel}>{t('home.youAreOwed')}</Text>
              <Text style={[styles.balanceAmount, { color: '#16A34A', fontSize: 20 }]}>${mockBalances.youAreOwed.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>{t('home.addExpense')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>{t('home.settleUp')}</Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.recommendationsTitle')}</Text>
          </View>

          {locationConsent === null && (
            <View style={styles.consentCard}>
              <Text style={styles.consentTitle}>{t('home.locationConsentTitle')}</Text>
              <Text style={styles.consentText}>{t('home.locationConsentText')}</Text>
              <View style={styles.consentActions}>
                <TouchableOpacity onPress={() => setLocationConsent(false)} style={styles.textButton}>
                  <Text style={styles.textButtonLabel}>{t('home.notNow')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setLocationConsent(true)} style={styles.smallPrimaryButton}>
                  <Text style={styles.primaryButtonText}>{t('home.enableLocation')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {locationConsent === true && (
            <View style={styles.placesList}>
              {mockPlaces.map((place, idx) => (
                <View key={idx} style={styles.placeCard}>
                  <View style={styles.placeInfo}>
                    <Text style={styles.placeName}>{place.name}</Text>
                    <Text style={styles.placeCategory}>{place.category}</Text>
                    <Text style={styles.placeAddress}>{place.address} • {place.distance}</Text>
                  </View>
                  <TouchableOpacity style={styles.attachButton}>
                    <Text style={styles.attachButtonText}>Attach</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Activity Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('home.recentActivity')}</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{t('home.noExpenses')}</Text>
          </View>
        </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  balanceGrid: {
    gap: 10,
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderTopWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceRow: {
    flexDirection: 'row',
    gap: 10,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#374151',
    fontWeight: 'bold',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  consentCard: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  consentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 4,
  },
  consentText: {
    fontSize: 14,
    color: '#1E40AF',
    marginBottom: 16,
    lineHeight: 20,
  },
  consentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  textButton: {
    padding: 8,
  },
  textButtonLabel: {
    color: '#1E40AF',
    fontSize: 14,
    fontWeight: '600',
  },
  smallPrimaryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  placesList: {
    gap: 12,
  },
  placeCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  placeInfo: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  placeCategory: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },
  placeAddress: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  attachButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  attachButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 12,
    marginTop: 12,
  },
  emptyStateText: {
    color: '#6B7280',
    textAlign: 'center',
  }
});
