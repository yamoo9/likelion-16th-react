# Next.js 설치 및 기본 설정

Next.js는 React 기반의 웹 애플리케이션을 쉽게 개발할 수 있도록 도와주는 프레임워크입니다.  
아래는 Next.js를 설치하고 기본적인 설정을 적용하는 방법을 단계별로 설명한 내용입니다.

---

## 패키지 설치

Next.js 프로젝트 운영에 필요한 핵심 라이브러리와 스타일링, 코드 포맷팅을 위한 패키지들을 설치합니다.

### Next.js 설치

최신 버전의 Next.js, React, React DOM을 설치합니다.

```sh
bun add next@latest react@latest react-dom@latest
```

### Tailwind CSS 설치

추가적으로 스타일링을 위한 Tailwind CSS 관련 패키지를 설치합니다. ([참고](https://tailwindcss.com/docs/installation/framework-guides/nextjs))

```sh
bun add tailwindcss @tailwindcss/postcss postcss
```

### Prettier 설치

일관된 코드 스타일 유지 및 Tailwind CSS 클래스 자동 정렬을 위해 관련 패키지를 설치합니다.

```sh
bun add -d prettier prettier-plugin-tailwindcss
```

---

## `package.json` 설정

Next.js에서 자주 사용하는 스크립트를 `package.json` 파일에 추가해야 합니다. 
아래는 기본적으로 필요한 스크립트입니다.

```json
{
  "scripts": {
    "dev": "next dev",                  // 개발 서버 실행
    "build": "next build",              // 프로젝트 빌드
    "start": "next start",              // 빌드된 프로젝트 실행
    "lint": "eslint",                   // 코드 품질 검사
    "lint:fix": "eslint --fix",         // 코드 품질 문제 자동 수정
    "format": "prettier . --check",     // 전체 코드 스타일 검사
    "format:fix": "prettier . --write"  // 전체 코드 스타일 정렬
  }
}
```

이 스크립트를 통해 개발 서버를 실행하거나, 코드를 빌드하고 배포할 수 있습니다.

---

## next.config.js 설정

`next.config.ts`는 Next.js 프로젝트의 핵심 설정 파일입니다.  
아래는 기본적인 설정 예제입니다.

```ts
import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  // 더 나은 개발 경험을 위해 React 엄격 모드 활성화
  reactStrictMode: true,
  
  // 컴파일러 옵션 구성
  compiler: {
    // 프로덕션에서 console.log 제거 (개발 중에는 유지)
    removeConsole: isProduction ? { exclude: ['error', 'warn'] } : false,
  },
}

export default nextConfig
```

- `reactStrictMode`  
React의 엄격 모드를 활성화하여 잠재적인 문제를 사전에 감지합니다.
- `compiler`  
Next.js의 컴파일러 설정을 정의합니다.  
`removeConsole`: 프로덕션 환경에서 `console.log`를 제거하되, `error`와 `warn`은 유지합니다.

---

## PostCSS 설정

Next.js가 Tailwind CSS를 올바르게 처리할 수 있도록  
프로젝트 루트에 `postcss.config.mjs` 파일을 생성합니다.

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

## Prettier 설정

코드 스타일을 정의하기 위해 프로젝트 루트에 `prettier.config.mjs` 파일을 생성하고 아래 내용을 추가합니다.

```js
/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const prettierConfig = {
  // 사용할 플러그인 설정 (Tailwind 클래스 자동 정렬)
  plugins: ['prettier-plugin-tailwindcss'],
  // cn, clsx 등의 함수 내부 클래스도 정렬하도록 설정
  tailwindFunctions: ['cn', 'clsx', 'twMerge'],
  // 화살표 함수 식 매개변수 () 생략 여부 (ex: (a) => a)
  arrowParens: 'always',
  // 닫는 괄호(>) 위치 설정
  htmlWhitespaceSensitivity: 'css',
  bracketSameLine: false,
  // 객체 표기 괄호 사이 공백 추가 여부 (ex: { foo: bar })
  bracketSpacing: true,
  // 행폭 설정 (줄 길이가 설정 값보다 길어지면 자동 개행)
  printWidth: 80,
  // 산문 래핑 설정
  proseWrap: 'preserve',
  // 객체 속성 key 값에 인용 부호 사용 여부 (ex: { 'key': 'xkieo-xxxx' })
  quoteProps: 'as-needed',
  // 세미콜론(;) 사용 여부
  semi: false,
  // 싱글 인용 부호(') 사용 여부
  singleQuote: true,
  // 탭 너비 설정
  tabWidth: 2,
  // 객체 마지막 속성 선언 뒷 부분에 콤마 추가 여부
  trailingComma: 'all',
  // 탭 사용 여부
  useTabs: false,
}

export default prettierConfig
```

---

## 프로젝트 기본 파일 및 스타일 설정

Next.js 프로젝트의 주요 파일과 폴더를 설정하는 방법을 알아봅시다.

### 글로벌 CSS 설정

Tailwind CSS v4의 기능을 활성화하고 기본 테마를 정의합니다.

**`src/styles/globals.css`**

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

### 레이아웃 파일 생성

`src/app/layout.tsx` 파일은 애플리케이션의 기본 레이아웃을 정의하는 곳입니다.  
모든 페이지에서 공통으로 사용되는 HTML 구조를 여기에 작성할 수 있습니다.

```tsx
import '@/styles/globals.css'

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="ko-KR">
      <body className="overflow-y-scroll">
        {children}
      </body>
    </html>
  )
}
```

---

### 메인 페이지 파일 생성

`src/app/page.tsx` 파일은 애플리케이션의 메인 페이지를 정의합니다.

```tsx
export default function Page() {
  return (
    <header className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <h1 className="text-4xl text-slate-950 font-extralight">안녕 Next.js!</h1>
    </header>
  )
}
```

---

### 정적 파일 추가

`public` 폴더는 정적 파일(이미지, 폰트 등)을 보관하는 디렉토리입니다.  
예를 들어, `public/vercel.svg` 파일을 추가하면, 아래와 같이 SVG 이미지를 사용할 수 있습니다.

```xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000">
  <path d="m577.3 0 577.4 1000H0z" fill="#fff"/>
</svg>
```

이 이미지는 프로젝트에서 다음과 같이 사용할 수 있습니다.

```tsx
<img src="/vercel.svg" alt="Vercel 로고" />
```

---

## TypeScript 설정

Next.js는 TypeScript를 기본적으로 지원합니다.  
프로젝트에 TypeScript 설정을 추가하려면 `tsconfig.json` 파일을 생성하고 아래 내용을 추가하세요.

```json
{
  "compilerOptions": {
    "target": "ES2017",                        // 컴파일 대상 ECMAScript 버전
    "lib": ["dom", "dom.iterable", "esnext"],  // 사용할 라이브러리 (DOM, ESNext 등)
    "allowJs": true,                           // JS 파일 사용 허용
    "skipLibCheck": true,                      // 라이브러리 타입 검사 건너뛰기
    "strict": true,                            // 엄격한 타입 검사 (권장)
    "noEmit": true,                            // 컴파일된 파일 출력하지 않기
    "esModuleInterop": true,                   // ES 모듈과 CommonJS 호환 설정
    "module": "esnext",                        // ES 모듈 사용 (ESNext)
    "moduleResolution": "bundler",             // 모듈 해석 방식 (번들러 기반)
    "resolveJsonModule": true,                 // JSON 파일 임포트 허용
    "isolatedModules": true,                   // 개별 모듈 단위로 컴파일
    "jsx": "react-jsx",                        // React JSX 지원
    "incremental": true,                       // 점진적 컴파일 활성화 (빌드 속도 개선)
    "plugins": [
      {
        "name": "next"                         // Next.js 전용 플러그인
      }
    ],
    "baseUrl": ".",                            // 절대 경로의 기준 디렉토리 설정
    "paths": {
      "@/*": ["src/*"]                         // 절대 경로 별칭 설정
    }
  },
  "include": [
    "next-env.d.ts",                           // Next.js 환경 타입 선언 파일 포함
    "**/*.ts",                                 // 모든 TS 파일 포함
    "**/*.tsx",                                // 모든 TSX 파일 포함
    ".next/types/**/*.ts",                     // Next.js 타입 선언 파일 포함
    ".next/dev/types/**/*.ts",                 // Next.js 개발 타입 선언 파일 포함
    "**/*.mts"                                 // .mts 파일 포함 (ESM 모듈용)
  ],
  "exclude": ["node_modules"]                  // 제외할 디렉토리 (node_modules)
}
```

---

## ESLint 설정

코드 품질을 유지하기 위해 ESLint를 설정합니다.  
`eslint.config.mjs` 파일을 생성하고 다음 내용을 추가하세요.

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
```

- **`eslint-config-next`**: Next.js에 최적화된 ESLint 설정을 제공합니다.
- **`globalIgnores`**: 특정 파일 또는 폴더를 ESLint 검사에서 제외합니다.

---

## 프로젝트 구조

설치 및 설정 후 프로젝트의 기본 구조는 다음과 같습니다.

```
my-next-app/
├── public/
│   └── vercel.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── tsconfig.json
├── next.config.ts     
├── postcss.config.mjs 
├── prettier.config.mjs
└── eslint.config.mjs
```

---

## 개발 서버 실행

설치와 설정이 완료되었다면, 아래 명령어로 개발 서버를 실행하세요.

```sh
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하면 `안녕 Next.js!`라는 메시지가 표시됩니다.