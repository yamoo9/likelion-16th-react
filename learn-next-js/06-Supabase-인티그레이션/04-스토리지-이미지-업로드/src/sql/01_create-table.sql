-- 테이블 생성 (01_create-table.sql)
-- 이 스크립트를 실행하기 전에 <테이블_이름>을 실제 사용할 이름(예: memos)으로 변경하세요.

create table <테이블_이름> (
  id uuid default gen_random_uuid() primary key,
  user_id uuid default auth.uid() not null,         -- 작성자 ID 자동 할당 (인증된 사용자)
  title text,                                       -- 제목 (선택 사항)
  content text not null,                            -- 내용 (필수 사항)
  created_at timestamp with time zone default now() -- 생성 시간 자동 기록
);
