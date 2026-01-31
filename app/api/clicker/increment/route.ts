import { auth } from '@/auth';
import { db } from '@/drizzle/db';
import { entities } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

// Helper to update or create an entity
async function upsertEntity(userId: number, kind: string, count: number) {
  const now = new Date();
  
  const existing = await db.query.entities.findFirst({
    where: and(eq(entities.userId, userId), eq(entities.kind, kind)),
  });

  if (existing) {
    await db
      .update(entities)
      .set({ 
        count, 
        modifiedTime: now,
        updatedAt: now,
      })
      .where(eq(entities.id, existing.id));
    
    return { ...existing, count, modifiedTime: now, updatedAt: now };
  } else {
    const [newEntity] = await db
      .insert(entities)
      .values({
        userId,
        kind,
        count,
        createdTime: now,
        modifiedTime: now,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    
    return newEntity;
  }
}

// Helper to update streak
async function updateStreak(
  userId: number,
  kind: string,
  lastModified: Date | null
): Promise<any> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  let shouldIncrement = false;
  let shouldReset = false;

  if (!lastModified) {
    // First time clicking
    return await upsertEntity(userId, kind, 1);
  }

  const lastDate = new Date(lastModified.getFullYear(), lastModified.getMonth(), lastModified.getDate());

  if (kind === 'streak_counter_day') {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastDate.getTime() === yesterday.getTime()) {
      shouldIncrement = true;
    } else if (lastDate.getTime() !== today.getTime()) {
      shouldReset = true;
    }
  } else if (kind === 'streak_counter_month') {
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(lastDate.getFullYear(), lastDate.getMonth(), 1);
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    
    if (lastMonth.getTime() === previousMonth.getTime()) {
      shouldIncrement = true;
    } else if (lastMonth.getTime() !== currentMonth.getTime()) {
      shouldReset = true;
    }
  } else if (kind === 'streak_counter_year') {
    const currentYear = new Date(today.getFullYear(), 0, 1);
    const lastYear = new Date(lastDate.getFullYear(), 0, 1);
    const previousYear = new Date(currentYear);
    previousYear.setFullYear(previousYear.getFullYear() - 1);
    
    if (lastYear.getTime() === previousYear.getTime()) {
      shouldIncrement = true;
    } else if (lastYear.getTime() !== currentYear.getTime()) {
      shouldReset = true;
    }
  }

  const existing = await db.query.entities.findFirst({
    where: and(eq(entities.userId, userId), eq(entities.kind, kind)),
  });

  const currentCount = existing?.count || 0;
  const newCount = shouldIncrement ? currentCount + 1 : shouldReset ? 1 : currentCount;

  return await upsertEntity(userId, kind, newCount);
}

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user by email to get the ID
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, session.user.email!),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get current click count
    const clickEntity = await db.query.entities.findFirst({
      where: and(eq(entities.userId, user.id), eq(entities.kind, 'click_count')),
    });

    const lastModified = clickEntity?.modifiedTime || null;
    const currentCount = clickEntity?.count || 0;

    // Increment click count
    const updatedClick = await upsertEntity(user.id, 'click_count', currentCount + 1);

    // Update streaks
    const streakDay = await updateStreak(user.id, 'streak_counter_day', lastModified);
    const streakMonth = await updateStreak(user.id, 'streak_counter_month', lastModified);
    const streakYear = await updateStreak(user.id, 'streak_counter_year', lastModified);

    return NextResponse.json({
      click_count: updatedClick,
      streak_counter_day: streakDay,
      streak_counter_month: streakMonth,
      streak_counter_year: streakYear,
    });
  } catch (error) {
    console.error('Error incrementing counter:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
