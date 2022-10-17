import Image from "next/image"
import { Col, Row, Card } from "react-bootstrap"
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
        {services?.map(({ description, image: { src, filename, width, height }, name }, k) => (
          <Row key={k} className="pt-3 pt-sm-5">
            <Col>
              <Card className="border-0">
                <Card.Img as={Image} src={src} alt={filename} width={width} height={height} />
                <Card.ImgOverlay className={styles.imgAfter}>
                  <Card.Title className="fs-1">{name}</Card.Title>
                  <Card.Text className="fs-3">{description}</Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </Row>
        ))}
      </section>
    </>
  )
}

export default Component
