import { getBillCounter } from "./firebase"

import type { ServiceData, PriceData, AnnouncementData } from "./firebase"

export const exploitableServicesData = (data: ServiceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis() || Date.now(), updatedAt: d.updatedAt?.toMillis() || Date.now() }))
export const exploitablePricesData = (data: PriceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis() || Date.now(), updatedAt: d.updatedAt?.toMillis() || Date.now() }))
export const exploitableAdData = (data: AnnouncementData) => ({ ...data, updatedAt: data.updatedAt?.toMillis() || Date.now() })

export const getFormatedFilenameDate = () => {
  const date = new Date()
  const concat = date.toDateString() + " " + date.getHours() + " " + date.getMinutes()
  return concat.replaceAll(" ", "_")
}

export const getBillName = async () => {
  const nd = new Date()
  const year = nd.getFullYear()
  const month = nd.getMonth() + 1
  try {
    const billCounter = await getBillCounter()
    return `# FAC${year}${month}-${billCounter + 1}`
  } catch (error) {
    return `# FAC${year}${month}-0002`
  }
}

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
