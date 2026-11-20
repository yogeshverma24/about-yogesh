// src/app/api/today/finances/route.ts
import { NextResponse } from 'next/server';
import { getFinances, createFinance, deleteFinance } from '@/lib/today/db';

export async function GET() {
  try {
    const finances = await getFinances();
    return NextResponse.json({ success: true, finances });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch finances' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.title || typeof body.amount !== 'number') {
      return NextResponse.json({ success: false, error: 'Title and amount are required' }, { status: 400 });
    }

    const newFinance = await createFinance(body);
    return NextResponse.json({ success: true, finance: newFinance });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save financial entry' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await deleteFinance(id);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete financial record' },
      { status: 500 }
    );
  }
}

