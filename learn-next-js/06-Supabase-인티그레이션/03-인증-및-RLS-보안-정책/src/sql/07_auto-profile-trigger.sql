-- 자동 프로필 등록 설정 (07_auto-profile-trigger.sql)
-- 사용자가 회원가입(Auth)을 하면 자동으로 프로필 테이블에 기본 정보를 생성합니다.

-- [1] 프로필 테이블 생성 (필요한 필드를 추가/수정하세요)
-- 주의: id 필드는 반드시 uuid 타입이어야 하며 auth.users를 참조해야 합니다.
-- 주의: 테이블 생성 후 필드를 추가하려면 'alter table' 명령어를 사용해야 합니다.
create table <프로필_테이블_이름> (
  id uuid references auth.users on delete cascade primary key, -- 사용자 고유 ID (필수)
  email text,                                                  -- 이메일 주소
  full_name text,                                              -- 전체 이름 (소셜 로그인 연동)
  avatar_url text,                                             -- 프로필 이미지 (소셜 로그인 연동)
  updated_at timestamp with time zone default now()            -- 마지막 수정 시간
  -- (커스텀) 추가하고 싶은 필드가 있다면 여기에 작성 (예: nickname text)
);

-- [2] 회원가입 시 실행될 자동화 함수(Function) 생성
-- 주의: 'security definer' 설정을 빼먹으면 권한 문제로 가입 시 에러가 발생합니다.
-- 주의: insert 문에 나열된 필드 순서와 values의 데이터 순서가 정확히 일치해야 합니다.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.<프로필_테이블_이름> (
    id,          -- [1]에서 정의한 id 필드
    email,       -- [1]에서 정의한 email 필드
    full_name,   -- [1]에서 정의한 full_name 필드
    avatar_url   -- [1]에서 정의한 avatar_url 필드
  )
  values (
    new.id,                                     -- 가입된 사용자의 UUID를 가져옴
    new.email,                                  -- 가입 시 입력한 이메일을 가져옴
    new.raw_user_meta_data->>'full_name',       -- 소셜 계정의 이름을 가져옴 (없으면 null)
    new.raw_user_meta_data->>'avatar_url'       -- 소셜 계정의 사진을 가져옴 (없으면 null)
  );
  return new;
-- 주의: 함수 내용 수정 시 반드시 이 전체 블록을 다시 실행(create or replace)해야 적용됩니다.
end;
$$ language plpgsql security definer;

-- [3] 트리거(Trigger) 설정 (함수와 테이블을 연결)
-- 주의: 이미 동일한 이름의 트리거가 있다면 먼저 삭제(drop)하거나 이름을 바꿔야 합니다.
-- 주의: 이 설정 이후에 가입하는 사용자부터 적용됩니다. (기존 가입자는 소급 적용 안 됨)
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- [최종 주의사항 요약]
-- 1. 테이블 이름(<프로필_테이블_이름>)을 변경했다면 [1], [2]번 모두 수정했는지 확인하세요.
-- 2. 소셜 로그인이 아닌 '이메일 가입'의 경우 full_name과 avatar_url은 비어있을 수 있습니다.
-- 3. 가입 테스트 시 에러가 난다면 Supabase의 'Database -> Functions' 메뉴에서 로그를 확인하세요.