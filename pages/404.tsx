import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

import page404Img from "@images/page_404.png"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      center: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
    }
  }
}

const Error404Page: NextPage = () => {
  return (
    <main className="container pt-5">
      <Head>
        <title>404 Page</title>
      </Head>
      <center>
        <h1>OUPS !!</h1>
        <p className="fs-5">{"Il semble que cette page n'existe pas ou a été déplacée !"}</p>
        <Image src={page404Img} alt="Page 404" />
      </center>
    </main>
  )
}

export default Error404Page
