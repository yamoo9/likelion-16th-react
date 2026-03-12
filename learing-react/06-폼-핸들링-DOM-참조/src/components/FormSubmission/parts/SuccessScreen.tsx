import S from './SuccessScreen.module.css'

interface SuccessMessageProps {
  onBack: () => void
}

export default function SuccessMessage({ onBack }: SuccessMessageProps) {
  return (
    <article className={S.card} role="region" aria-labelledby="success-title">
      <div className={S.content}>
        <CheckIcon />

        <header className={S.header}>
          <h2 id="success-title" className={S.title}>
            가입이 완료되었습니다!
          </h2>
          <p className={S.description}>
            축하합니다! 이제 모든 서비스를 <br />
            자유롭게 이용하실 수 있습니다.
          </p>
        </header>

        <button
          type="button"
          className={S.backButton}
          onClick={onBack}
          aria-label="가입 완료 메시지를 닫고 홈으로 돌아가기"
        >
          홈으로 돌아가기
        </button>
      </div>
    </article>
  )
}

const CheckIcon = () => (
  <div className={S.iconWrapper} aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={S.icon}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  </div>
)
