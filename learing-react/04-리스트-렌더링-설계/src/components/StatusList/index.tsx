import { useState } from 'react'
import dummyData from './data/dummy.json'
import type { Item } from './type/item'
import S from './style.module.css'

const DUMMY_DATA: Item[] = dummyData
const DELAY = 1500

export default function StatusList() {
  // 제어할 상태 선언
  // - 로딩(loading, isLoading, pending, isPending, ...) 상태
  // - 데이터(data, items, ...) 상태
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  // 데이터 로드 핸들러
  // - 로딩/데이터 상태 업데이트
  const handleFetchData = async () => {
    if (isLoading) return // 로딩 중이니까 작동되면 안됨!
    console.log('데이터 가져오기 요청')

    // 로딩중... 상태로 전환
    setIsLoading(true)
    
    try {
      // 비동기 통신 시뮬레이션 (1.5초)
      await new Promise((resolve) => setTimeout(resolve, DELAY))
      // 데이터 업데이트
      setItems(DUMMY_DATA)
    } catch {
      console.error('데이터 가져오기 실패!')
    } finally {
      // 로딩 종료 상태로 전환
      setIsLoading(false)
    }
  }

  // 데이터 초기화 핸들러
  // - 데이터 상태 초기화
  const handleReset = () => {
    if (isLoading) return

    console.log('데이터 초기화')
    setItems([])
  }
  

  return (
    <section className={S.container}>
      <h2 className="sr-only">상품 상태별 목록 확인</h2>

      <div role='status' aria-busy={isLoading} className={S.statusBox}>
        {/* 조건부 렌더링 화면 1: 로딩 중일 때 */}
        {isLoading && (
          <p className={S.loadingText}>
            데이터를 로딩 중입니다...
          </p>
        )}

        {/* 조건부 렌더링 화면 2: 로딩이 끝났고 데이터가 없을 때 */}
        {!isLoading && items.length === 0 && (
          <div className={S.emptyText}>
            <p>표시할 상품이 없습니다.</p>
            <p>아래 버튼을 눌러 데이터를 불러오세요.</p>
          </div>
        )}

        {/* 조건부 렌더링 화면 3: 데이터가 있을 때 */}
        {!isLoading && items.length > 0 && (
          <ul className={S.list}>
            {items.map((item) => (
              <li key={item.id} className={S.item}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div role="group" className={S.buttonGroup}>
        <button
          type="button"
          onClick={handleFetchData}
          aria-disabled={isLoading}
        >
          데이터 가져오기
        </button>
        <button
          type="button"
          onClick={handleReset}
          aria-disabled={isLoading}
        >
          데이터 초기화
        </button>
      </div>
    </section>
  )
}