import { readLikes } from '@/functions/likes-read-write' // 서버 함수 (Next.js 서버에서 실행)
import LikeButton from './like-button' // 클라이언트 컴포넌트

// 1. 서버 컴포넌트 - (READ) 요청 -> 서버 함수
// 2. 서버 컴포넌트 <- (DATA) 응답 - 서버 함수
// 3. 서버 컴포넌트 - (DATA) 전달 - 클라이언트 컴포넌트
// 4. 클라이언트 컴포넌트 - 전달된 (DATA)로 상태 초기화
// 5. 클라이언트 컴포넌트 <- 사용자 상호작용 (click)
// 6. 클라이언트 컴포넌트 - (UPDATE) 실행 -> 서버 함수 ('use server')
// 7. 서버 함수 - (WRITE) 실행 -> likes.json 파일 수정
// 8. 서버 컴포넌트 - 렌더링 (SERVER) -> 클라이언트 컴포넌트에 props 전달
// 9. 클라이언트 컴포넌트 - 렌더링 (SERVER) -> HTML 생성, 전달받은 props를 토대로 JS 청크 생성
// 10. JS 청크 - 전송 (BROWSER) -> 브라우저 실행 (Hydration, 수화)
// 11. 서버 컴포넌트로부터 전달된 데이터 값으로 탣로 React에 의해 메모리 상에서 관리

export default async function PassingData() {
  // 서버 컴포넌트 (비동기 함수 사용 가능)

  // 서버 함수 readLikes()를 실행해
  // 결과 값을 클라이언트 컴포넌트에 전달
  const currentLikes = await readLikes()
  
  // 서버에서 렌더링된 날짜 정보
  const renderedTime = new Date().toISOString()

  return (
    <section className="flex flex-col items-center justify-center p-24">
      <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-rose-600">
          Next.js 데이터 전달
        </h2>
        <p className="mb-8 text-sm text-gray-600">
          아래 버튼을 누르면 서버의
          <code className="mx-0.5 rounded bg-gray-100 px-1.5 py-0.5 text-rose-600">
            likes.json
          </code>
          파일이 업데이트됩니다.
        </p>

        {/* 클라이언트 컴포넌트에 데이터 전달(passing data) */}
        <LikeButton initialLikes={currentLikes} />

        <p className="mt-6 font-mono text-xs text-gray-400">
          서버 사이드 데이터 = {currentLikes}
        </p>
        <p className="mt-6 font-mono text-xs text-gray-400">
          서버 렌더링 타임 = <time dateTime={renderedTime}>{renderedTime}</time>
        </p>
      </div>
    </section>
  )
}
