import "@styles/globals.scss"
import "@styles/globals.css"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { Workbox } from "workbox-window"
import Header from "@components/header"
import Footer from "@components/footer"

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      console.warn("Pwa support is disabled")
      return
    }
    const wb = new Workbox("sw.js", { scope: "/" })
    wb.register()
  }, [])
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
