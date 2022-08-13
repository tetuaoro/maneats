import type { FormEvent } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useRef, useState } from "react"
import { useSetRecoilState } from "recoil"
import { modalState, authState } from "@libs/atoms"
import { loginWithEmail } from "@libs/firebase"

const Component = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [validated, setValidated] = useState(false)

  const setAuth = useSetRecoilState(authState)
  const setModal = useSetRecoilState(modalState)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { current: email } = emailRef
      const { current: password } = passwordRef
      if (!email || !password || !e.currentTarget.checkValidity()) {
        setValidated(true)
        throw "no valid"
      }
      await loginWithEmail(email.value, password.value)
    } catch (error) {
      setModal({ text: "Le nom d'utilisateur ou le mot de passe est erroné !", variant: "danger" })
    }
  }

  return (
    <main className="container min-vh-100 py-2 py-sm-4 bg-gray-300">
      <h1>Se connecter</h1>
      <Row>
        <Col></Col>
        <Col sm={7}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Addresse email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="mon@email.com" required />
              <Form.Control.Feedback type="invalid">The email could be incorrect, please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="mon mot de passe" required />
              <Form.Control.Feedback type="invalid">
                The password could be incorrect, please provide a valid password. At least 8 characters of 2 numbers, 2 uppercases, 3 lowercases and one special character.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="info" type="submit">
              Connexion
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </main>
  )
}

export default Component
