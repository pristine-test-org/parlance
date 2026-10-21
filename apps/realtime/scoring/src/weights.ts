/** How much each turn kind counts towards a skill's score. */
export const TURN_WEIGHTS = { opening: 1.5, objection: 2, close: 1.5, other: 1 } as const;
export type TurnKind = keyof typeof TURN_WEIGHTS;
