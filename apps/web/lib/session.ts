export const SESSION_COOKIE = 'parlance_session';

/** Pages that need a signed-in member; middleware.ts sends everyone else to /login. */
export const MEMBER_PATHS = ['/dev', '/feedback', '/goals', '/home', '/journal', '/personas', '/practice', '/profile', '/scenarios', '/settings', '/support'];

export const isMemberPath = (path: string) => MEMBER_PATHS.some((p) => path === p || path.startsWith(`${p}/`));
