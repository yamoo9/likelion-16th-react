## 실습 1. Context API를 활용한 테마 시스템 설계

**목표**: 전역 상태를 통해 테마를 관리하고 브라우저 환경(LocalStorage, OS 설정)과 동기화합니다.

1.  **전역 상태 및 초기화 (State & Init)**  
    - `light`, `dark`, `system` 타입을 갖는 `theme` 상태를 생성합니다.
    - **Lazy Initializer**를 사용하여 로컬 스토리지(`app-theme`)에 저장된 값이 있다면 불러오고, 없다면 `'system'`을 기본값으로 설정합니다.
    - `system` 모드일 때 실제 OS의 다크모드 여부를 판별하여 저장할 **`isDarkMode` 파생 상태**를 관리합니다.
2.  **테마 동기화 및 부수 효과 (Side Effects)**
    - `useEffect`를 활용해 `theme`이 변경될 때마다 `<html>` 요소의 **`dataset.theme`** 속성과 **`color-scheme`** 스타일 속성을 업데이트합니다.
    - 사용자의 선택을 `localStorage`에 문자열 형태로 저장하여 새로고침 후에도 유지되게 합니다.
3.  **시스템 설정 실시간 감지 (Media Query)**
    - `window.matchMedia`를 사용하여 OS의 테마 변경을 감지하는 리스너를 등록합니다.
    - 사용자가 '시스템 설정'을 선택 중일 때, OS 테마가 바뀌면 즉시 UI에 반영되도록 구현하고 **클린업 함수**를 통해 리스너를 해제합니다.
4.  **커스텀 훅 (Custom Hook)**
    - `useContext`를 캡슐화한 `useTheme` 훅을 작성합니다.
    - Provider 밖에서 호출될 경우 명확한 에러 메시지를 던지도록 예외 처리를 추가합니다.

<br />

---

<br />

## 실습 2. Ref와 이벤트를 활용한 접근성 높은 UI 구현

**목표**: Ref를 통한 포커스 제어와 키보드 내비게이션을 통해 견고한 드롭다운 컴포넌트를 완성합니다.

1.  **타입 안전성 확보 (TypeScript)**
    - 테마 옵션 데이터를 관리할 `ThemeOption` 인터페이스를 정의하고 속성에 `readonly`를 적용합니다.
    - `THEME_OPTIONS` 배열에 **`as const` (Const Assertion)** 를 사용하여 리터럴 타입으로 엄격하게 관리합니다.
2.  **포커스 트랩 및 복구 (Ref & Focus)**
    - **`useRef` 활용**: 트리거 버튼(`openButtonRef`)과 메뉴 리스트(`menuRef`)를 참조합니다.
    - 메뉴가 열릴 때(`isOpen`), 현재 선택된 테마 항목(`aria-selected="true"`)을 찾아 **즉시 포커스를 이동** 시킵니다.
    - 테마를 선택하거나 메뉴를 닫은 후에는 포커스를 다시 트리거 버튼으로 돌려주어 연속적인 키보드 조작을 지원합니다.
3.  **고급 이벤트 핸들링 (A11y)**
    - **외부 클릭 감지**: `containerRef`를 활용하여 메뉴 외부 영역 클릭 시 드롭다운이 닫히도록 구현합니다.
    - **키보드 내비게이션**: `ArrowUp`, `ArrowDown` 키 입력 시 메뉴 아이템 간에 포커스가 **순환(Loop)** 하도록 인덱스 계산 로직을 작성합니다.
    - `Escape` 키를 누르면 메뉴가 즉시 닫히도록 처리합니다.
4.  **WAI-ARIA 준수**
    - 트리거 버튼에 `aria-haspopup="listbox"`, `aria-expanded` 속성을 동적으로 적용합니다.
    - 메뉴 리스트와 아이템에 각각 `role="listbox"`, `role="option"`을 부여하여 스크린 리더 사용자가 현재 UI의 역할을 인지할 수 있게 합니다.