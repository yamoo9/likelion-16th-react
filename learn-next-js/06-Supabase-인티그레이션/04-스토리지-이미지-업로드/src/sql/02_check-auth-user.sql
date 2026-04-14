-- 사용자 정보 조회 (02_check-auth-user.sql)
-- Supabase의 인증 시스템에 등록된 사용자의 ID(UUID)를 SQL로 직접 확인하고 싶을 때 사용합니다.

-- [1] 가입된 모든 사용자 목록과 UUID 확인
-- 조회된 'id' 값을 복사해서 <테이블_이름>의 user_id 컬럼에 넣을 수 있습니다.
select 
  id, 
  email, 
  last_sign_in_at 
from auth.users;

-- [2] 특정 이메일을 가진 사용자의 ID(UUID)만 정확히 조회
-- 'test@example.com' 부분을 본인이 가입한 이메일로 수정하여 실행하세요.
select id 
from auth.users 
where email = 'test@example.com';

-- [팁] 조회된 UUID는 '00000000-0000-0000-0000-000000000000' 형태의 문자열입니다.