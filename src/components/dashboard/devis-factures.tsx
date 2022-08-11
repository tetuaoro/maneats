import type { NextPage, InferGetStaticPropsType } from "next"
import Head from "next/head"
import { getAccount } from "@libs/firebase"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"
import { Card, Col, Row } from "react-bootstrap"

const title = sitename + " | MyDashboard - Compte"

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { account } = props

  return (
    <main className="container pt-3 pt-sm-5 bg-gray-300">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Compte</h1>
      <Row xs={1} sm={2} md={3} className="g-4 pt-5">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h2 className="h6">Nom</h2>
              <p>{account?.name}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h2 className="h6">Description</h2>
              <p>{account?.description}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h2 className="h6">Type de contrat</h2>
              <p>{account?.contratType}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h2 className="h6">Mise en ligne du contrat</h2>
              <p>{new Date(account && account.creationdate ? account.creationdate : "").toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <h2 className="h6">Fin du contrat</h2>
              <p>{account && account.enddate ? new Date(account.enddate).toLocaleString() : "indéterminé"}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </main>
  )
}

export const getStaticProps = async () => {
  try {
    const data = await getAccount()
    return { props: { account: data }, revalidate: 10 }
  } catch (error) {
    logger("err", error)
    return { props: { account: null }, revalidate: 10 }
  }
}

export default Page
