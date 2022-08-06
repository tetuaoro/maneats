import type { NextPage, InferGetStaticPropsType } from "next"
import type { ImageSrc, ServiceData } from "@libs/firebase"
import Head from "next/head"
import { getServiceDocs, updateServiceImage, updateServiceData } from "@libs/firebase"
import { sitename } from "@libs/app"
import { logger } from "@libs/functions"
import { Card, Col, Row } from "react-bootstrap"
import Image from "next/image"

import styles from "@styles/Service.module.scss"
import React, { useState } from "react"

const title = sitename + " | MyDashboard - Services"

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const [services, setServiceData] = useState(props.services)

  const handleImg = (e: any, id?: string) => {
    e.preventDefault()
    const imgFile: File = e.target.files[0]
    if (!imgFile) return

    const img = document.createElement("img")
    img.onload = async () => {
      const imageSrc: ImageSrc = {
        filename: imgFile.name + "-" + Date.now(),
        width: img.naturalWidth,
        height: img.naturalHeight,
        src: "",
      }

      const service = services?.find((s) => s.id === id)
      const data = structuredClone(service)
      await updateServiceImage(imageSrc, imgFile, data as ServiceData)
      const updatedServices = await getServiceDocs()
      setServiceData(updatedServices)
    }
    img.src = window.URL.createObjectURL(imgFile)
  }

  const handleChange = async (e: any, id?: string) => {
    const text: string = e.target.innerText
    const key: string = e.target.id
    if (text.length <= 0) return

    const data = { [key]: text }

    await updateServiceData(data, id || "")
  }

  return (
    <main className="container pt-3 pt-sm-5 bg-gray-300">
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <h1>Services</h1>
      <Row xs={1} sm={2} md={3} className="g-4 pt-5">
        {services?.map((service, k) => (
          <Col key={k}>
            <Card className="shadow">
              <label htmlFor={`for-card-img-${k}`}>
                <Image className={`card-img-top ${styles.cardImgForm}`} alt={service.name} width={service.imagesrc.width} height={service.imagesrc.height} src={service.imagesrc.src} />
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
            </Card>
          </Col>
        ))}
      </Row>
    </main>
  )
}

export const getStaticProps = async () => {
  try {
    const data = await getServiceDocs()
    return { props: { services: data }, revalidate: 120 }
  } catch (error) {
    logger("err", error)
    return { props: { services: null }, revalidate: 120 }
  }
}

export default Page
