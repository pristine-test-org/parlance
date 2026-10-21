# Parlance

Practice the conversations that matter, out loud, before you have them. Parlance pairs you with an AI counterpart, scores how it went and keeps a journal of the real conversations that followed.

## Layout

- `apps/web`: the Next.js app (App Router, Tailwind CSS, Radix UI).
- `apps/realtime`: the voice session service and its eval fixtures.
- `docs/DESIGN.md`: the design system. Read it before touching UI.

## Develop

```bash
npm install
npm run wt:dev # Start local Supabase + web app
```

The web app runs on http://localhost:3000. Sign in with any email on `/login`; local sessions are not checked.
