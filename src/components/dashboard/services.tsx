import type { NextPage, InferGetStaticPropsType } from "next"
import type { Image, ServiceData } from "@libs/firebase"
import { Button, Card, Col, Row } from "react-bootstrap"
import NextImage from "next/image"
import Head from "next/head"
import { getServices, addServiceDoc, updateServiceDocImage, updateServiceDoc, removeServiceDoc } from "@libs/firebase"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"

import styles from "@styles/Service.module.scss"
import { useState } from "react"

const title = sitename + " | MyDashboard - Services"

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const [services, setServiceData] = useState(props.services)

  const updateServiceDataState = async () => {
    try {
      const updatedServices = await getServices()
      setServiceData(updatedServices)
    } catch (error) {
      throw error
    }
  }

  const handleImg = (e: any, id?: string) => {
    // const modalError = () => setModal("Erreur lors de la modification de l'image !")

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
          const state = await updateServiceDocImage(image, imgFile, data as ServiceData)
          if (state !== "success") throw "no success"
          await updateServiceDataState()
          // setModal("Image modifiée !", 2000, "success")
        } catch (error) {
          // modalError()
        }
      }

      img.src = window.URL.createObjectURL(imgFile)
    } catch (error) {
      // modalError()
    }
  }

  const handleChange = async (e: any, id?: string) => {
    try {
      if (!id) return
      const text: string = e.target.innerText
      const key: string = e.target.id
      if (text.length <= 0) return
      const data = { [key]: text }
      await updateServiceDoc(data, id)
    } catch (error) {
      logger("err", error)
    }
  }

  const addService = async () => {
    try {
      const creationdate = Date.now()
      const newservice: ServiceData = {
        name: "new service",
        description: "new description",
        image: {
          src: "/images/delivery_tahiti.png",
          width: 626,
          height: 454,
          filename: creationdate + "-delivery_tahiti.png",
        },
        creationdate,
      }
      await addServiceDoc(newservice)
      await updateServiceDataState()
    } catch (error) {
      // setModal("Erreur lors de l'ajout du service !", 4000, "danger")
    }
  }

  const removeService = async (id?: string) => {
    try {
      if (!id) return
      const service = services?.find((s) => s.id === id)
      await removeServiceDoc(service as ServiceData)
      await updateServiceDataState()
      // setModal("Service supprimé !", 2000, "success")
    } catch (error) {
      // setModal("Erreur lors de la suppression du service !", 4000, "danger")
    }
  }

  return (
    <main className="container pt-3 pt-sm-5 bg-gray-300">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Services</h1>
      <Button variant="dark" onClick={addService}>
        Ajouter un service
      </Button>
      <Row xs={1} sm={2} md={3} className="g-4 pt-5">
        {services?.map((service, k) => (
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

export const getStaticProps = async () => {
  try {
    const data = await getServices()
    return { props: { services: data }, revalidate: 10 }
  } catch (error) {
    logger("err", error)
    return { props: { services: null }, revalidate: 10 }
  }
}

export default Page
