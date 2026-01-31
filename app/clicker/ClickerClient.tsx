'use client';

import { useState, useEffect } from 'react';
import { ClickButton } from '@/app/_components/ClickButton';
import styles from './clicker.module.css';

interface ClickerClientProps {
  userName: string;
}

interface EntityData {
  id?: number;
  count: number;
  modifiedTime?: Date | string;
}

export default function ClickerClient({ userName }: ClickerClientProps) {
  const [clickCount, setClickCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [ping, setPing] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState<Date | null>(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [monthlyStreak, setMonthlyStreak] = useState(0);
  const [yearlyStreak, setYearlyStreak] = useState(0);

  // Fetch initial data from server
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/clicker');
        if (response.ok) {
          const data = await response.json();
          setClickCount(data.click_count?.count || 0);
          setDailyStreak(data.streak_counter_day?.count || 0);
          setMonthlyStreak(data.streak_counter_month?.count || 0);
          setYearlyStreak(data.streak_counter_year?.count || 0);
          if (data.click_count?.modifiedTime) {
            setLastClickTime(new Date(data.click_count.modifiedTime));
          }
        }
      } catch (error) {
        console.error('Failed to fetch clicker data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleIncrement = async () => {
    if (!isRateLimited) {
      const start = performance.now();
      setIsRateLimited(true);
      
      try {
        const response = await fetch('/api/clicker/increment', {
          method: 'POST',
        });
        
        const end = performance.now();
        setPing(Math.round(end - start));

        if (response.ok) {
          const data = await response.json();
          setClickCount(data.click_count?.count || 0);
          setDailyStreak(data.streak_counter_day?.count || 0);
          setMonthlyStreak(data.streak_counter_month?.count || 0);
          setYearlyStreak(data.streak_counter_year?.count || 0);
          if (data.click_count?.modifiedTime) {
            setLastClickTime(new Date(data.click_count.modifiedTime));
          }
        } else {
          console.error('Failed to increment counter');
        }
      } catch (error) {
        console.error('Error incrementing counter:', error);
      } finally {
        // Rate limiting cooldown
        setTimeout(() => setIsRateLimited(false), 500);
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '1.5rem',
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Minimal Clicker</h1>
        <p>Hello, {userName}!</p>
      </header>

      <main className={styles.main}>
        <section className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>Clicks</div>
            <div className={styles.statValue}>
              {clickCount}
            </div>
          </div>
        </section>

        <div className={styles.clickArea}>
          <ClickButton 
            onClick={handleIncrement} 
            disabled={isRateLimited}
          >
            {isRateLimited ? 'Cooldown...' : 'Click!'}
          </ClickButton>
        </div>

        <section className={styles.metrics}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Ping</span>
            <span className={styles.metricValue}>{ping !== null ? `${ping}ms` : '--'}</span>
          </div>

          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Last Click</span>
            <span className={styles.metricValue}>
              {lastClickTime 
                ? lastClickTime.toLocaleTimeString() 
                : '--:--:--'}
            </span>
          </div>

          <div className={`${styles.metricItem} ${styles.streaksItem}`}>
            <span className={styles.metricLabel}>Streaks</span>
            <div className={styles.streaksRow}>
              <span className={`${styles.streakPill} ${dailyStreak >= 1 ? styles.active : styles.inactive}`} title="Daily Streak">
                D: <strong>{dailyStreak}</strong>
              </span>
              <span className={`${styles.streakPill} ${monthlyStreak >= 1 ? styles.active : styles.inactive}`} title="Monthly Streak">
                M: <strong>{monthlyStreak}</strong>
              </span>
              <span className={`${styles.streakPill} ${yearlyStreak >= 1 ? styles.active : styles.inactive}`} title="Yearly Streak">
                Y: <strong>{yearlyStreak}</strong>
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
