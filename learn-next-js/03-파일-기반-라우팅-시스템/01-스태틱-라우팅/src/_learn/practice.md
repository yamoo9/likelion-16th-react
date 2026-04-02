# 포켓몬 도감 'PokeLog' 라우팅 디자인: 기초 편

Next.js의 App Router를 사용하여 "나만의 포켓몬 도감" 서비스 구조를 설계합니다.  
폴더 구조가 곧 URL이 되고, `layout.tsx`가 어떻게 공통 디자인을 유지하는지 직접 구현해 봅시다.

## 실습 폴더 구조

아래 구조에 따라 파일을 생성하세요. 각 폴더는 포켓몬의 분류와 특정 카테고리를 담당합니다.

```sh
/*
  app/
  ├── layout.tsx             # [전체 공통] 서비스 로고(PokeLog), 메인 메뉴 (Home, Pokemon, Types)
  ├── page.tsx               # [/] 홈 - "포켓로그에 오신 것을 환영합니다! 모험을 시작하세요."
  │
  ├── pokemon/               # [/pokemon] 도감 섹션
  │   ├── layout.tsx         # [도감 전용 레이아웃] 세대별 필터 메뉴 (1세대, 2세대...)
  │   ├── page.tsx           # - "1세대 포켓몬 목록 (이상해씨, 파이리, 꼬부기 등)"
  │   └── starter/           # [/pokemon/starter] 스타팅 포켓몬 특집
  │       └── page.tsx       # - "모험의 시작을 함께할 스타팅 포켓몬 TOP 3"
  │
  ├── types/                 # [/types] 속성별 섹션
  │   ├── layout.tsx         # [타입 전용 레이아웃] 속성 아이콘 메뉴 (불꽃, 물, 전기)
  │   ├── page.tsx           # - "포켓몬의 속성별 상성을 확인하세요."
  │   ├── fire/              # [/types/fire] 불꽃 타입
  │   │   └── page.tsx       # - "파이리, 리자몽 등 뜨거운 불꽃 타입 모아보기"
  │   └── water/             # [/types/water] 물 타입
  │       └── page.tsx       # - "꼬부기, 고라파덕 등 시원한 물 타입 모아보기"
  │
  └── my-collection/         # [/my-collection] 나의 포켓몬 박스
      └── page.tsx           # - "내가 잡은 포켓몬 목록이 비어 있습니다."
*/
```
