-- 스토리지 보안 정책 설정 (09_storage-policies.sql)
-- 사용자가 업로드한 이미지나 파일에 대해 본인만 접근/수정할 수 있도록 제한합니다.

-- [1] 스토리지 버킷(Bucket) 생성 확인
-- Supabase 대시보드 'Storage' 메뉴에서 생성한 버킷 이름(예: 'avatars')을 사용하세요.

-- [2] 본인의 파일만 업로드(INSERT) 가능하게 설정
-- 주의: <버킷_이름> 자리에 실제 생성한 버킷명을 넣으세요. (예: 'avatars')
create policy "Users can upload their own files"
on storage.objects for insert
with check ( bucket_id = '<버킷_이름>' and auth.uid() = owner );

-- [3] 본인의 파일만 수정/삭제(UPDATE/DELETE) 가능하게 설정
create policy "Users can update/delete their own files"
on storage.objects for all
using ( bucket_id = '<버킷_이름>' and auth.uid() = owner );

-- [4] 누구나 파일 조회(SELECT) 가능하게 설정 (공개 프로필 등)
create policy "Anyone can view files"
on storage.objects for select
using ( bucket_id = '<버킷_이름>' );

-- [주의사항]
-- 1. 스토리지 RLS를 활성화하려면 대시보드 Storage 설정에서 'Public' 체크를 해제해야 합니다.
-- 2. 'owner' 컬럼은 파일 업로드 시 자동으로 로그인한 사용자의 ID가 저장됩니다.
