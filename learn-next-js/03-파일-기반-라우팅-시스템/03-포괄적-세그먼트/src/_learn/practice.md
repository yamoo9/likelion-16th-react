# 포켓몬 도감 'PokeLog' 라우팅 디자인: 포괄적 세그먼트 편

Next.js의 App Router에서 경로의 깊이에 상관없이 모든 하위 주소를  
한 번에 가로채는 **포괄적 세그먼트(Catch-all Segments)** 를 학습합니다.

진화 계보나 복잡한 카테고리 필터처럼 URL 세그먼트가 가변적인 상황에서,  
단 하나의 파일(`[...slug]`)로 모든 경로를 배열 형태로 처리하는 구조를 설계해 봅시다.

## 실습 폴더 구조

아래 구조에 따라 파일을 생성하세요. 점 세 개(`...`)를 사용한 포괄적 경로가 추가되었습니다.

```sh
/*
  app/
  ├── layout.tsx             # [전체 공통] 서비스 로고 및 메인 네비게이션
  ├── page.tsx               # [/] 홈 - "포켓로그에 오신 것을 환영합니다!"
  │
  ├── evolution/             # [/evolution] 진화 계보 섹션
  │   ├── layout.tsx         
  │   │
  │   └── [...history]/      # ✨ [/evolution/pichu/pikachu/raichu] (포괄적 세그먼트)
  │       └── page.tsx       # - "진화 단계별(배열) 포켓몬 데이터 출력"
  │
  ├── search/                # [/search] 검색 및 필터 섹션
  │   ├── layout.tsx         
  │   │
  │   └── [[...filters]]/    # ✨ [/search/kanto/fire] (선택적 포괄적 세그먼트)
  │       └── page.tsx       # - "/search 자체와 모든 하위 필터 경로를 동시 처리"
  │
  └── settings/              
      └── page.tsx           
*/
```