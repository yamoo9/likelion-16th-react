## 실습 요구사항

### 목표: JSON 데이터를 활용한 상품 리스트 구현

#### 사용자 인터페이스

구현해야 할 화면을 확인하세요.

<img src="./MISSION.png" alt height="500" />

#### 실습 가이드

1. **데이터 및 타입 준비**  
    - `data` 폴더의 Mock 데이터와 TypeScript 타입을 확인하고 적절히 임포트하여 사용합니다.
2. **컴포넌트 설계(구조화)**  
    - `ProductPage`: 전체 상태를 관리하고 데이터를 하위 컴포넌트로 전달합니다.
    - `ProductList`: 전달받은 상품 배열을 순회하여 상품 목록을 표시합니다.
    - `ProductCard`: 개별 상품의 이미지, 이름, 가격 정보를 표시합니다.
3. **기능 요구사항**  
    - 리스트 렌더링: 배열의 `.map()`을 사용하여 상품 목록을 출력합니다.
    - 각 상품 카드에는 고유한 `id`를 `key`로 적용합니다.
    - 가격은 `.toLocaleString()`을 사용하여 천 단위 콤마를 표시합니다.
4. **스타일링 (CSS Modules)**  
    - `styles` 폴더 내부에 제공된 `*.module.css` 파일을 활용합니다.
    - 제공된 스타일 코드를 참고해 컴포넌트를 스타일링 합니다.


#### 참고

아래 컴포넌트 트리 구조를 참고하세요.

```sh
.
├── MISSION.md
├── components/
│   ├── ProductCard.module.css
│   ├── ProductCard.tsx
│   ├── ProductList.module.css
│   └── ProductList.tsx
├── data/
│   ├── mock.ts
│   └── types.ts
├── pages/
│   └── product/
│       ├── index.tsx
│       └── style.module.css
└── utils/
    └── getPexelmage.ts
```