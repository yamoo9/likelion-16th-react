-- 수정 시간 자동 갱신 설정 (08_auto-timestamp.sql)
-- 데이터가 수정될 때마다 'updated_at' 컬럼을 자동으로 현재 시간으로 업데이트합니다.

-- [1] 시간 갱신을 담당할 공용 함수(Function) 생성
-- 이 함수는 어느 테이블에서나 재사용할 수 있습니다.
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now(); -- 수정되는 행의 updated_at을 현재 시간으로 설정
  return new;
end;
$$ language plpgsql;

-- [2] 특정 테이블에 수정 트리거(Trigger) 적용
-- 주의: <테이블_이름> 부분에 실제 테이블명을 넣으세요. (예: memos, profiles)
-- 주의: 해당 테이블에 'updated_at' 컬럼이 반드시 존재해야 합니다.
create or replace trigger set_updated_at
  before update on <테이블_이름>
  for each row execute procedure public.handle_updated_at();

-- [주의사항]
-- 1. 'before update'이므로 데이터가 실제로 저장되기 직전에 시간이 먼저 바뀝니다.
-- 2. 테이블마다 이 트리거를 각각 설정해줘야 해당 테이블에서 자동 갱신이 작동합니다.
