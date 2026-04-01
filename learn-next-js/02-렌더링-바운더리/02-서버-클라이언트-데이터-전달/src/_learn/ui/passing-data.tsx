import LikeButton from './like-button'

export default async function PassingData() {
  
  // 서버 함수 readLikes()를 실행해 
  // 결과 값을 클라이언트 컴포넌트에 전달
  const currentLikes = 0

  return (
    <section className="flex flex-col items-center justify-center p-24">
      <div className="rounded-2xl border border-gray-100 bg-white p-10 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold text-rose-600">
          Next.js 데이터 전달
        </h2>
        <p className="mb-8 text-sm text-gray-600">
          아래 버튼을 누르면 서버의 
          <code className="rounded bg-gray-100 px-1.5 py-0.5 mx-0.5 text-rose-600">
            likes.json
          </code>
          파일이 업데이트됩니다.
        </p>

        <LikeButton initialLikes={currentLikes} />

        <p className="mt-6 font-mono text-xs text-gray-400">
          서버 사이드 데이터 = {currentLikes}
        </p>
      </div>
    </section>
  )
}
