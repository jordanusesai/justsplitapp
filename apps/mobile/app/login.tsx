import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Input } from '@justsplitapp/ui';
import { trackEvent } from '@justsplitapp/utils';
import { Stack, useRouter } from 'expo-router';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    trackEvent('login_attempt_mobile', { email });

    try {
      // Mock API call
      setTimeout(() => {
        setIsSent(true);
        setIsLoading(false);
        trackEvent('login_sent_mobile', { email });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send magic link');
      trackEvent('login_error_mobile', { email });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.content}>
          <Text style={styles.logo}>JustSplit</Text>
          
          <Card style={styles.card}>
            {!isSent ? (
              <>
                <View style={styles.header}>
                  <Text style={styles.title}>{t('auth.loginTitle', 'Welcome back')}</Text>
                  <Text style={styles.subtitle}>{t('auth.loginSubtitle', 'Enter your email to receive a magic link')}</Text>
                </View>

                <View style={styles.form}>
                  <Text style={styles.label}>{t('auth.emailLabel', 'Email Address')}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="name@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <Button
                    onPress={handleSubmit}
                    loading={isLoading}
                    style={styles.button}
                  >
                    {t('auth.sendLink', 'Send Magic Link')}
                  </Button>
                </View>
              </>
            ) : (
              <View style={styles.sentContainer}>
                <Text style={styles.sentIcon}>✉️</Text>
                <Text style={styles.title}>{t('auth.sentTitle', 'Check your email')}</Text>
                <Text style={styles.sentSubtitle}>
                  {t('auth.sentSubtitle', 'We sent a login link to')}{' '}
                  <Text style={styles.bold}>{email}</Text>
                </Text>
                <Button
                  variant="outline"
                  onPress={() => setIsSent(false)}
                  style={styles.button}
                >
                  {t('auth.tryAgain', 'Use a different email')}
                </Button>
              </View>
            )}
          </Card>

          <Text style={styles.footer}>
            {t('auth.noPassword', 'No password needed. Simple and secure.')}
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2563EB',
    marginBottom: 40,
    letterSpacing: -1,
  },
  card: {
    width: '100%',
    padding: 24,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 48,
  },
  button: {
    marginTop: 8,
  },
  sentContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  sentIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  sentSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  bold: {
    fontWeight: 'bold',
    color: '#111827',
  },
  footer: {
    marginTop: 32,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
