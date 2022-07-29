export const generateArray = (start: number, end: number, step: number) => {
  if (end <= start) return []
  const array = [start]
  let index = start + step
  while (index < end) {
    array.push(index)
    index += step
  }
  array.push(end)
  return array
}

type LogCall = "warn" | "log" | "err" | "info"
export const logger = (call: LogCall, ...params: any[]) => {
  call === "log" && console.log(new Date().toString(), ...params)
  call === "err" && console.error(new Date().toString(), ...params)
  call === "info" && console.info(new Date().toString(), ...params)
  call === "warn" && console.warn(new Date().toString(), ...params)
}
