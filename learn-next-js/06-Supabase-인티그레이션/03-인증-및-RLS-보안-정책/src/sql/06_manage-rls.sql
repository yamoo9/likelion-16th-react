-- RLS 정책 관리 및 확인 (06_manage-rls.sql)
-- 설정된 RLS 정책이 잘 적용되었는지 확인하거나, 정책을 수정/삭제할 때 사용합니다.

-- [1] 현재 테이블에 설정된 모든 정책(Policy) 확인
-- 주의: '<테이블_이름>' 부분에 작은따옴표(' ')는 그대로 두고 이름만 바꿔주세요.
-- 예: where tablename = 'memos';
select * 
from pg_policies 
where tablename = '<테이블_이름>';

-- [2] 기존 정책 삭제 (정책 이름을 알아야 함)
-- 정책 내용을 수정하고 싶을 때는 먼저 삭제(drop)한 후 다시 생성(create)해야 합니다.
-- 05번 스크립트에서 설정한 정책 이름과 동일해야 삭제됩니다.
drop policy "Users can view their own notes" on <테이블_이름>;
drop policy "Users can insert their own notes" on <테이블_이름>;
drop policy "Users can update/delete their own notes" on <테이블_이름>;

-- [3] RLS 일시 비활성화 (관리자 작업 시 보안 검사를 건너뜁니다)
-- 데이터 일괄 수정이나 점검 시 잠시 보안을 해제하고 싶을 때 사용하세요.
alter table <테이블_이름> disable row level security;

-- [4] RLS 다시 활성화
-- 작업이 끝나면 반드시 다시 활성화하여 보안을 유지해야 합니다.
alter table <테이블_이름> enable row level security;