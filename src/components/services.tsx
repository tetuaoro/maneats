import type { ServiceData } from "@libs/firebase"
import Image from "next/image"
import { Col, Row } from "react-bootstrap"
import { useTransition } from "@libs/hooks"

import styles from "@styles/Home.module.css"

type Props = {
  services: ServiceData[] | null
}
const Component = (props: Props) => {
  const { services } = props

  useTransition()

  return (
    <>
      <h2 id="propositions" className="conthrax">
        <a href="#propositions">Nos propositions :</a>
      </h2>

      <section className="py-3 py-sm-5">
        {services?.map((service, k) => (
          <Row key={k} className="pt-3 pt-sm-5">
            <Col className={`col-sm-6 ${k % 2 === 0 ? "" : "order-sm-2"}`}>
              <Image
                className={`img-observer ${styles.transition_opacity_y_scale}`}
                src={service.imagesrc.src}
                alt={service.imagesrc.filename}
                width={service.imagesrc.width}
                height={service.imagesrc.height}
              />
            </Col>
            <Col>
              <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
                <h3 className={`h3-observer conthrax ${styles.transition_opacity_y_translateX}`} id={service.name.toLowerCase()}>
                  <a href={`#${service.name.toLowerCase()}`}>- {service.name}</a>
                </h3>
                <p>{service.description}</p>
              </article>
            </Col>
          </Row>
        ))}
      </section>
    </>
  )
}

export default Component
