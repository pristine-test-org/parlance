/**
 * Shared layout for all authenticated pages within the (app) route group.
 *
 * Authentication is handled by the proxy - this layout only renders for authenticated users.
 */
import Link from 'next/link';

const NAV = [
  ['/home', 'Home'],
  ['/practice', 'Practice'],
  ['/scenarios', 'Scenarios'],
  ['/goals', 'Goals'],
  ['/journal', 'Journal'],
  ['/feedback', 'Feedback'],
  ['/personas', 'Counterparts'],
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh md:grid-cols-[14rem_1fr]">
      <aside className="border-r border-border bg-surface-sunken p-4">
        <Link href="/home" className="mb-6 block font-display text-xl">Parlance</Link>
        <nav className="flex flex-col gap-1 text-sm">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="rounded-md px-3 py-2 hover:bg-muted">{label}</Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-col gap-1 text-sm text-muted-foreground">
          <Link href="/profile" className="px-3 py-1">Profile</Link>
          <Link href="/settings" className="px-3 py-1">Settings</Link>
          <Link href="/support" className="px-3 py-1">Support</Link>
        </div>
      </aside>
      <main className="mx-auto w-full max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
