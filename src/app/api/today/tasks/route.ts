// src/app/api/today/tasks/route.ts
import { NextResponse } from 'next/server';
import { getTasks, createTask } from '@/lib/today/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('mode') || undefined;
    const timeframe = searchParams.get('timeframe') || undefined;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || undefined;

    const tasks = await getTasks({ mode, timeframe, category, status });
    return NextResponse.json({ success: true, tasks });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
    }

    const newTask = await createTask(body);
    return NextResponse.json({ success: true, task: newTask });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create task' },
      { status: 500 }
    );
  }
}

