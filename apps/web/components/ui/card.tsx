import { cn } from '@/lib/utils';

export function Card({ className, variant = 'default', ...props }: React.ComponentProps<'div'> & { variant?: 'default' | 'hero' }) {
  return <div className={cn('rounded-lg border border-border bg-card p-6 text-card-foreground', variant === 'hero' && 'border-primary/40 shadow-medium', className)} {...props} />;
}
