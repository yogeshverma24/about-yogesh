// src/app/api/today/auth/verify/route.ts
import { NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/today/auth';

export async function GET(req: Request) {
  try {
    const session = await authenticateRequest(req);
    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        name: session.name || 'Yogesh Verma',
        role: session.role || 'owner',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ authenticated: false, error: err.message }, { status: 401 });
  }
}

