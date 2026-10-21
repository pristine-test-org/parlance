/**
 * Builds a synthetic practice session (transcript, scores and debrief notes)
 * via LLM. Used by the CLI script to seed local development data.
 */
export interface SyntheticSession {
  scenario: string;
  turns: { speaker: 'member' | 'counterpart'; text: string; atMs: number }[];
  notes: { quote: string; advice: string }[];
}

export function syntheticSessionPrompt(scenario: string): string {
  return [
    'Write a realistic six-minute practice conversation for this scenario.',
    `Scenario: ${scenario}`,
    'Return JSON matching SyntheticSession, with three debrief notes that each quote the turn they come from.',
  ].join('\n');
}
