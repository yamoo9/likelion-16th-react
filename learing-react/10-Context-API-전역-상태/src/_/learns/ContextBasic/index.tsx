import { useState } from 'react'
import GrandFather from './parts/GrandFather'
import S from './style.module.css'

export default function ContextBasic() {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)

  const props = { name, setName, email, setEmail, checked, setChecked }

  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <GrandFather {...props} />
    </section>
  )
}
