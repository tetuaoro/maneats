import { useState, useRef } from "react"
import { Button, Card, Form, Placeholder } from "react-bootstrap"
import { updateAd } from "@libs/firebase"
import { useSetRecoilState, useRecoilValueLoadable } from "recoil"
import { adState, modalState } from "@libs/atoms"
import EmbedLayout from "@components/dashboard/layouts"

import type { FormEvent } from "react"
import type { AnnouncementData } from "@libs/firebase"

type AnnouncementProps = {
  ad: AnnouncementData | null
}

const AnnouncementForm = (props: AnnouncementProps) => {
  const { ad } = props
  const setModal = useSetRecoilState(modalState)
  const messageRef = useRef<HTMLTextAreaElement | null>(null)
  const titleRef = useRef<HTMLInputElement | null>(null)
  const [validated, setValidated] = useState(false)

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const { current: message } = messageRef
      const { current: title } = titleRef
      if (!ad || !message || !title || !e.currentTarget.checkValidity()) {
        setValidated(true)
        throw "no valid"
      }
      const data: AnnouncementData = {
        title: title.value,
        message: message.value,
      }
      await updateAd(data)
      setModal({ text: "Annonce enregistrée avec succès !", variant: "success" })
    } catch (error) {
      setModal({ text: "Erreur lors de l'enregistrement de l'annonce !", variant: "danger" })
    }
  }

  return (
    <Card className="shadow mt-5">
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleForm}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Titre</Form.Label>
            <Form.Control type="text" ref={titleRef} defaultValue={ad?.title} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={4} ref={messageRef} defaultValue={ad?.message} />
          </Form.Group>
          <Button variant="dark" type="submit">
            {"Enregistrer l'annonce"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

const Component = () => {
  const { state, contents } = useRecoilValueLoadable(adState)
  const ad = contents as AnnouncementData | null
  return (
    <EmbedLayout>
      <h1>Annonce</h1>
      <AnnouncementForm ad={ad} />
    </EmbedLayout>
  )
}

export default Component
