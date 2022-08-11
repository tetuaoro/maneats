import type { Variant } from "react-bootstrap/esm/types"
import type { UserCredential } from "firebase/auth"
import type { Dispatch, SetStateAction } from "react"
import { createContext } from "react"

export type ModalParams = {
  text: string
  timeout?: number
  variant?: Variant
}

const AppContext = createContext<{
  setModal: (params: ModalParams) => void
  setAuth: Dispatch<SetStateAction<UserCredential | null>>
  auth: UserCredential | null
}>({
  setModal: () => {},
  setAuth: () => {},
  auth: null,
})

export default AppContext
