'use client';

import { useState } from 'react';
import { registerUser } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Input from '@/app/_components/Input';
import Button from '@/app/_components/Button';
import styles from './register.module.css';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError('');

    const result = await registerUser(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/auth/login?registered=true');
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <h2 className={styles.header}>Create an account</h2>
          <p className={styles.subtitle}>
            Already have an account?{' '}
            <Link href="/auth/login" className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>

        <form action={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.formFields}>
            <Input
              name="name"
              type="text"
              label="Name (optional)"
              placeholder="John Doe"
            />

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
              helpText="Must be at least 6 characters"
              minLength={6}
              required
            />
          </div>

          <Button type="submit" disabled={loading} fullWidth>
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  );
}
