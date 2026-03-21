import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input } from '@justsplitapp/ui';
import { trackEvent } from '@justsplitapp/utils';

export function LoginPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    trackEvent('login_attempt', { email });

    try {
      // Mock API call to send magic link
      // await fetch(`${import.meta.env.VITE_API_URL}/api/auth/magic-link`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      setTimeout(() => {
        setIsSent(true);
        setIsLoading(false);
        trackEvent('login_sent', { email });
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      trackEvent('login_error', { email });
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-4xl font-black text-blue-600 tracking-tight">JustSplit</h1>
        
        <Card className="p-8 space-y-6">
          {!isSent ? (
            <>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('auth.loginTitle', 'Welcome back')}
                </h2>
                <p className="text-gray-500">
                  {t('auth.loginSubtitle', 'Enter your email to receive a magic link')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={t('auth.emailLabel', 'Email Address')}
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-lg"
                  loading={isLoading}
                >
                  {t('auth.sendLink', 'Send Magic Link')}
                </Button>
              </form>
            </>
          ) : (
            <div className="py-4 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                ✉️
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t('auth.sentTitle', 'Check your email')}
                </h2>
                <p className="text-gray-500">
                  {t('auth.sentSubtitle', 'We sent a login link to')} <span className="font-bold text-gray-900">{email}</span>
                </p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSent(false)}
              >
                {t('auth.tryAgain', 'Use a different email')}
              </Button>
            </div>
          )}
        </Card>

        <p className="text-sm text-gray-500">
          {t('auth.noPassword', 'No password needed. Simple and secure.')}
        </p>
      </div>
    </div>
  );
}
