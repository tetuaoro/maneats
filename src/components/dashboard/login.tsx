import type { NextPage } from "next"
import type { NextOrObserver, User } from "firebase/auth"
import Head from "next/head"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"
import { Button, Col, Form, Row } from "react-bootstrap"
import { FormEvent, FormEventHandler, useContext, useRef, useState } from "react"

import AppC from "@libs/context"
import { authentication } from "@libs/firebase"

const title = sitename + " | MyDashboard - Compte et Métrics"

const Page: NextPage = () => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const { setAuth, setModal } = useContext(AppC)
  const [validated, setValidated] = useState(false)

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
      if (!password) throw "no valid"
      const authenticationObserver: NextOrObserver<User> = (user) => {
        if (!user) {
          setAuth(null)
        }
      }
      const { userCredential } = await authentication(email?.value || "", password?.value || "", authenticationObserver)
      setAuth(userCredential)
    } catch (error) {
      logger("err", error)
      setModal("Le nom d'utilisateur ou le mot de passe est erroné !", 6000, "danger")
    }
  }

  return (
    <main className="container py-3 py-sm-5 bg-gray-300">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Se connecter</h1>
      <Row>
        <Col></Col>
        <Col sm={5} md={4}>
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

export default Page
