// src/lib/today/auth.ts
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'yogesh-today-dashboard-secret-jwt-key-2026-secure-hash';
const encodedSecret = new TextEncoder().encode(JWT_SECRET);

export const DEFAULT_MASTER_PASSWORD = process.env.TODAY_PASSWORD || 'yogesh418806';

export interface AuthSession {
  user: string;
  name: string;
  role: 'owner' | 'admin';
  iat?: number;
  exp?: number;
}

/**
 * Sign a new JWT session token (valid for 7 days)
 */
export async function createSessionToken(user = 'yogesh'): Promise<string> {
  return await new SignJWT({
    user,
    name: 'Yogesh Verma',
    role: 'owner',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedSecret);
}

/**
 * Verify a JWT session token
 */
export async function verifySessionToken(token: string): Promise<AuthSession | null> {
  try {
    if (!token) return null;
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload as unknown as AuthSession;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from Authorization header or cookie
 */
export function extractToken(req: Request): string | null {
  // Check Authorization: Bearer <token>
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7).trim();
  }

  // Check Cookie: today_session=<token>
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader.match(/today_session=([^;]+)/);
  if (match) {
    return match[1].trim();
  }

  return null;
}

/**
 * Middleware authentication check for API routes
 */
export async function authenticateRequest(req: Request): Promise<AuthSession | null> {
  const token = extractToken(req);
  if (!token) return null;
  return await verifySessionToken(token);
}

/**
 * Hash password
 */
export async function hashPassword(plainText: string): Promise<string> {
  return await bcrypt.hash(plainText, 10);
}

/**
 * Verify plain text password against hash or default
 */
export async function verifyPassword(inputPassword: string, storedHash?: string): Promise<boolean> {
  if (storedHash) {
    try {
      const match = await bcrypt.compare(inputPassword, storedHash);
      if (match) return true;
    } catch {
      // fallback to plain check if stored was plain text
      if (inputPassword === storedHash) return true;
    }
  }

  // Check against master password or env
  return inputPassword === DEFAULT_MASTER_PASSWORD;
}

