-- 보안 정책(RLS) 설정 (05_set-rls-policies.sql)
-- 이 설정을 완료하면 로그인한 사용자는 '자신의 데이터'에만 접근할 수 있게 됩니다.

-- [1] RLS 활성화 (이걸 실행해야 아래 정책들이 적용됩니다)
-- 활성화 전에는 모든 사용자가 모든 데이터를 볼 수 있는 상태입니다.
alter table <테이블_이름> enable row level security;

-- [2] 조회 정책: 본인의 메모만 조회 가능 (SELECT)
-- 테이블의 user_id와 현재 로그인한 사용자의 ID(auth.uid())가 일치하는 행만 보여줍니다.
create policy "Users can view their own notes"
on <테이블_이름> for select
using ( auth.uid() = user_id );

-- [3] 추가 정책: 본인의 메모만 추가 가능 (INSERT)
-- 데이터를 넣을 때 user_id가 본인의 ID와 일치하는지 검사합니다.
create policy "Users can insert their own notes"
on <테이블_이름> for insert
with check ( auth.uid() = user_id );

-- [4] 수정/삭제 정책: 본인의 메모만 수정 및 삭제 가능 (ALL)
-- UPDATE, DELETE 등 모든 권한에 대해 본인 여부를 확인합니다.
create policy "Users can update/delete their own notes"
on <테이블_이름> for all
using ( auth.uid() = user_id );