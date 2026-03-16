import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = React.useState(true);
  const [location, setLocation] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>{t('common.edit', 'Edit Profile')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.preferences', 'Preferences')}</Text>
          <Card>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={22} color="#4B5563" />
                <Text style={styles.settingLabel}>{t('profile.notifications', 'Push Notifications')}</Text>
              </View>
              <Switch 
                value={notifications} 
                onValueChange={setNotifications}
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={notifications ? '#2563EB' : '#F3F4F6'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="location-outline" size={22} color="#4B5563" />
                <Text style={styles.settingLabel}>{t('profile.locationServices', 'Location Services')}</Text>
              </View>
              <Switch 
                value={location} 
                onValueChange={setLocation}
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={location ? '#2563EB' : '#F3F4F6'}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon-outline" size={22} color="#4B5563" />
                <Text style={styles.settingLabel}>{t('profile.darkMode', 'Dark Mode')}</Text>
              </View>
              <Switch 
                value={darkMode} 
                onValueChange={setDarkMode}
                trackColor={{ false: '#D1D5DB', true: '#BFDBFE' }}
                thumbColor={darkMode ? '#2563EB' : '#F3F4F6'}
              />
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.account', 'Account')}</Text>
          <Card>
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="cash-outline" size={22} color="#4B5563" />
                <Text style={styles.settingLabel}>{t('profile.currency', 'Default Currency')}</Text>
              </View>
              <View style={styles.settingValue}>
                <Text style={styles.valueText}>USD</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="lock-closed-outline" size={22} color="#4B5563" />
                <Text style={styles.settingLabel}>{t('profile.changePassword', 'Change Password')}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          </Card>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>{t('profile.logout', 'Log Out')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Simple internal Card component for mobile consistency
function Card({ children }: { children: React.ReactNode }) {
  return <View style={styles.card}>{children}</View>;
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
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    minHeight: 56,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#111827',
  },
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueText: {
    fontSize: 16,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 50,
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
