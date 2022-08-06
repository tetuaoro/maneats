import { createContext } from "react"

const ModalContext = createContext({
  setModal: (_text: string, _timeout?: number) => {},
})

export default ModalContext
