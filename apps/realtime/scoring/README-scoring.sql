-- Core skill scores per practice, one row a skill.
create table if not exists practice_skill_scores (
  practice_id uuid not null,
  skill text not null,
  score smallint not null check (score between 0 and 100),
  scored_at timestamptz not null default now(),
  primary key (practice_id, skill)
);
