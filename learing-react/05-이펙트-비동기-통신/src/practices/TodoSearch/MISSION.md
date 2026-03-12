## 실습 1 요구사항

**목표**: 유저 ID 기반 할 일 목록 조회 구현 (입력할 때마다 API 호출)

1. **데이터 페칭 (Data Fetching)**  
    - `useEffect`를 사용하여 `userId`가 바뀔 때마다 API를 호출합니다.
    - `.env.example` 환경 변수 파일을 확인해 엔드포인트를 사용하세요.
    - 엔드포인트: `https://koreandummyjson.vercel.app/api/todos?userId={id}`
2. **상태 관리 (State Management)**  
    - `userId`, `todos` 배열, `isLoading` 상태를 각각 관리합니다.
    - 입력값이 비어있을 경우(`userId === ''`), 목록을 즉시 초기화합니다.
3. **기능 및 UI 요구사항**  
    - API 응답 객체 `{ todos: [...] }`에서 배열만 추출하여 렌더링합니다.
    - 할 일의 내용(속성명: `content`)을 화면에 표시합니다.
    - 할 일의 완료 여부(`completed`)에 따라 `✅` 또는 `❎` 아이콘을 표시합니다.
4. **접근성 (A11y)**  
    - 로딩 상태와 결과 없음 메시지를 상태 알림 영역에 표시하여 스크린 리더가 인지하게 합니다.

<br />

---

<br />

## 실습 2 요구사항

**목표**: AbortController를 적용한 안정적 검색 구현 (요청 취소 & 디바운싱)

1. **디바운싱 (Debouncing)**  
    - `setTimeout`을 사용하여 `userId` 입력 후 500ms가 지났을 때만 API를 호출합니다.
2. **네트워크 취소 (Abort)**  
    - `useEffect` 내부에 `new AbortController()`를 생성합니다.
    - `fetch` 옵션에 `signal`을 전달하고, 클린업 함수에서 `abort()`를 호출합니다.
3. **에러 처리**  
    - `try...catch` 문에서 `AbortError`는 콘솔에 에러로 찍히지 않도록 예외 처리합니다.
4. **접근성 (A11y)**  
    - 로딩 상태 변화를 상태 알림 영역을 통해 스크린 리더에 알립니다.