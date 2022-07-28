import "@styles/globals.scss"
import "@styles/globals.css"
import type { AppProps } from "next/app"
import Header from "@components/header"
import Footer from "@components/footer"

import { RecoilRoot } from "recoil"

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  )
}

export default App
