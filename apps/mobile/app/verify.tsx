import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button } from '@justsplitapp/ui';
import { trackEvent, reportError } from '@justsplitapp/utils';

export default function VerifyScreen() {
  const { t } = useTranslation();
  const { token } = useLocalSearchParams<{ token: string }>();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      trackEvent('verify_attempt_mobile', { token: token.substring(0, 8) });
      try {
        // Mock verification
        setTimeout(() => {
          setStatus('success');
          trackEvent('verify_success_mobile');
          // Simulate saving session and navigating
          setTimeout(() => router.replace('/(tabs)'), 2000);
        }, 2000);
      } catch (error) {
        setStatus('error');
        reportError(error instanceof Error ? error : new Error(String(error)), { context: 'verify_token_mobile' });
        trackEvent('verify_failed_mobile');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <Card style={styles.card}>
          {status === 'loading' && (
            <View style={styles.stateContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.title}>{t('auth.verifyingTitle', 'Verifying your link...')}</Text>
              <Text style={styles.subtitle}>{t('auth.verifyingSubtitle', 'Please wait while we sign you in.')}</Text>
            </View>
          )}

          {status === 'success' && (
            <View style={styles.stateContainer}>
              <Text style={styles.icon}>✅</Text>
              <Text style={styles.title}>{t('auth.successTitle', 'Successfully signed in!')}</Text>
              <Text style={styles.subtitle}>{t('auth.successSubtitle', 'Redirecting you...')}</Text>
            </View>
          )}

          {status === 'error' && (
            <View style={styles.stateContainer}>
              <Text style={styles.icon}>❌</Text>
              <Text style={styles.title}>{t('auth.errorTitle', 'Invalid link')}</Text>
              <Text style={styles.subtitle}>{t('auth.errorSubtitle', 'Please request a new magic link.')}</Text>
              <Button
                style={styles.button}
                onPress={() => router.replace('/login')}
              >
                {t('auth.backToLogin', 'Back to Login')}
              </Button>
            </View>
          )}
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  card: {
    padding: 32,
    alignItems: 'center',
  },
  stateContainer: {
    alignItems: 'center',
    gap: 16,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    width: '100%',
  },
});
