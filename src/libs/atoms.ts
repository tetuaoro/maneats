import type { User } from "firebase/auth"
import type { AccountData, ServiceData } from "./firebase"
import { onAuthStateChanged, getAccount, getServices } from "./firebase"
import { atom, selector } from "recoil"

import Login from "@components/dashboard/login"
import Account from "@components/dashboard/account"
import { logger } from "./functions"

/* AUTHENTICATION WITH FIREBASE */

export const authState = atom<User | null>({
  key: "auth-atom-state",
  default: null,
  effects: [
    ({ setSelf }) => {
      try {
        const unsubscribe = onAuthStateChanged((user) => setSelf(user ? JSON.parse(JSON.stringify(user)) : user))
        return () => {
          setSelf(null)
          unsubscribe()
        }
      } catch (error) {
        logger("err", error)
        setSelf(null)
      }
    },
  ],
})

/* ACCOUNT DATA WITH FIREBASE */

export const accountState = selector<AccountData | null>({
  key: "account-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      return await getAccount()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
})

/* SERVICES DATA WITH FIREBASE */

export const servicesState = selector<ServiceData[] | null>({
  key: "services-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      return await getServices()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
})

/* ROUTES & COMPONENTS */

export type RouteType = "Account" | "Login"
type JSXElementType = typeof Account | typeof Login

type RouteValuesType = {
  ACCOUNT: RouteType
  LOGIN: RouteType
}
export const ROUTE_VALUES: RouteValuesType = {
  ACCOUNT: "Account",
  LOGIN: "Login",
}

export const routeState = atom<RouteType | null>({
  key: "route-atom-state",
  default: null,
})

export const componentState = selector<JSXElementType>({
  key: "component-selector-state",
  get: ({ get }) => {
    if (!get(authState)) return Login
    switch (get(routeState)) {
      default:
        return Account
    }
  },
})

/* MODAL */

type ModalType = {
  text: string
  variant?: string
  timeout?: number
}

export const modalState = atom<ModalType>({
  key: "modal-atom-state",
  default: {
    text: "",
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet(({ timeout }) => {
        const id = setTimeout(() => {
          setSelf({ text: "" })
          clearTimeout(id)
        }, timeout || 3200)
      })
    },
  ],
})
