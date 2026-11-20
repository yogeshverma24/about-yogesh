// src/app/api/today/milestones/route.ts
import { NextResponse } from 'next/server';
import { getMilestones, updateMilestoneProgress } from '@/lib/today/db';

export async function GET() {
  try {
    const milestones = await getMilestones();
    return NextResponse.json({ success: true, milestones });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch milestones' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, progress } = body;
    if (!id || typeof progress !== 'number') {
      return NextResponse.json({ success: false, error: 'ID and progress are required' }, { status: 400 });
    }

    const updated = await updateMilestoneProgress(id, progress);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Milestone not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, milestone: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update milestone' },
      { status: 500 }
    );
  }
}

