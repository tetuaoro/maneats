import "@styles/globals.scss"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"

import Header from "@components/header"
import Footer from "@components/footer"

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const isDashboard = pathname.startsWith("/dashboard")

  return (
    <RecoilRoot>
      {!isDashboard && <Header />}
      <Component {...pageProps} />
      {!isDashboard && <Footer />}
    </RecoilRoot>
  )
}

export default App
