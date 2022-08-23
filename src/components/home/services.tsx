import Image from "next/image"
import { Col, Row } from "react-bootstrap"
import { exploitableServicesData } from "@libs/helpers"
import { useTransition } from "@libs/hooks"

import styles from "@styles/Home.module.css"

type Props = {
  services: ReturnType<typeof exploitableServicesData> | null
}
const Component = (props: Props) => {
  const { services } = props

  useTransition()

  return (
    <>
      <h2 id="nosservices" className="conthrax">
        <a href="#nosservices">Nos services</a>
      </h2>

      <p className="text-indent">{"Nous nous déplaçons, à votre demande, et ce afin de vous faciliter la vie en vous proposant nos divers services :"}</p>

      <section className="py-3 py-sm-5">
        {services?.map((service, k) => (
          <Row key={k} className="pt-3 pt-sm-5">
            <Col className={`${k % 2 === 0 ? "" : "order-sm-2"}`}>
              <Image className={`img-observer ${styles.transition_opacity_y_scale}`} src={service.image.src} alt={service.image.filename} width={service.image.width} height={service.image.height} />
            </Col>
            <Col sm={6}>
              <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
                <h3 className={`h3-observer conthrax ${styles.transition_opacity_y_translateX}`} id={service.name.replace(" ", "").toLowerCase()}>
                  <a href={`#${service.name.replace(" ", "").toLowerCase()}`}>- {service.name}</a>
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
