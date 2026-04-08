import { cn } from '@/utils'
import { Table } from './_resources/table'

/**
 * 패러럴 라우트 (Parallel Routes)
 * 
 * 단순하게 페이지를 병렬로 레이아웃에 추가할 때는 오히려 더 복잡하고 비효율적
 * (폴더 구조 복잡화: @slot 생성, default.tsx 관리, 중복 폴더 구조 등)
 * - /dashboard
 * - /dashboard/login
 * 
 * 하지만 Next.js의 이런 복잡한 구조를 통해 얻을 수 있는 강점은?
 * 
 * 1. 소프트 내비게이션 (모달/슬라이드 오버 구현 최적화)
 *    - 대시보드에서 차트를 보다가, '로그인 폼' 링크를 누른 경우
 *      - 일반 방식: 페이지 전체가 로그인으로 전환 (기존 차트/통계 화면 소멸)
 *      - 병렬 라우트 방식: URL은 /login으로 변경되지만, 기존 차트/통계 슬롯은 유지된 채 
 *                      특정 슬롯(@auth)만 로그인 폼으로 교체 (사용자 경험 향상)
 * 
 * 2. 구조적 조건부 렌더링
 *    - layout.tsx 내부에서 지저분한 삼항 연산자(isLoggedIn ? <A ... /> : <B ... />) 없이
 *      로그인 여부나 권한에 따라 슬롯(@auth vs @dashboard) 자체를 통째로 갈아끼우는 설계 가능
 * 
 * 3. 독립적 로딩과 에러 처리 (스트리밍)
 *    - 각 슬롯(@chart, @statistics 등)이 자신만의 loading.tsx와 error.tsx를 가짐
 *    - 데이터 로딩이 느린 차트 때문에 전체 페이지가 차단되지 않고, 
 *      준비된 부분부터 먼저 보여주는 점진적 렌더링(Streaming) 가능
 *    - 독립적 로딩의 장점은 대시보드처럼 무거운 쿼리가 많은 페이지에서, 
 *      특정 슬록이 에러가 나더라도 나머지 슬롯(통계, 사용자 정보 등)은 
 *      정상적으로 보여줄 수 있어 결함 격리가 가능
 * 
 * 4. 브라우저 기록(History) 관리
 *    - 모달을 띄웠음에도 고유 URL(/login)을 가지므로 '뒤로가기' 시 모달만 닫히고 
 *      이전 대시보드 상태를 유지하거나, 해당 URL을 공유하여 바로 모달을 띄우는 기능 구현 가능
 */

export default function DashboardLayout({
  children,    // {children} 화면에 배치
  statistics,  // {statistics} 화면에 배치
  chart,       // {chart} 화면에 배치
  auth,        // {auth} 화면에 배치
}: LayoutProps<'/dashboard'>) {
  return (
    <div className="flex flex-col items-start gap-4 border-4 border-stone-100 p-5">
      <Table />

      <strong
        className={cn(
          'rounded-full px-4 py-2',
          'border-blue-700 bg-blue-50 text-blue-600',
        )}
      >
        대시보드 레이아웃
      </strong>

      <div className="grid grid-cols-1 gap-4 self-stretch md:grid-cols-2">
        {/* 통계 페이지 */}
        {statistics}
        {/* 차트 페이지 */}
        {chart}
      </div>

      <div className="grid grid-cols-1 gap-4 self-stretch md:grid-cols-2">
        {/* 대시보드 페이지 */}
        {children}
        {/* 인증 페이지 */}
        {auth}
      </div>

    </div>
  )
}