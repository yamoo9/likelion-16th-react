import RegisterForm from './RegisterForm'
import S from './style.module.css'

export default function ControlledComponent() {
  return (
    <div className={S.container}>
      <RegisterForm />
    </div>
  )
}
