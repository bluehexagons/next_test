import { auth } from '@/auth';
import { db } from '@/drizzle/db';
import { entities } from '@/drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
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

    // Fetch all entities for the user
    const clickEntity = await db.query.entities.findFirst({
      where: and(eq(entities.userId, user.id), eq(entities.kind, 'click_count')),
    });

    const streakDay = await db.query.entities.findFirst({
      where: and(eq(entities.userId, user.id), eq(entities.kind, 'streak_counter_day')),
    });

    const streakMonth = await db.query.entities.findFirst({
      where: and(eq(entities.userId, user.id), eq(entities.kind, 'streak_counter_month')),
    });

    const streakYear = await db.query.entities.findFirst({
      where: and(eq(entities.userId, user.id), eq(entities.kind, 'streak_counter_year')),
    });

    return NextResponse.json({
      click_count: clickEntity,
      streak_counter_day: streakDay,
      streak_counter_month: streakMonth,
      streak_counter_year: streakYear,
    });
  } catch (error) {
    console.error('Error fetching entities:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
