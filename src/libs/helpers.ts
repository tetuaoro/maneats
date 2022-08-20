import type { ServiceData, PriceData } from "./firebase"

export const exploitableServicesData = (data: ServiceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis(), updatedAt: d.updatedAt?.toMillis() }))
export const exploitablePricesData = (data: PriceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis(), updatedAt: d.updatedAt?.toMillis() }))

export const logger = (...params: any[]) => {
  const call = params[0]
  const date = new Date().toLocaleString()
  if (call === "err") console.error(date, ...params.slice(1))
  else if (call === "info") console.info(date, ...params.slice(1))
  else if (call === "warn") console.warn(date, ...params.slice(1))
  else console.log(date, ...params)
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

export const shuffleString = (str: string) =>
  str
    .split("")
    .sort(function () {
      return 0.5 - Math.random()
    })
    .join("")
