import "@styles/globals.scss"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { RecoilRoot } from "recoil"

import Header from "@components/header"
import Footer from "@components/footer"
import { sitename } from "@libs/app"

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  if (process.env["NEXT_PUBLIC_UNDER_CONSTRUCTION"] === "true")
    return (
      <main className="vh-100 bg-primary text-center d-flex justify-content-center align-items-center">
        <p className="fs-1 text-white">{sitename} is under construction !</p>
      </main>
    )

  const isEmbed = pathname.startsWith("/dashboard") || pathname.startsWith("/offline")

  return (
    <RecoilRoot>
      {!isEmbed && <Header />}
      <Component {...pageProps} />
      {!isEmbed && <Footer />}
    </RecoilRoot>
  )
}

export default App
