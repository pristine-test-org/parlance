import Link from 'next/link';
import { Button } from '@/components/ui/button';

const GLOW = 'shadow-[0_0_48px_-8px_oklch(0.6_0.12_200/0.55)]';

export default function LandingPage() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-background/40">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <span className="font-display text-2xl">Parlance</span>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/about">About</Link>
            <Button asChild variant="outline" size="sm"><Link href="/login">Sign in</Link></Button>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12">
        <section className="max-w-2xl space-y-6">
          <h1 className="font-display text-5xl leading-tight">Rehearse the hard conversation before it happens.</h1>
          <p className="max-w-prose text-pretty text-lg text-muted-foreground">
            Parlance gives you a counterpart who pushes back the way your manager, client or partner will, then shows you what landed and what to change next time.
          </p>
          <Button asChild size="lg" className={GLOW}><Link href="/login?redirect=%2Fpractice">Start a practice</Link></Button>
        </section>
        <img src="/practice-room.png" alt="A member mid-practice, talking to their counterpart" width={1000} height={940} className={`mt-16 w-full rounded-[14px] border border-border ${GLOW}`} />
        <section className="mt-24 grid gap-10 md:grid-cols-3">
          {[
            ['Practice out loud', 'Voice sessions with a counterpart built from your real situation.'],
            ['See the evidence', 'Every note in your debrief quotes the moment it came from.'],
            ['Keep a journal', 'Log how the real conversation went and plan the next one.'],
          ].map(([title, body], i) => (
            <div key={title} className={`space-y-2 rounded-[14px] p-5 ${i === 1 ? `bg-card ${GLOW}` : ''}`}>
              <h2 className="text-lg font-semibold">{title}</h2>
              <p className="text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>
        <section className="mt-24 max-w-prose space-y-4 text-pretty text-muted-foreground">
          <h2 className="font-display text-3xl text-foreground">Why practise out loud</h2>
          <p>Reading a script back to yourself feels like preparation, but the first time you hear the objection is usually in the room. Saying the words out loud, to someone who answers, is what makes them yours.</p>
          <p>Every practice ends with a debrief. It quotes the moments that mattered and gives you one thing to try next time, so each session builds on the last.</p>
          <p>When the real conversation happens, log it in your journal. Parlance uses it to plan the next practice around what actually came up.</p>
        </section>
      </main>
    </>
  );
}
