import { useState } from 'react'
import { FamilyContext } from './context'

export function FamilyProvider({ children }: React.PropsWithChildren) {
  const [name, setName] = useState('박하루')
  const [email, setEmail] = useState('haru@child.family')
  const [checked, setChecked] = useState(false)

  const familyContextValue = {
    name,
    setName,
    email,
    setEmail,
    checked,
    setChecked,
  }

  return (
    <FamilyContext.Provider value={familyContextValue}>
      {children}
    </FamilyContext.Provider>
  )
}
