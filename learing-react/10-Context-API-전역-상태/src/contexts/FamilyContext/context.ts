import { createContext, type Dispatch, type SetStateAction } from "react"

interface FamilyContextValue {
  name: string
  email: string
  checked: boolean
  setName: Dispatch<SetStateAction<string>>
  setEmail: Dispatch<SetStateAction<string>>
  setChecked: Dispatch<SetStateAction<boolean>>
}

export const FamilyContext = createContext<FamilyContextValue|null>(null)