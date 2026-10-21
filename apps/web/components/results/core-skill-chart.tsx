import { CORE_SKILLS, type CoreSkillScore } from '@/lib/voice/core-skill-average';

/** One practice's core skills as plain bars. */
export function CoreSkillChart({ scores }: { scores: CoreSkillScore[] }) {
  return (
    <ul className="space-y-3">
      {CORE_SKILLS.map((skill) => {
        const score = scores.find((s) => s.id === skill.id)?.score ?? 0;
        return (
          <li key={skill.id} className="grid grid-cols-[7rem_1fr_3rem] items-center gap-3">
            <span className="text-sm">{skill.label}</span>
            <span className="h-2 rounded-full bg-muted"><span className="block h-2 rounded-full bg-primary" style={{ width: `${score}%` }} /></span>
            <span className="text-right font-mono text-sm tabular-nums">{score}</span>
          </li>
        );
      })}
    </ul>
  );
}
