'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ClickButton } from '@/app/_components/ClickButton';
import styles from './clicker.module.css';

export default function ClickerGame() {
  const [clickCount, setClickCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clickCount');
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [ping, setPing] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState<Date | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lastClickTime');
      return saved ? new Date(saved) : null;
    }
    return null;
  });
  const [dailyStreak, setDailyStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dailyStreak');
      const savedLastUpdate = localStorage.getItem('lastStreakUpdate');
      const baseStreak = saved ? parseInt(saved, 10) : 0;
      
      if (savedLastUpdate) {
        const lastUpdate = new Date(savedLastUpdate);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 1) {
          const newStreak = baseStreak + 1;
          localStorage.setItem('dailyStreak', String(newStreak));
          localStorage.setItem('lastStreakUpdate', now.toISOString());
          return newStreak;
        }
      }
      return baseStreak;
    }
    return 0;
  });
  const [monthlyStreak, setMonthlyStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('monthlyStreak');
      const savedLastUpdate = localStorage.getItem('lastStreakUpdate');
      const baseStreak = saved ? parseInt(saved, 10) : 0;
      
      if (savedLastUpdate) {
        const lastUpdate = new Date(savedLastUpdate);
        const now = new Date();
        const monthsDiff = (now.getFullYear() - lastUpdate.getFullYear()) * 12 + (now.getMonth() - lastUpdate.getMonth());
        
        if (monthsDiff >= 1) {
          const newStreak = baseStreak + 1;
          localStorage.setItem('monthlyStreak', String(newStreak));
          localStorage.setItem('lastStreakUpdate', now.toISOString());
          return newStreak;
        }
      }
      return baseStreak;
    }
    return 0;
  });
  const [yearlyStreak, setYearlyStreak] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('yearlyStreak');
      const savedLastUpdate = localStorage.getItem('lastStreakUpdate');
      const baseStreak = saved ? parseInt(saved, 10) : 0;
      
      if (savedLastUpdate) {
        const lastUpdate = new Date(savedLastUpdate);
        const now = new Date();
        const yearsDiff = now.getFullYear() - lastUpdate.getFullYear();
        
        if (yearsDiff >= 1) {
          const newStreak = baseStreak + 1;
          localStorage.setItem('yearlyStreak', String(newStreak));
          localStorage.setItem('lastStreakUpdate', now.toISOString());
          return newStreak;
        }
      }
      return baseStreak;
    }
    return 0;
  });

  // Update streaks when clicking
  // Note: This is a simplified streak system that increments based on time elapsed
  // A more robust implementation would reset streaks if periods are skipped
  const updateStreaks = () => {
    const now = new Date();
    const lastUpdate = localStorage.getItem('lastStreakUpdate');
    
    if (!lastUpdate) {
      // First click ever
      setDailyStreak(1);
      setMonthlyStreak(1);
      setYearlyStreak(1);
      localStorage.setItem('dailyStreak', '1');
      localStorage.setItem('monthlyStreak', '1');
      localStorage.setItem('yearlyStreak', '1');
      localStorage.setItem('lastStreakUpdate', now.toISOString());
    } else {
      const lastUpdateDate = new Date(lastUpdate);
      const daysDiff = Math.floor((now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24));
      const monthsDiff = (now.getFullYear() - lastUpdateDate.getFullYear()) * 12 + (now.getMonth() - lastUpdateDate.getMonth());
      const yearsDiff = now.getFullYear() - lastUpdateDate.getFullYear();

      // Only update lastStreakUpdate if we're incrementing at least one streak
      let shouldUpdateTimestamp = false;

      if (daysDiff >= 1) {
        const newDailyStreak = dailyStreak + 1;
        setDailyStreak(newDailyStreak);
        localStorage.setItem('dailyStreak', String(newDailyStreak));
        shouldUpdateTimestamp = true;
      }
      if (monthsDiff >= 1) {
        const newMonthlyStreak = monthlyStreak + 1;
        setMonthlyStreak(newMonthlyStreak);
        localStorage.setItem('monthlyStreak', String(newMonthlyStreak));
        shouldUpdateTimestamp = true;
      }
      if (yearsDiff >= 1) {
        const newYearlyStreak = yearlyStreak + 1;
        setYearlyStreak(newYearlyStreak);
        localStorage.setItem('yearlyStreak', String(newYearlyStreak));
        shouldUpdateTimestamp = true;
      }
      
      // Only update the timestamp if we incremented a streak
      if (shouldUpdateTimestamp) {
        localStorage.setItem('lastStreakUpdate', now.toISOString());
      }
    }
  };

  const handleIncrement = () => {
    if (!isRateLimited) {
      const start = performance.now();
      
      // Simulate a small delay to show "ping"
      setTimeout(() => {
        const end = performance.now();
        setPing(Math.round(end - start));
        
        const newCount = clickCount + 1;
        setClickCount(newCount);
        
        const now = new Date();
        setLastClickTime(now);
        
        // Save to localStorage
        localStorage.setItem('clickCount', String(newCount));
        localStorage.setItem('lastClickTime', now.toISOString());
        
        // Update streaks
        updateStreaks();
        
        // Rate limiting (cooldown)
        setIsRateLimited(true);
        setTimeout(() => setIsRateLimited(false), 500);
      }, Math.random() * 20 + 10); // Random delay between 10-30ms
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.backLinkContainer}>
        <Link href="/" className={styles.backLink}>
          &larr; Home
        </Link>
      </nav>
      
      <header className={styles.header}>
        <h1>Minimal Clicker</h1>
        <p>Click the button to increase your score!</p>
      </header>

      <main className={styles.main} suppressHydrationWarning>
        <section className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.statLabel}>Clicks</div>
            <div className={styles.statValue} suppressHydrationWarning>
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
            <span className={styles.metricValue} suppressHydrationWarning>
              {lastClickTime 
                ? lastClickTime.toLocaleTimeString() 
                : '--:--:--'}
            </span>
          </div>

          <div className={`${styles.metricItem} ${styles.streaksItem}`}>
            <span className={styles.metricLabel}>Streaks</span>
            <div className={styles.streaksRow} suppressHydrationWarning>
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
