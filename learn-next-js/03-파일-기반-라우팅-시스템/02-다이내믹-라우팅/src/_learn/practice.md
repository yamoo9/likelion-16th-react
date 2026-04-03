# 포켓몬 도감 'PokeLog' 라우팅 디자인: 다이내믹 라우트 편

Next.js의 App Router에서 가장 강력한 기능인 **동적 세그먼트(Dynamic Segments)**를 학습합니다.

수백 마리의 포켓몬 데이터를 각각의 파일로 만들지 않고, 대괄호(`[id]`)를 사용하여  
단 하나의 파일로 모든 상세 페이지를 처리하는 구조를 설계해 봅시다.

## 실습 폴더 구조

아래 구조에 따라 파일을 생성하세요. 대괄호(`[]`)를 사용한 동적 경로가 추가되었습니다.

```sh
/*
  app/
  ├── layout.tsx             # [전체 공통] 서비스 로고 및 메인 네비게이션
  ├── page.tsx               # [/] 홈 - "포켓로그에 오신 것을 환영합니다!"
  │
  ├── pokemon/               # [/pokemon] 도감 섹션
  │   ├── layout.tsx         
  │   ├── page.tsx           # [/pokemon] 전체 도감 목록 (1~100번)
  │   │
  │   └── [id]/              # ✨ [/pokemon/25] 포켓몬 상세 (다이내믹 라우팅)
  │       └── page.tsx       # - "포켓몬 [id]번의 상세 정보와 이미지"
  │
  ├── types/                 # [/types] 속성별 섹션
  │   ├── layout.tsx         
  │   ├── page.tsx           
  │   │
  │   └── [typeName]/        # ✨ [/types/fire] 속성 상세 (다이내믹 라우팅)
  │       └── page.tsx       # - "[typeName] 속성을 가진 포켓몬들"
  │
  └── my-collection/         
      └── page.tsx           
*/
```
