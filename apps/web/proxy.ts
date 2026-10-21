import { NextResponse, type NextRequest } from 'next/server';

export const SESSION_COOKIE = 'parlance_session';

/** Signs every page of the (app) route group in: no session, no page. */
export function proxy(request: NextRequest) {
  if (request.cookies.get(SESSION_COOKIE)) return NextResponse.next();
  const { pathname, search } = request.nextUrl;
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  url.search = `?redirect=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/dev/design-system/:path*', '/feedback/:path*', '/goals/:path*', '/home/:path*', '/journal/:path*', '/personas/:path*', '/practice/:path*', '/profile/:path*', '/scenarios/:path*', '/settings/:path*', '/support/:path*'],
};
