import Head from "next/head"
import { Workbox } from "workbox-window"
import { useEffect } from "react"
import { description, fbAppId, sitename, siteurl } from "@libs/app"
import Organization from "@libs/schema"
import ServiceLayout from "@components/home/services"
import BillLayout from "@components/home/bills"
import { getPrices, getServices } from "@libs/firebase"
import { exploitableServicesData, exploitablePricesData, logger } from "@libs/helpers"

import type { InferGetStaticPropsType, NextPage } from "next"

const title = sitename + " - Le coursier de Tahiti et ses îles"

const MainLayout = () => {
  return (
    <>
      <h1 className="conthrax">Ton coursier à domicile</h1>

      <section className="py-3 py-sm-5">
        <p className="text-indent">
          {"Vous êtes "}
          <span className="text-primary fw-semibold">fiu</span>
          {" des bouchons "}
          <span className="text-primary fw-semibold">fiu</span>
          {
            " de vous déplacer car votre travail, votre vie familiale ou votre vie sociale vous prend du temps. Conscient désormais qu’à certaines heures de la journée circuler en ville peut devenir un calvaire. C’est parfois le cas dans d’autres communes."
          }
        </p>
        <p className="text-indent">{"Notre mission est de vous éviter tous les tracas liés aux déplacements sur l’ensemble de l’île de Tahiti."}</p>
      </section>
    </>
  )
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PWA_ENABLED) {
      logger("warn", "Pwa support is disabled")
      const ff = async () => {
        if ("serviceWorker" in navigator) {
          const registrations = await navigator.serviceWorker.getRegistrations()
          for (const registration of registrations) {
            logger("unregister sw", await registration.unregister())
          }
        }
      }

      ff()
      return
    }
    const wb = new Workbox("sw.js", { scope: "/" })
    const id = setTimeout(async () => {
      try {
        await wb.register()
      } catch (error) {
        logger("err", error)
      }
    }, 11000)

    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    <main className="container py-5">
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
      <MainLayout />
      <ServiceLayout services={props.services} />
      <BillLayout prices={props.prices} />
    </main>
  )
}

export const getStaticProps = async () => {
  try {
    const [services, prices] = await Promise.all([getServices(), getPrices()])
    return { props: { services: exploitableServicesData(services), prices: exploitablePricesData(prices) }, revalidate: 60 }
  } catch (error) {
    logger("err", error)
    return { props: { services: null, prices: null }, revalidate: 60 }
  }
}

export default Page
