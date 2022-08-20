import type { InferGetStaticPropsType, NextPage } from "next"
import Head from "next/head"
import { Workbox } from "workbox-window"
import { useEffect } from "react"
import { description, fbAppId, sitename, siteurl } from "@libs/app"
import Organization from "@libs/schema"
import ServiceLayout from "@components/home/services"
import PriceLayout from "@components/home/prices"
import { getPrices, getServices } from "@libs/firebase"
import { exploitableServicesData, exploitablePricesData, logger } from "@libs/helpers"

const title = sitename + " - Le coursier de Tahiti et ses îles"

const MainLayout = () => {
  return (
    <>
      <h1 className="conthrax">Ton coursier à domicile</h1>

      <section className="py-3 py-sm-5">
        <p className="text-indent">
          {
            "Avez-vous déjà été bloqué dans les embouteillages, ou avez-vous dû planifier un voyage qui dépendait de la météo, et avez-vous déjà souhaité que tous vos colis soient livrés à votre porte ? Il ne s'agit pas seulement de commodité. C'est une question de sécurité et de tranquillité d'esprit. Vous ne voulez pas être absent de la ville lorsqu'une livraison importante arrive, n'est-ce pas ?"
          }
        </p>
        <p className="text-indent">
          {
            "Imaginez un monde où vous n'avez pas à craindre de manquer un colis important à cause de la météo. Imaginez que vous puissiez recevoir toutes vos livraisons dans un lieu sécurisé qui vous convienne, à vous et à votre emploi du temps. Ce monde est possible avec "
          }
          <span className="fw-bold text-primary">{sitename}</span>
          {
            ". Nous proposons des services de livraison pour toutes sortes de produits, des produits alimentaires aux fournitures de bureau en passant par les gros appareils électroménagers, et bien plus encore."
          }
        </p>
        <p className="text-indent">
          {
            "Que vous ayez besoin d'une livraison ou que vous souhaitiez simplement que quelqu'un s'en occupe pour vous, nous avons ce qu'il vous faut ! Nous offrons à la fois des options de ramassage et de livraison locaux, donc si vous cherchez quelqu'un qui peut ramasser vos courses au magasin ou les livrer directement à votre porte depuis Tahiti ou dans les îles, nous avons ce qu'il faut !"
          }
        </p>
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
            logger( "unregister sw", await registration.unregister())
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
      <PriceLayout prices={props.prices} />
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
