import type { NextPage } from "next"
import Head from "next/head"
import Component from "@components/dashboard"
import { sitename } from "@libs/app"

const title = sitename + " | MyDashboard"

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Component />
    </>
  )
}

export default Page
