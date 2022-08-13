import type { User } from "firebase/auth"
import type { AccountData, ServiceData } from "./firebase"
import { onAuthStateChanged, getAccount, getServices } from "./firebase"
import { atom, selector } from "recoil"
import { Login, Account, Services } from "@components/dashboard/layouts"
import { logger } from "./helpers"

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

const proxyServicesState = atom<ServiceData[] | null>({
  key: "proxy-services-atom-state",
  default: null,
})

export const servicesState = selector<ServiceData[] | null>({
  key: "services-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      const services = get(proxyServicesState)
      if (services) return services
      return await getServices()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
  set: ({ get, set }, newState) => {
    if (get(authState)) set(proxyServicesState, newState)
  },
})

/* ROUTES & COMPONENTS */

export type RouteType = "Account" | "Login" | "Services"
type JSXElementType = () => JSX.Element

type RouteValuesType = {
  ACCOUNT: RouteType
  LOGIN: RouteType
  SERVICES: RouteType
}
export const ROUTE_VALUES: RouteValuesType = {
  ACCOUNT: "Account",
  LOGIN: "Login",
  SERVICES: "Services",
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
      case "Account":
        return Account
      case "Services":
        return Services
      default:
        return Account
    }
  },
})

/* MODAL */

type ModalType = {
  text: string
  variant?: "success" | "danger" | "info"
}

export const modalState = atom<ModalType>({
  key: "modal-atom-state",
  default: {
    text: "",
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet(({ variant }) => {
        let timeout = 3200
        switch (variant) {
          case "danger":
            timeout = 4300
            break
          case "success":
            timeout = 3800
            break
        }
        const id = setTimeout(() => {
          setSelf({ text: "" })
          clearTimeout(id)
        }, timeout)
      })
    },
  ],
})
