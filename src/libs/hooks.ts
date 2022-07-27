import { useState, useEffect } from "react"

const isDeviceMobile = () => {
  const [isMobile, setDevice] = useState(false)
  useEffect(() => {
    navigator.userAgent.match("Android|iPhone|iPad") && setDevice(true)
  }, [])

  return [isMobile]
}

export { isDeviceMobile }
