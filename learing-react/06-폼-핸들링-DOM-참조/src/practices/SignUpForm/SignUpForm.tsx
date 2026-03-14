import S from './SignUpForm.module.css'

// MISSION.md 파일에서 요구하는 실습을 진행합니다.

export default function SignUpForm() {
  
  return (
    <section className={S.container}>
      <h2 className={S.title}>회원가입</h2>

      <form className={S.form} onSubmit={(e) => e.preventDefault()}>
        <div className={S.field}>
          <label htmlFor="username" className={S.label}>
            아이디 (한글 가능)
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="2글자 이상 입력"
            pattern=".{2,}" 
            className={S.input}
          />
          {/* 
            <span role="alert" className={S.errorText}>
		          {'아이디는 2글자 이상 입력합니다.'}
		        </span>
          */}
        </div>

        <div className={S.field}>
          <label htmlFor="email" className={S.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            className={S.input}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          {/* 
            <span role="alert" className={S.errorText}>
		          {'올바른 이메일 형식이 아닙니다.'}
		        </span>
          */}
        </div>

        <div className={S.field}>
          <label htmlFor="password" className={S.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="6자리 이상 입력"
            pattern=".{6,}" 
            className={S.input}
          />
          {/* 
            <span role="alert" className={S.errorText}>
		          {'비밀번호는 6자리 이상 입력해야 합니다.'}
		        </span>
          */}
        </div>

        <button
          type="submit"
          className={S.submitBtn}
        >
          {'가입' /* 또는 '처리 중...' */}
        </button>
      </form>
    </section>
  )
}
