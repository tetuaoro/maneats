import "@styles/globals.scss"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"

import Header from "@components/header"
import Footer from "@components/footer"

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  if (pathname.startsWith("/dashboard")) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
