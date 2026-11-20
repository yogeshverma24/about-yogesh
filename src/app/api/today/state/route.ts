// src/app/api/today/state/route.ts
import { NextResponse } from 'next/server';
import { getDashboardState } from '@/lib/today/db';

export async function GET() {
  try {
    const state = await getDashboardState();
    return NextResponse.json({ success: true, state });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch dashboard state' },
      { status: 500 }
    );
  }
}

