import { TURN_WEIGHTS, type TurnKind } from './weights';

export interface ScoredTurn {
  kind: TurnKind;
  marks: Record<string, number>;
}

/** A skill's score from 0 to 100, weighting the turns that matter most. */
export function scoreSkill(turns: readonly ScoredTurn[], skill: string): number {
  let total = 0;
  let weight = 0;
  for (const turn of turns) {
    const mark = turn.marks[skill];
    if (mark === undefined) continue;
    total += mark * TURN_WEIGHTS[turn.kind];
    weight += TURN_WEIGHTS[turn.kind];
  }
  return weight === 0 ? 0 : Math.round((total / weight) * 100);
}
