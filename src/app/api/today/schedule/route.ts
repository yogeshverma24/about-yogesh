// src/app/api/today/schedule/route.ts
import { NextResponse } from 'next/server';
import { getDashboardState, updateFounderSchedule } from '@/lib/today/db';
import { MASTER_WEEKLY_SCHEDULE, PRODUCT_ROTATION_WEEKS } from '@/lib/today/scheduleData';

export async function GET() {
  try {
    const state = await getDashboardState();
    return NextResponse.json({
      success: true,
      masterSchedule: MASTER_WEEKLY_SCHEDULE,
      rotationWeeks: PRODUCT_ROTATION_WEEKS,
      founderChecklist: state.founderChecklist,
      activeRotationWeek: state.activeRotationWeek,
      weeklyHoursLogged: state.weeklyHoursLogged,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch schedule state' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const updated = await updateFounderSchedule(body);
    return NextResponse.json({ success: true, ...updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update founder schedule' },
      { status: 500 }
    );
  }
}

