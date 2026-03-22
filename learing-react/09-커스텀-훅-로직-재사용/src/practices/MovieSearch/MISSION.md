## 사전 준비: 환경 변수 설정 (.env)

- [The Movie DB](https://developer.themoviedb.org/docs) API 문서 참고
- [TMDB API Key](https://www.themoviedb.org/settings/api) 확인 (`Settings` → `API`)

```sh
VITE_TMDB_URL=https://api.themoviedb.org/3
VITE_TMDB_READ_ACCESS_TOKEN=<read_acces_token>
VITE_TMDB_TOKEN=<token>
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
VITE_TMDB_LINK=https://www.themoviedb.org/movie
```

## 실습 1 요구사항

**목표: TMDB API 연동 및 검색 최적화 (Debounce & Manual Search)**

**1. API 호출 및 커스텀 훅 활용**
- `useFetch` 커스텀 훅을 사용하여 TMDB API 데이터를 호출합니다.
- `getTmdbQuery` 유틸리티 함수를 사용햐 검색어(`query`) 유무에 따라 `movie/popular` 또는 `search/movie` 엔드포인트로 동적 전환합니다.
- 환경 변수(`VITE_TMDB_READ_ACCESS_TOKEN`)를 `Authorization: Bearer` 헤더에 포함시켜 인증을 처리한 것을 확인합니다.

**2. 검색 최적화 (Debounce & Instant Search)**
- `useDebounce` 훅을 사용하여 사용자가 입력을 멈춘 후 500ms 뒤에 자동으로 검색이 실행되도록 구현합니다.
- **수동 검색**: 폼 제출(`onSubmit`) 시 `SubmitEvent`를 가로채어 `setDebouncedQuery`를 즉시 업데이트함으로써,  
사용자가 엔터를 누르면 디바운스 대기 시간 없이 즉시 검색 결과가 반영되도록 처리합니다.

**3. 데이터 바인딩 및 예외 처리**
- **이미지**: `getTmdbPoster` 유틸리티를 사용하여 `poster_path`를 완전한 URL로 변환합니다.  
포스터가 없는 경우 `/no-poster.png`를 대체 이미지로 사용합니다.
- **정보 바인딩**:
    - 제목(`title`), 언어(`original_language`), 줄거리(`overview`)를 출력합니다.
    - **평점**: `toFixed(1)`을 사용하여 소수점 첫째 자리까지 표시합니다.
    - **개봉 연도**: `release_date` 문자열에서 연도 부분만 추출하여 표시합니다.
    - **리뷰 수**: `toLocaleString()`을 적용하여 천 단위 구분 쉼표를 표시합니다.

**4. UI 상태 관리 (FetchStatus)**
- `FetchStatus` 컴포넌트를 활용하여 데이터 로딩 중에는 `SkeletonMovieList`를 보여줍니다.
- 에러 발생 시 `PrintError` 컴포넌트를 통해 에러 메시지를 노출하고, '다시 시도(`refetch`)' 기능을 제공하여 사용자 경험을 개선합니다.

<br />

---

<br />

## 실습 2 요구사항

**목표: 거대 컴포넌트 리팩터링 및 서비스 수준의 UX 완성 (컴포넌트 추상화 & 예외 처리)**

**1. 컴포넌트 구조화 및 관심사 분리 (Refactoring)**
- **MovieCard**: 개별 영화의 데이터 바인딩, 이미지 에러 핸들링, 상세 페이지 링크 연결을 담당하는 최하위 컴포넌트를 추출합니다.
- **MovieCardList**: 영화 배열(`results`)을 받아 루프를 돌며 리스트를 렌더링하는 중간 단위 컴포넌트를 추출합니다.
- **MovieSearch**: 데이터 페칭 로직과 전체 레이아웃 구성을 담당하며, 분리된 컴포넌트들을 조합하여 가독성을 높입니다.

**2. 검색 결과 예외 처리 (Empty State)**
- 검색 결과가 0건(`data?.results.length === 0`)인 경우, 사용자에게 친절한 안내 문구를 제공하는 **Empty UI**를 구현합니다.
- CSS Module과 중첩 규칙(Nesting)을 활용하여, 검색 결과가 없을 때 화면이 비어 보이지 않도록 중앙 정렬 및 적절한 여백을 적용합니다.

**3. 이미지 안정성 및 최적화**
- **Fallback 처리**: `poster_path`가 `null`이거나 이미지 로딩에 실패(`onError`)할 경우, 준비된 `/no-poster.png`를 즉시 보여주도록 방어 코드를 작성합니다.
- **성능 및 레이아웃**: `loading="lazy"`를 적용하여 초기 로딩 속도를 개선하고, `aspect-ratio: 2 / 3`를 설정하여 이미지 로드 전후의 레이아웃 흔들림(Layout Shift)을 방지합니다.

**4. 외부 링크 연동 및 UI 디테일**
- **상세 페이지 연결**: `getTmdbLink(movie.id)` 유틸리티를 사용하여 카드 클릭 시 TMDB 공식 상세 페이지로 새 창(`_blank`)에서 열리도록 구현합니다.
- **텍스트 클리핑**: 영화 제목이나 줄거리가 너무 길어 레이아웃을 해치지 않도록, CSS의 `-webkit-line-clamp` 속성을 사용하여 일정 줄 수 이상은 말줄임표(`...`)로 처리합니다.
- **데이터 포맷팅**: 평점 별점 아이콘 추가, 개봉 연도 추출, 리뷰 수 천 단위 콤마 등 세부적인 데이터 출력 형식을 완성합니다.

<br />

---

<br />

## 실습 3 요구사항

**목표: 영화 검색 고도화 (페이지네이션 & 재시도 로직 완성)**

**1. 페이지네이션 상태 관리 및 동적 URL 생성**
- **상태 관리**: 현재 페이지 번호를 관리하는 `page` 상태(기본값: `1`)를 추가합니다.
- **동적 쿼리**: `getTmdbQuery(debouncedQuery, page)`와 같이 검색어와 페이지 번호를 인자로 전달하여 API 요청 URL이 동적으로 생성되도록 구현합니다.
- **더 보기 핸들러**: '영화 더 보기' 버튼 클릭 시 `page` 상태를 1씩 증가시키는 `handleLoadMore` 함수를 작성합니다. 이때 `isLoading` 중일 경우 중복 요청을 방지하는 방어 코드를 포함합니다.
- **검색어 변경 시 초기화**: 새로운 검색어(`debouncedQuery`)가 입력되면 `page`를 다시 `1`로 초기화하여 첫 페이지부터 검색이 시작되도록 처리합니다.

**2. 렌더링 중 상태 조정 (검색어 변경 시 초기화)**
- **이전 값 비교**: `useState`를 이용해 이전 디바운스된 검색어(`prevDebouncedQuery`)를 저장합니다.
- **즉시 동기화**: 렌더링 도중 현재 `debouncedQuery`와 `prevDebouncedQuery`를 비교하여, 검색어가 달라졌다면 `page`를 즉시 `1`로 리셋하고 `prevDebouncedQuery`를 업데이트합니다. 
- **이펙트 없음**: `useEffect`를 거치지 않고 렌더링 단계에서 상태를 조정함으로써, 새로운 검색 시 이전 페이지 번호(예: 3페이지)로 데이터를 요청하는 버그를 방지합니다.

**3. 데이터 누적 및 중복 제거 (State Accumulation)**
- **누적 상태**: 서버에서 오는 단발성 `data`와 별개로, 지금까지 불러온 모든 영화 목록을 저장할 `accumulatedResults` 상태를 관리합니다.
- **데이터 동기화**: `data`가 변경되었을 때(`data !== prevData`) 렌더링 과정에서 누적 로직을 실행합니다.
    - **조건부 업데이트**: `page === 1`이면 기존 목록을 새 데이터로 교체하고, `page > 1`이면 기존 목록 뒤에 새 데이터를 합칩니다.
    - **중복 제거**: API의 실시간 데이터 변동으로 인해 발생할 수 있는 중복 아이템을 `Map` 객체(ID 기준)를 사용하여 제거합니다.
- **파생된 상태**: 원본 `data` 객체의 구조를 유지하면서 `results` 필드만 누적된 데이터로 교체한 `displayData`를 만들어 하위 컴포넌트에 전달합니다.

**4. 조건부 UI 및 로딩 상태 세분화**
- **버튼 노출**: 응답 데이터의 `total_pages`와 현재 `page`를 비교하여 다음 페이지가 있을 때만 '더 보기' 버튼을 렌더링합니다.
- **로딩 전략**: 
    - **첫 페이지 로딩**: `isLoading && page === 1`일 때는 전체 화면 스켈레톤(`SkeletonMovieList`)을 보여줍니다.
    - **추가 페이지 로딩**: `page > 1`일 때는 기존 리스트는 유지하고 '더 보기' 버튼 내부의 텍스트만 "로딩 중..."으로 변경하여 사용자 경험을 개선합니다.

**5. 예외 처리 및 다시 시도(Retry)**
- **에러 핸들링**: `FetchStatus`와 `PrintError` 컴포넌트에 `useFetch`로부터 받은 `refetch` 함수를 연결합니다.
- **접근성(A11y)**: '더 보기' 버튼에 `type="button"`을 명시하고, 로딩 중에는 `disabled` 및 `aria-disabled` 속성을 적용하여 중복 클릭과 스크린 리더 대응을 강화합니다.