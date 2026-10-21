import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, isMemberPath } from '@/lib/session';

/** The proxy in front of the (app) route group: no session, no page. */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (!isMemberPath(pathname) || request.cookies.get(SESSION_COOKIE)) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next|api|favicon.ico).*)'] };
