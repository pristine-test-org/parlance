import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from '@/lib/session';

export async function POST(request: Request) {
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  if (!email || !email.includes('@')) return NextResponse.json({ error: 'email' }, { status: 400 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, Buffer.from(email).toString('base64url'), { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 });
  return response;
}
