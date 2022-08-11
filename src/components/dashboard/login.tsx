import type { NextOrObserver, User } from "firebase/auth"
import type { FormEvent } from "react"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"
import { Button, Col, Form, Row } from "react-bootstrap"
import { useContext, useRef, useState } from "react"

import AppC from "@libs/context"
import { authentication } from "@libs/firebase"
import { useSetRecoilState } from "recoil"
import { modalAtomState } from "@libs/atoms"

const Component = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [validated, setValidated] = useState(false)

  const setModal = useSetRecoilState(modalAtomState)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      e.stopPropagation()

      if (!e.currentTarget.checkValidity()) {
        setValidated(true)
        throw "no valid"
      }

      const { current: email } = emailRef
      const { current: password } = passwordRef
      if (!email) throw "no valid"
      if (!password) throw "no valid"

      setModal({ show: true, text: `L'email est ${email.value} et le mot de passe est ${password.value}` })

      // const authenticationObserver: NextOrObserver<User> = (user) => {
      //   if (!user) {
      //     setAuth(null)
      //   }
      // }
      // const { userCredential } = await authentication(email?.value || "", password?.value || "", authenticationObserver)
      // setAuth(userCredential)
    } catch (error) {
      logger("err", error)
      setModal({ show: true, text: "Le nom d'utilisateur ou le mot de passe est erroné !", timeout: 6000, variant: "danger" })
    }
  }

  return (
    <main className="container py-2 py-sm-4 bg-gray-300">
      <h1>Se connecter</h1>
      <Row>
        <Col></Col>
        <Col sm={7}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Addresse email</Form.Label>
              <Form.Control ref={emailRef} type="email" placeholder="mon@email.com" required />
              <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control ref={passwordRef} type="password" placeholder="mon mot de passe" required />
              <Form.Control.Feedback type="invalid">Please provide a valid password. At least 8 characters of 2 numbers, 2 uppercases, 3 lowercases and one special character.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
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
