import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  // Next.js의 핵심 웹 지표(Core Web Vitals) 권장 규칙 적용
  ...nextVitals,
  
  // Next.js를 위한 TypeScript 전용 ESLint 규칙 적용
  ...nextTs,
  
  // 린트(Lint) 검사에서 제외할 파일 및 폴더 설정
  // (eslint-config-next의 기본 무시 설정을 재정의함)
  globalIgnores([
    '.next/**',       // Next.js 빌드 결과물 제외
    'out/**',         // 정적 배포물 제외
    'build/**',       // 일반 빌드 폴더 제외
    'next-env.d.ts',  // 자동 생성되는 타입 정의 파일 제외
  ]),

  {
    // 사용자 정의 규칙 설정
    rules: {
      // Next.js의 <Image> 컴포넌트 대신 <img> 태그 사용 시 발생하는 경고 끄기
      '@next/next/no-img-element': 'off'
    }
  }
])

export default eslintConfig