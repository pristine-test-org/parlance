import { Suspense } from 'react';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center gap-6 px-4">
      <h1 className="font-display text-3xl">Sign in to Parlance</h1>
      <Suspense>
        <AuthForm />
      </Suspense>
    </main>
  );
}
