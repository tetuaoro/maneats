import { onAuthStateChanged, getAccount, getServices, getPrices, getBills, getAd } from "./firebase"
import { atom, selector } from "recoil"
import { Login, Account, Services, Prices, Bills, Annoucement } from "@components/dashboard/layouts"
import { logger } from "./helpers"

import type { ComponentType } from "react"
import type { User } from "firebase/auth"
import type { AccountData, ServiceData, PriceData, BillData, AnnouncementData } from "./firebase"

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

/* ANNOUNCEMENT DATA WITH FIREBASE */

const proxyAdState = atom<AnnouncementData | null>({
  key: "proxy-ad-atom-state",
  default: null,
})

export const adState = selector<AnnouncementData | null>({
  key: "ad-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      const ad = get(proxyAdState)
      if (ad) return ad
      return await getAd()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
  set: ({ get, set }, newState) => {
    if (get(authState)) set(proxyAdState, newState)
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

/* PRICES DATA WITH FIREBASE */

const proxyPricesState = atom<PriceData[] | null>({
  key: "proxy-prices-atom-state",
  default: null,
})

export const pricesState = selector<PriceData[] | null>({
  key: "prices-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      const prices = get(proxyPricesState)
      if (prices) return prices
      return await getPrices()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
  set: ({ get, set }, newState) => {
    if (get(authState)) set(proxyPricesState, newState)
  },
})

/* BILLS DATA WITH FIREBASE */

const proxyBillsState = atom<BillData[] | null>({
  key: "proxy-bills-atom-state",
  default: null,
})

export const billsState = selector<BillData[] | null>({
  key: "bills-selector-state",
  get: async ({ get }) => {
    try {
      if (!get(authState)) return null
      const bills = get(proxyBillsState)
      if (bills) return bills
      return await getBills()
    } catch (error) {
      logger("err", error)
      return null
    }
  },
  set: ({ get, set }, newState) => {
    if (get(authState)) set(proxyBillsState, newState)
  },
})

/* ROUTES & COMPONENTS */

export type RouteType = "Account" | "Login" | "Services" | "Prices" | "Bills" | "Ad"
type JSXElementType = () => JSX.Element

type RouteFieldType = {
  ACCOUNT: RouteType
  LOGIN: RouteType
  SERVICES: RouteType
  PRICES: RouteType
  BILLS: RouteType
  AD: RouteType
}
export const RouteField: RouteFieldType = {
  ACCOUNT: "Account",
  LOGIN: "Login",
  SERVICES: "Services",
  PRICES: "Prices",
  BILLS: "Bills",
  AD: "Ad",
}

export const routeState = atom<RouteType | null>({
  key: "route-atom-state",
  default: null,
})

export const componentState = selector<JSXElementType | ComponentType<{}>>({
  key: "component-selector-state",
  get: ({ get }) => {
    if (!get(authState)) return Login
    switch (get(routeState)) {
      case "Account":
        return Account
      case "Services":
        return Services
      case "Prices":
        return Prices
      case "Bills":
        return Bills
      case "Ad":
        return Annoucement
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
