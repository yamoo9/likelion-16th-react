import { createContext, useContext } from 'react'

type SetAction<T> = React.Dispatch<React.SetStateAction<T>>

interface FamilyContextValue {
  name: string
  setName: SetAction<string>
  email: string
  setEmail: SetAction<string>
  checked: boolean
  setChecked: SetAction<boolean>
}

export const FamilyContext = createContext<null | FamilyContextValue>(null)



// 컨텍스트 전용 커스텀 훅 함수 정의 후 내보내기
export const useFamily = () => {
  const familyContextValue = useContext(FamilyContext)

  if (!familyContextValue) {
    throw new Error('useFamily 훅은 FamilyProvider 내부에서만 사용해야 합니다.')
  }

  return familyContextValue
}