import S from './style.module.css'

export default function NotFound() {

  return (
    <section className={S.container}>
      <div className={S.content}>
        <h1 className={S.errorCode}>404</h1>
        <h2 className={S.title}>페이지를 찾을 수 없습니다</h2>
        <p className={S.description}>
          존재하지 않는 주소이거나, 페이지가 이동되었을 수 있습니다. <br />
          입력하신 주소가 정확한지 다시 한번 확인해 주세요.
        </p>
        <div className={S.actions}>
          <button
            type="button"
            className={S.homeButton}
            onClick={() => console.log('홈 페이지로 이동')}
          >
            홈으로 돌아가기
          </button>
          <button
            type="button"
            className={S.backButton}
            onClick={() => console.log('이전 페이지로 이동')}
          >
            이전 페이지
          </button>
        </div>
      </div>
    </section>
  )
}
