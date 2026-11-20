// src/app/api/today/profile/route.ts
import { NextResponse } from 'next/server';
import { getDashboardState, updateProfile } from '@/lib/today/db';

export async function GET() {
  try {
    const state = await getDashboardState();
    return NextResponse.json({ success: true, profile: state.profile });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const updates = await req.json();
    const updated = await updateProfile(updates);
    return NextResponse.json({ success: true, profile: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}

