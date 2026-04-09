-- 검색 및 정렬 최적화 인덱스 (10_create-index.sql)
-- 데이터가 많아질 경우를 대비해 검색 성능을 높이는 '색인(Index)'을 생성합니다.

-- [1] 사용자 ID별 조회 최적화
-- 특정 사용자의 데이터를 불러올 때(where user_id = ...) 속도가 빨라집니다.
create index idx_user_id on <테이블_이름> (user_id);

-- [2] 제목/내용 검색 최적화 (텍스트 검색)
-- 제목으로 검색하거나 필터링할 때 성능을 높여줍니다.
create index idx_title on <테이블_이름> (title);

-- [3] 최신순 정렬 최적화
-- '최신순'으로 데이터를 정렬해서 보여줄 때(order by created_at desc) 유용합니다.
create index idx_created_at_desc on <테이블_이름> (created_at desc);

-- [주의사항]
-- 1. 인덱스는 조회 속도를 높여주지만, 데이터 추가/수정(INSERT/UPDATE) 속도는 약간 느려질 수 있습니다.
-- 2. 너무 많은 인덱스는 DB 용량을 차지하므로, 자주 검색 조건으로 쓰이는 컬럼에만 설정하세요.
-- 3. 인덱스 삭제는 'drop index <인덱스_이름>;' 명령어를 사용합니다.