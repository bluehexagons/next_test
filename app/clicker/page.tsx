import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ClickerClient from './ClickerClient';

export default async function ClickerPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login?callbackUrl=/clicker');
  }

  return (
    <div>
      <nav style={{ 
        position: 'absolute', 
        top: '1rem', 
        left: '1rem',
        zIndex: 10 
      }}>
        <Link 
          href="/" 
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
          }}
        >
          &larr; Home
        </Link>
      </nav>
      <ClickerClient userEmail={session.user.email!} userName={session.user.name || session.user.email!} />
    </div>
  );
}
