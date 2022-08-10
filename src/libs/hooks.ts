import { UserCredential } from "firebase/auth"
import { useState, useEffect } from "react"

export const isDeviceMobile = () => {
  const [isMobile, setDevice] = useState(false)
  useEffect(() => {
    navigator.userAgent.match("Android|iPhone|iPad") && setDevice(true)
  }, [])

  return [isMobile]
}

export const useTransition = () => {
  const [nodeList, setNodeList] = useState<NodeListOf<Element> | undefined>()

  const handleObserver = (e: IntersectionObserverEntry[]) => {
    e.forEach((element) => {
      if (element.isIntersecting) {
        const target = element.target as HTMLElement
        target.style.opacity = "1"
        if (target.tagName === "H3") target.style.transform = "translateX(0)"
        if (target.tagName === "IMG") target.style.transform = "scale(1)"
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver)
    nodeList ? nodeList.forEach((element) => observer.observe(element)) : setNodeList(document.querySelectorAll(".img-observer, .h3-observer"))
    return () => observer.disconnect()
  }, [nodeList])

  return
}
