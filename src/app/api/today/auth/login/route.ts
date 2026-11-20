// src/app/api/today/auth/login/route.ts
import { NextResponse } from 'next/server';
import { createSessionToken, verifyPassword } from '@/lib/today/auth';
import { getAppSetting as getDbSetting } from '@/lib/today/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ success: false, error: 'Password is required' }, { status: 400 });
    }

    const customHash = await getDbSetting('master_password_hash');
    const isValid = await verifyPassword(password, customHash);

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
    }

    const token = await createSessionToken('yogesh');

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        name: 'Yogesh Verma',
        role: 'owner',
      },
    });

    // Set secure session cookie
    response.cookies.set('today_session', token, {
      httpOnly: false, // Accessible to client-side JS for auth headers
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Login failed' }, { status: 500 });
  }
}
