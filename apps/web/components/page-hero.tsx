export function PageHero({ title, lead }: { title: string; lead?: string }) {
  return (
    <header className="mb-8 space-y-2">
      <h1 className="font-display text-4xl">{title}</h1>
      {lead ? <p className="max-w-prose text-pretty text-muted-foreground">{lead}</p> : null}
    </header>
  );
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-lg font-semibold">{children}</h2>;
}
