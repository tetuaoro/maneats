import type { NextPage } from "next"
import type { ServiceData } from "@libs/firebase"
import Head from "next/head"
import { sitename } from "@libs/app"
import { addServiceDoc, getServiceDocs, SERVICES_REF } from "@libs/firebase"
import { useEffect } from "react"
import { logger } from "@libs/functions"

const title = sitename + " | Dashbord"

interface PageProps {
  services: string | null
}

const Page: NextPage<PageProps> = (props) => {
  const services: ServiceData[] | null = props.services ? JSON.parse(props.services) : null

  useEffect(() => {
    if (!services) {
      const data: ServiceData = {
        subtitle: "Mon Sprite",
        imagesrc: "Mon image source",
        description: "Ma description",
        creationdate: Date.now(),
      }
      addServiceDoc(data)
    } else {
      logger("log", services)
    }
  })

  return (
    <main className="container pt-5">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>My Dashbord</h1>
      <ul>{services && services.map((doc, k) => <li key={k}>{doc.subtitle}</li>)}</ul>
    </main>
  )
}

export const getServerSideProps = async () => {
  try {
    const data = await getServiceDocs()
    return { props: { services: JSON.stringify(data) } }
  } catch (error) {
    logger("err", error)
    return { props: { services: null } }
  }
}

export default Page
