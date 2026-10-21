import type { SqlClient } from './sql';

export async function persistScores(sql: SqlClient, practiceId: string, scores: Record<string, number>, counted: boolean): Promise<void> {
  for (const [skill, score] of Object.entries(scores)) {
    await sql.query('insert into practice_skill_scores (practice_id, skill, score, counted) values ($1, $2, $3, $4) on conflict (practice_id, skill) do update set score = excluded.score, counted = excluded.counted', [practiceId, skill, score, counted]);
  }
}
