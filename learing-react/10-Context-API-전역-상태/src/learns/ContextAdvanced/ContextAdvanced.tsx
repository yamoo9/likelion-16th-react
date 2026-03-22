import { createContext, useState } from 'react'
import GrandFather from './parts/GrandFather'
import S from './ContextAdvanced.module.css'

type DispatchAction<T> = React.Dispatch<React.SetStateAction<T>>

interface FamilyContextValue {
  name: string
  email: string
  checked: boolean
  setName: DispatchAction<string>
  setEmail: DispatchAction<string>
  setChecked: DispatchAction<boolean>
}

// eslint-disable-next-line react-refresh/only-export-components
export const FamilyContext = createContext<null | FamilyContextValue>(null)

export default function ContextAdvanced() {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)

  const familyContextValue: FamilyContextValue = {
    name,
    setName,
    email,
    setEmail,
    checked,
    setChecked,
  }

  return (
    <section className={`${S.box} ${S.container}`}>
      <h1 className={S.title}>깊숙히 컴포넌트 Props 전달</h1>
      <FamilyContext.Provider value={familyContextValue}>
        <GrandFather />
      </FamilyContext.Provider>
    </section>
  )
}
