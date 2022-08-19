import NextImage from "next/image"
import { Button, Card, Col, Row } from "react-bootstrap"
import { getServices, addService as _addService, updateServiceImage, updateService, removeService as _removeService } from "@libs/firebase"
import { useSetRecoilState, useRecoilStateLoadable } from "recoil"
import { modalState, servicesState } from "@libs/atoms"
import { logger } from "@libs/helpers"
import EmbedLayout from "@components/dashboard/layouts"

import type { KeyboardEvent } from "react"
import type { Image, ServiceData } from "@libs/firebase"

import styles from "@styles/Services.module.scss"

const Component = () => {
  const [{ state, contents }, setServiceData] = useRecoilStateLoadable(servicesState)
  const services = contents as ServiceData[] | null
  const setModal = useSetRecoilState(modalState)

  const updateServiceDataState = async () => {
    try {
      const updatedServices = await getServices()
      setServiceData(updatedServices)
    } catch (error) {
      throw error
    }
  }

  const handleImg = (e: any, id?: string) => {
    const modalError = (error?: any) => {
      logger("err", error)
      setModal({ variant: "danger", text: "Erreur lors de la modification de l'image !" })
    }

    try {
      e.preventDefault()
      const imgFile: File = e.target.files[0]
      if (!imgFile) return

      const img = document.createElement("img")
      img.onload = async () => {
        try {
          const image: Image = {
            filename: Date.now() + "-" + imgFile.name,
            width: img.naturalWidth,
            height: img.naturalHeight,
            src: "",
          }

          const service = services?.find((s) => s.id === id)
          const data = structuredClone(service)
          await updateServiceImage(image, imgFile, data as ServiceData)
          await updateServiceDataState()
          setModal({ text: "Image modifiée !", variant: "success" })
        } catch (error) {
          modalError(error)
        }
      }

      img.src = window.URL.createObjectURL(imgFile)
    } catch (error) {
      modalError(error)
    }
  }

  const addService = async () => {
    try {
      const newservice: ServiceData = {
        name: "new service",
        description: "new description",
        image: {
          src: "/images/delivery_tahiti.png",
          width: 626,
          height: 454,
          filename: Date.now() + "-delivery_tahiti.png",
        },
      }
      await _addService(newservice)
      await updateServiceDataState()
    } catch (error) {
      logger("err", error)
      setModal({ text: "Erreur lors de l'ajout du service !", variant: "danger" })
    }
  }

  const removeService = async (id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const service = services?.find((s) => s.id === id)
      if (!service) throw new Error("Aucun service !")
      await _removeService(id)
      await updateServiceDataState()
      setModal({ text: "Service supprimé !", variant: "success" })
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de la suppression du service !", variant: "danger" })
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault()
      e.target.setAttribute("contenteditable", "false")
    }
  }

  const onBlur = async (e: any, id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const text: string = e.target.innerText
      const key: string = e.target.id
      if (text.length < 5) throw new Error("Doit contenir au moins 5 lettres !")
      const data = { [key]: text }
      await updateService(data, id)
      document.querySelectorAll("[contenteditable='false']").forEach((e) => e.setAttribute("contenteditable", "true"))
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Une erreur est survenue !", variant: "danger" })
    }
  }

  return (
    <EmbedLayout>
      <h1>Services</h1>
      <Button variant="dark" onClick={addService}>
        Ajouter un service
      </Button>
      {state === "hasValue" && services ? (
        <Row xs={1} sm={2} md={3} className="g-4 pt-5">
          {services.map((service, k) => (
            <Col key={k}>
              <Card className="shadow">
                <label className={styles.cardLabelForm} htmlFor={`for-card-img-${k}`}>
                  <NextImage className={`card-img-top ${styles.cardImgForm}`} alt={service.name} width={service.image.width} height={service.image.height} src={service.image.src} />
                </label>
                <input onChange={(e) => handleImg(e, service.id)} className="d-none" accept="image/*" id={`for-card-img-${k}`} type="file" />
                <Card.Body>
                  <Card.Title
                    id="name"
                    className={`p-1 p-sm-2 ${styles.contentEditable}`}
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={onKeyDown}
                    onBlur={(e: any) => onBlur(e, service.id)}
                  >
                    {service.name}
                  </Card.Title>
                  <Card.Text
                    id="description"
                    className={`p-1 p-sm-2 ${styles.contentEditable}`}
                    contentEditable
                    suppressContentEditableWarning
                    onKeyDown={onKeyDown}
                    onBlur={(e: any) => onBlur(e, service.id)}
                  >
                    {service.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button size="sm" variant="danger" onClick={() => removeService(service.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="mt-5 shadow">
          <Card.Body>
            <span>Aucun service. </span>
            <span onClick={addService} className="link-info">
              Ajouter en un
            </span>
          </Card.Body>
        </Card>
      )}
    </EmbedLayout>
  )
}

export default Component
