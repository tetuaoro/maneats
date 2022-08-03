import type { NextPage } from "next"
import type { ServiceData } from "@libs/firebase"
import Head from "next/head"
import { sitename } from "@libs/app"
import { getServiceDocs } from "@libs/firebase"
import { logger } from "@libs/functions"
import MenuSideBar from "@components/sidemenu"

const title = sitename + " | MyDashboard - Devis et factures"

interface PageProps {
  services: string | null
}

const Page: NextPage<PageProps> = (props) => {
  const services: ServiceData[] | null = props.services ? JSON.parse(props.services) : null

  return (
    <div className="d-flex">
      <MenuSideBar />
      <main className="container pt-3 pt-sm-5">
        <Head>
          <title>{title}</title>
          <meta name="robots" content="noindex" />
        </Head>
        <h1>Devis et factures</h1>
        <ul>{services && services.map((doc, k) => <li key={k}>{doc.name}</li>)}</ul>
      </main>
    </div>
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
