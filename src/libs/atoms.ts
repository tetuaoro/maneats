import { atom } from "recoil"
import { logger } from "./functions"

type ModalStateType = {
  text: string
  show: boolean
  variant?: string
  timeout?: number
}

export const modalAtomState = atom<ModalStateType>({
  key: "modal-atom-state",
  default: {
    show: false,
    text: "",
  },
  effects: [
    ({ onSet, resetSelf }) => {
      let id: NodeJS.Timeout | null = null
      onSet(({ timeout }) => {
        id = setTimeout(() => resetSelf(), timeout || 3200)
      })

      return () => id && clearTimeout(id)
    },
  ],
})
