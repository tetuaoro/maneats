import type { NextPage, InferGetStaticPropsType } from "next"
import { Button, Card, Col, Form, Row, Placeholder } from "react-bootstrap"
import { FormEvent, useContext } from "react"
import Head from "next/head"
import { getAccount } from "@libs/firebase"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"
import ModalC from "@libs/modal"

const title = sitename + " | MyDashboard - Compte et Métrics"

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { account } = props

  const { setModal } = useContext(ModalC)

  const handleForm = (e: FormEvent) => {
    e.preventDefault()
    setModal("Mot de passe modifié !")
  }

  return (
    <main className="container py-3 py-sm-5 bg-gray-300">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Compte et métrics</h1>
      <Card className="shadow mt-5">
        <Card.Body>
          <Form onSubmit={handleForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Utilisateur</Form.Label>
              <Form.Control type="email" value={account?.email} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Enregistrer
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 pt-5">
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
              <h2 className="h6">Début du contrat</h2>
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
      <hr className="mt-5" />
      <Row xs={1} sm={2} md={3} lg={4} className="g-4 pt-5">
        <Col>
          <Card>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} /> <Placeholder xs={8} />
              </Placeholder>
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
    return { props: { account: data }, revalidate: 120 }
  } catch (error) {
    logger("err", error)
    return { props: { account: null }, revalidate: 120 }
  }
}

export default Page
