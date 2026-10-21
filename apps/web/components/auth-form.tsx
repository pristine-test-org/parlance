'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(null);
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setPending(false);
    if (!response.ok) {
      setError('We could not send your sign-in link. Check the address and try again.');
      return;
    }
    router.push(params.get('redirect') ?? '/home');
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Email</span>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-10 w-full rounded-md border border-control-border bg-transparent px-3 focus-visible:focus-indicator" />
      </label>
      {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
      <Button type="submit" className="w-full" disabled={pending}>{pending ? 'Signing in…' : 'Continue with email'}</Button>
    </form>
  );
}
