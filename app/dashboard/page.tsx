import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
import Button from '@/app/_components/Button';
import styles from './dashboard.module.css';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </div>

        <div className={styles.welcomeCard}>
          <h2 className={styles.welcomeTitle}>Welcome!</h2>
          <div className={styles.userInfo}>
            <p>
              <span className={styles.label}>Email:</span> {session.user.email}
            </p>
            {session.user.name && (
              <p>
                <span className={styles.label}>Name:</span> {session.user.name}
              </p>
            )}
            <p className={styles.description}>
              This is a protected page. Only authenticated users can access it.
            </p>
          </div>
        </div>

        <div className={styles.nextStepsCard}>
          <h3 className={styles.nextStepsTitle}>What&apos;s next?</h3>
          <ul className={styles.nextStepsList}>
            <li>
              <a href="/clicker" style={{ color: 'var(--primary-color, #9a43ff)', textDecoration: 'none' }}>
                Try the Minimal Clicker game
              </a>
            </li>
            <li>Add more protected routes under /dashboard</li>
            <li>Create user profile management</li>
            <li>Add role-based access control</li>
            <li>Implement password reset functionality</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
