import { useState, useEffect } from "react"
import { fbId } from "@libs/app"

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

export const useFacebookURL = () => {
  const [fb_url, setFbURL] = useState(`https://facebook.com/pg/${fbId}`)
  useEffect(() => {
    if (navigator.userAgent.match("Android|iPhone|iPad")) setFbURL(`fb://profile/${fbId}`)
  }, [])

  return [fb_url]
}
