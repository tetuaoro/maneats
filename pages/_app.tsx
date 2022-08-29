import "@styles/globals.scss"
import { useRouter } from "next/router"
import Head from "next/head"
import { RecoilRoot } from "recoil"

import Header from "@components/header"
import Footer from "@components/footer"
import { description, fbAppId, sitename, siteurl } from "@libs/app"
import Organization from "@libs/schema"

import type { AppProps } from "next/app"
const title = sitename + " - Le coursier de Tahiti et ses îles"

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  if (process.env["NEXT_PUBLIC_UNDER_CONSTRUCTION"] === "true")
    return (
      <>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="fb:app_id" content={`${fbAppId}`} />
          <meta property="og:url" content={siteurl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`${siteurl}/images/media_cover.png`} />
          <meta property="og:image:alt" content={`Le logo officiel de ${sitename}`} />
          <meta property="og:image:width" content="720" />
          <meta property="og:image:height" content="482" />
          <meta property="og:image:type" content="image/png" />
          <script type="application/ld+json">{JSON.stringify(Organization)}</script>
        </Head>
        <main className="vh-100 bg-primary text-center d-flex justify-content-center align-items-center">
          <p className="fs-1 text-white">{sitename} is under construction !</p>
        </main>
      </>
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
