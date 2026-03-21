import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, LoadingSpinner, Button } from '@justsplitapp/ui';
import { trackEvent, reportError } from '@justsplitapp/utils';

export function VerifyPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    const verifyToken = async () => {
      trackEvent('verify_attempt', { token: token.substring(0, 8) });
      try {
        // Mock API verification
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify?token=${token}`);
        // if (!response.ok) throw new Error('Verification failed');
        
        setTimeout(() => {
          setStatus('success');
          trackEvent('verify_success');
          // In a real app, save token to local storage/Zustand
          setTimeout(() => navigate('/'), 2000);
        }, 2000);
      } catch (error) {
        setStatus('error');
        reportError(error instanceof Error ? error : new Error(String(error)), { context: 'verify_token' });
        trackEvent('verify_failed');
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        {status === 'loading' && (
          <div className="py-8 space-y-4">
            <LoadingSpinner size="lg" />
            <h2 className="text-xl font-bold text-gray-900">
              {t('auth.verifyingTitle', 'Verifying your link...')}
            </h2>
            <p className="text-gray-500">
              {t('auth.verifyingSubtitle', 'Please wait while we sign you in.')}
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✅
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {t('auth.successTitle', 'Successfully signed in!')}
            </h2>
            <p className="text-gray-500">
              {t('auth.successSubtitle', 'Redirecting you to the home page...')}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-8 space-y-4">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              ❌
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {t('auth.errorTitle', 'Invalid or expired link')}
            </h2>
            <p className="text-gray-500">
              {t('auth.errorSubtitle', 'Please request a new magic link to sign in.')}
            </p>
            <Button
              className="w-full"
              onClick={() => navigate('/login')}
            >
              {t('auth.backToLogin', 'Back to Login')}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
