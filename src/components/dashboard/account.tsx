import type { FormEvent } from "react"
import type { AccountData } from "@libs/firebase"
import { useState, useRef } from "react"
import { Button, Card, Col, Form, Row, Placeholder } from "react-bootstrap"
import { updateAuthenticationPassword } from "@libs/firebase"
import { useSetRecoilState, useRecoilValueLoadable } from "recoil"
import { accountState, modalState } from "@libs/atoms"

type PasswordComponentProps = {
  account: AccountData | null
}

const regexPassword = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!-\/@]){1,}).{8,}$/

const PasswordComponent = (props: PasswordComponentProps) => {
  const { account } = props
  const setModal = useSetRecoilState(modalState)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [validated, setValidated] = useState(false)

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { current: password } = passwordRef
      if (!account || !password || !regexPassword.test(password.value) || !e.currentTarget.checkValidity()) {
        setValidated(true)
        throw "no valid"
      }
      await updateAuthenticationPassword(password.value)
      setModal({ text: "Mot de passe modifié avec succès !", variant: "success" })
    } catch (error) {
      setModal({ text: "Erreur lors de la modification du mot de passe !", variant: "danger" })
    }
  }

  return (
    <Card className="shadow mt-5">
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder={account?.email} disabled readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control ref={passwordRef} type="password" pattern={regexPassword.toString().slice(1, -1)} required />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be minimum 8 characters long : 2 numbers, 2 uppercases, 3 lowercases and one special character.
            </Form.Text>
            <Form.Control.Feedback type="invalid">Please provide a valid password. At least 8 characters of 2 numbers, 2 uppercases, 3 lowercases and one special character.</Form.Control.Feedback>
          </Form.Group>
          <Button variant="dark" type="submit">
            Modifier mon mot de passe
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

const PlaceholderText = () => {
  return (
    <>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={10} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={5} /> <Placeholder xs={6} />
      </Placeholder>
    </>
  )
}

const Component = () => {
  const { state, contents } = useRecoilValueLoadable(accountState)
  const account = contents as AccountData | null
  return (
    <main className="w-100 min-vh-100 p-3 p-sm-4 bg-gray-300">
      <h1>Compte et métrics</h1>
      <PasswordComponent account={account} />
      <Row xs={1} sm={2} md={3} className="g-4 pt-5">
        {state !== "hasValue" && <PlaceholderText />}
        {state === "hasValue" && (
          <>
            <Col>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="h6">Nom</Card.Title>
                  <Card.Text>{account?.name}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="h6">Description</Card.Title>
                  <Card.Text>{account?.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="h6">Type de contrat</Card.Title>
                  <Card.Text>{account?.contractType}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title className="h6">Début | Fin du contrat</Card.Title>
                  <Card.Text>
                    {account && account.createdAt ? account.createdAt.toDate().toLocaleDateString() : "indéterminé"}
                    {" | "}
                    {account && account.endedAt ? account.endedAt.toDate().toLocaleDateString() : "indéterminé"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </main>
  )
}

export default Component
