import S from './style.module.css'

export default function Login() {
  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    console.log(email)
  }

  return (
    <div className={S.page}>
      <div className={S.box}>
        <h1>로그인</h1>
        <form className={S.form} onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            aria-label="이메일"
            defaultValue="yamoo9@naver.com"
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  )
}
