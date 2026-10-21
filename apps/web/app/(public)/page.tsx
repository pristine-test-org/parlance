import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <nav className="mb-24 flex items-center justify-between">
        <span className="font-display text-2xl">Parlance</span>
        <Button asChild variant="outline" size="sm"><Link href="/login">Sign in</Link></Button>
      </nav>
      <section className="max-w-2xl space-y-6">
        <h1 className="font-display text-5xl leading-tight">Rehearse the hard conversation before it happens.</h1>
        <p className="max-w-prose text-pretty text-lg text-muted-foreground">
          Parlance gives you a counterpart who pushes back the way your manager, client or partner will, then shows you what landed and what to change next time.
        </p>
        <Button asChild size="lg"><Link href="/login?redirect=%2Fpractice">Start a practice</Link></Button>
      </section>
      <section className="mt-24 grid gap-10 md:grid-cols-3">
        {[
          ['Practice out loud', 'Voice sessions with a counterpart built from your real situation.'],
          ['See the evidence', 'Every note in your debrief quotes the moment it came from.'],
          ['Keep a journal', 'Log how the real conversation went and plan the next one.'],
        ].map(([title, body]) => (
          <div key={title} className="space-y-2">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
