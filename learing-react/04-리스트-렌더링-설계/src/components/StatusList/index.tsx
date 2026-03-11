import S from './style.module.css'

export default function StatusList() {
  // 제어할 상태 선언
  // - 로딩 상태
  // - 데이터 상태

  // 데이터 로드 핸들러
  // - 비동기 통신 시뮬레이션 (1.5초)
  // - 로딩/데이터 상태 업데이트

  // 초기화 핸들러
  // - 데이터 상태 초기화

  return (
    <section className={S.container}>
      <h2 className="sr-only">상품 상태별 목록 확인</h2>

      {/* 조건부 렌더링 1: 로딩 중일 때 */}
      {/* 조건부 렌더링 2: 로딩이 끝났고 데이터가 없을 때 */}
      {/* 조건부 렌더링 3: 데이터가 있을 때 */}

      {/* 데이터 가져오기 */}
      {/* 데이터 초기화 */}
    </section>
  )
}
