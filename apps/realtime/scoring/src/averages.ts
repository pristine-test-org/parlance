import type { SqlClient } from './sql';
import { SCORE_MINIMUM } from './window';

/** Each skill's average over the last ten counted practices, or null before three. */
export async function memberAverages(sql: SqlClient): Promise<Record<string, number | null>> {
  const { rows } = await sql.query('select skill, average, practices from member_skill_average', []);
  return Object.fromEntries(rows.map((r) => [String(r.skill), Number(r.practices) >= SCORE_MINIMUM ? Number(r.average) : null]));
}
