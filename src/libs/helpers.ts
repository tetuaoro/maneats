import type { ServiceData } from "./firebase"

export const exploitableServicesData = (data: ServiceData[]) => data.map((d) => ({ ...d, createdAt: d.createdAt?.toMillis(), updatedAt: d.updatedAt?.toMillis() }))

type LogCall = "warn" | "log" | "err" | "info"
export const logger = (call: LogCall, ...params: any[]) => {
  call === "log" && console.log(new Date().toString(), ...params)
  call === "err" && console.error(new Date().toString(), ...params)
  call === "info" && console.info(new Date().toString(), ...params)
  call === "warn" && console.warn(new Date().toString(), ...params)
}
