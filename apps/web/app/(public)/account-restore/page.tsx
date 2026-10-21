import Link from 'next/link';

export default function AccountRestorePage() {
  return (
    <main className="mx-auto max-w-sm px-4 py-16 space-y-4">
      <h1 className="font-display text-3xl">Restore your account</h1>
      <p className="text-muted-foreground">Your practices and journal are kept for 30 days after you leave. Sign in to bring them back.</p>
      <Link href="/login?redirect=%2Fhome" className="text-primary underline-offset-4 hover:underline">Sign in to restore</Link>
    </main>
  );
}
