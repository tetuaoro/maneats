import { atom, selector } from "recoil"
import { getDocs } from "./firebase"
import { logger } from "./functions"

const serviceCollectionLoader = selector({
  key: "ServiceCollectionLoader",
  get: async () => {
    try {
      return await getDocs("services")
    } catch (error) {
    }
  },
})

export const serviceCollectionState = atom({
  key: "ServiceCollectionState",
  default: serviceCollectionLoader,
})
