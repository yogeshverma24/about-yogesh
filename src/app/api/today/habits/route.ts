// src/app/api/today/habits/route.ts
import { NextResponse } from 'next/server';
import { getHabits, toggleHabit, createHabit } from '@/lib/today/db';

export async function GET() {
  try {
    const habits = await getHabits();
    return NextResponse.json({ success: true, habits });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch habits' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newHabit = await createHabit(body);
    return NextResponse.json({ success: true, habit: newHabit });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create habit' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, date } = body;
    const targetDate = date || new Date().toISOString().split('T')[0];

    const updated = await toggleHabit(id, targetDate);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Habit not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, habit: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to toggle habit' },
      { status: 500 }
    );
  }
}

