create or replace view member_skill_average as
select s.skill, round(avg(s.score)) as average, count(*) as practices
  from (select *, row_number() over (partition by skill order by scored_at desc) as n from practice_skill_scores where counted) s
 where s.n <= 10
 group by s.skill;
