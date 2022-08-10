import type { UserCredential } from "firebase/auth"
import type { Dispatch, SetStateAction } from "react"
import { createContext } from "react"

const AppContext = createContext<{
  setModal: (_text: string, _timeout?: number, _variant?: string) => void
  setAuth: Dispatch<SetStateAction<UserCredential | null>>
  auth: UserCredential | null
}>({
  setModal: (_text: string, _timeout?: number) => {},
  setAuth: () => {},
  auth: null,
})

export default AppContext
