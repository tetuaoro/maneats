import type { ServiceData } from "./firebase"

export const exploitableServicesData = (data: ServiceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis(), updatedAt: d.updatedAt?.toMillis() }))

type LogCall = "warn" | "log" | "err" | "info"
export const logger = (call: LogCall, ...params: any[]) => {
  call === "log" && console.log(new Date().toString(), ...params)
  call === "err" && console.error(new Date().toString(), ...params)
  call === "info" && console.info(new Date().toString(), ...params)
  call === "warn" && console.warn(new Date().toString(), ...params)
}

export const parseIntWithThrow = (value: string) => {
  try {
    const result = parseInt(value, 10)
    if (isNaN(result)) throw new Error("NaN")
    return result
  } catch (error) {
    throw error
  }
}

// @depreciated
export const getFacebookURLWithThrow = async (fb_url: string, else_url?: string) => {
  try {
    const res = await fetch(fb_url)
    logger("log", res.status, res)
    if (res.status >= 400) throw new Error(`status ${res.status}`)
  } catch (error) {
    if (else_url && else_url.length > 0) {
      return else_url
    } else throw new Error("invalid fb_url: " + fb_url)
  }
}
