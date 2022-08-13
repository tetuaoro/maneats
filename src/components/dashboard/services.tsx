import type { Image, ServiceData } from "@libs/firebase"
import { Button, Card, Col, Row } from "react-bootstrap"
import NextImage from "next/image"
import { getServices, addService as _addService, updateServiceImage, updateService, removeService as _removeService } from "@libs/firebase"
import { useRecoilValueLoadable, useSetRecoilState, useRecoilStateLoadable } from "recoil"
import { modalState, servicesState } from "@libs/atoms"
import { logger } from "@libs/helpers"

import styles from "@styles/Service.module.scss"

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

  const handleChange = async (e: any, id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const text: string = e.target.innerText
      const key: string = e.target.id
      if (text.length < 5) throw new Error("Doit contenir au moins 5 lettres !")
      const data = { [key]: text }
      await updateService(data, id)
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Une erreur est survenue !", variant: "danger" })
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
      await _removeService(service)
      await updateServiceDataState()
      setModal({ text: "Service supprimé !", variant: "success" })
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de la suppression du service !", variant: "danger" })
    }
  }

  return (
    <main className="container min-vh-100 py-2 py-sm-4 bg-gray-300">
      <h1>Services</h1>
      <Button variant="dark" onClick={addService}>
        Ajouter un service
      </Button>
      <Row xs={1} sm={2} md={3} className="g-4 pt-5">
        {state === "hasValue" &&
          services?.map((service, k) => (
            <Col key={k}>
              <Card className="shadow">
                <label htmlFor={`for-card-img-${k}`}>
                  <NextImage className={`card-img-top ${styles.cardImgForm}`} alt={service.name} width={service.image.width} height={service.image.height} src={service.image.src} />
                </label>
                <input onChange={(e) => handleImg(e, service.id)} className="d-none" accept="image/*" id={`for-card-img-${k}`} type="file" />
                <Card.Body>
                  <Card.Title contentEditable suppressContentEditableWarning id="name" onBlur={(e: any) => handleChange(e, service.id)}>
                    {service.name}
                  </Card.Title>
                  <Card.Text contentEditable suppressContentEditableWarning id="description" onBlur={(e: any) => handleChange(e, service.id)}>
                    {service.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button title="supprimé le service" size="sm" variant="danger" onClick={() => removeService(service.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </main>
  )
}

export default Component
