import { atom, selector } from "recoil"

import Login from "@components/dashboard/login"
import Account from "@components/dashboard/account"

export type RouteType = "Account" | "Login" | null
type JSXElementType = typeof Account | typeof Login

export const ROUTE_VALUES = {
  ACCOUNT: "Account",
  LOGIN: "Login",
}

export const routeState = atom<RouteType>({
  key: "route-atom-state",
  default: null,
})

export const componentState = selector<JSXElementType>({
  key: "component-selector-state",
  get: ({ get }) => {
    switch (get(routeState)) {
      case "Account":
        return Account
      default:
        return Login
    }
  },
})

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
      onSet(({ timeout }) => {
        const id = setTimeout(() => {
          resetSelf()
          clearTimeout(id)
        }, timeout || 3200)
      })
    },
  ],
})
