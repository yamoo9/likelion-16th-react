## 실습 1. Context API를 활용한 로그인 상태 전역 관리

**목표**: `AuthContext`와 `useAuth` 훅을 구현하여 애플리케이션 어디서든 로그인 상태에 접근하고 제어할 수 있는 환경을 구축합니다.

### **1. 타입 정의 (TypeScript)**
- **User 인터페이스**: 사용자 식별을 위한 `id`, 인증을 위한 `accessToken`, `refreshToken`, 그리고 선택적 정보인 `name`, `email`을 포함합니다.
- **AuthContextType 타입**: 현재 로그인된 `user` 상태와, 로그인을 수행하는 `login` 함수, 상태를 초기화하는 `logout` 함수를 정의합니다.

### **2. Context 생성 및 공급**
- `createContext`를 사용하여 `AuthContext`를 생성하고 초기값은 `null`로 설정합니다.
- `AuthProvider` 컴포넌트를 작성하여 `user` 상태를 `useState`로 관리하고, `login/logout` 로직을 구현합니다.
- **React 19 특이사항**: `AuthContext.Provider` 대신 `AuthContext` 자체를 컴포넌트로 사용할 수 있습니다. (`<AuthContext value={...}>`)

### **3. 커스텀 훅 작성**
- `useAuth` 훅을 만들어 `use` (또는 `useContext`)를 호출합니다.
- 컨텍스트 값이 `null`인 경우(Provider 밖에서 호출된 경우) 명확한 에러 메시지를 던져 디버깅을 돕습니다.

### **4. Provider 적용**
- `main.tsx` 또는 `App.tsx`에서 최상위 트리를 `AuthProvider`로 감싸 전역 상태를 활성화합니다.

<br />

---

<br />

## 실습 2. 비동기 인증 로직 및 API 연동

**목표**: 실제 API 통신을 담당하는 서비스 함수를 작성하고, 이를 Context와 연결하여 인증 흐름을 완성합니다.

### **1. API 서비스 함수 구현 (`auth.ts`)**
- **login 함수**: `id`, `password`를 받아 서버에 POST 요청을 보냅니다. 이때 토큰 만료 시간(`ATExp`, `RTExp`)을 옵션으로 설정할 수 있도록 인터페이스를 구성합니다.
- **refreshToken 함수**: 액세스 토큰이 만료되었을 때, 저장된 리프레시 토큰을 헤더에 담아 새로운 토큰을 요청하는 로직을 작성합니다.

### **2. 인증 상태 업데이트 로직 연결**
- `AuthProvider` 내의 `login` 함수에서 위에서 만든 `authLogin` API를 호출합니다.
- 서버로부터 받은 `accessToken`과 `refreshToken`을 `user` 상태에 저장하여 애플리케이션 전체에 공유합니다.

### **3. 환경 변수 및 유틸리티 활용**
- `import.meta.env.VITE_API_URL`을 사용하여 API 베이스 주소를 관리합니다.
- 공통 `request` 유틸리티를 사용하여 중복되는 fetch 로직을 줄이고 타입 안정성을 확보합니다.