'use client';

import { useState } from 'react';
import { loginUser } from '@/app/actions/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import styles from './login.module.css';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    const result = await loginUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h2 className={styles.header}>Sign in</h2>
          <p className={styles.subtitle}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className={styles.link}>
              Register
            </Link>
          </p>
        </div>

        <form action={handleSubmit} className={styles.form}>
          {registered && (
            <div className={styles.successMessage}>
              Account created successfully! Please sign in.
            </div>
          )}

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formFields}>
            <Input
              name="email"
              type="email"
              label="Email address"
              placeholder="you@example.com"
              required
            />

            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
