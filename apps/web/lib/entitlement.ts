export interface Entitlement {
  plan: 'free' | 'practice' | 'coach';
  minutesLeft: number;
}

/** The member's plan and practice minutes, from the billing service. */
export async function getEntitlementWithSubscription(): Promise<Entitlement> {
  const base = process.env.BILLING_API_URL;
  if (!base) return { plan: 'free', minutesLeft: 30 };
  const response = await fetch(`${base}/v1/entitlement`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`entitlement ${response.status}`);
  return (await response.json()) as Entitlement;
}
