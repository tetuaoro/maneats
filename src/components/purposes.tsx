import Image from "next/image"
import { Col, Row } from "react-bootstrap"

import styles from "@styles/Home.module.css"
import image1 from "@images/delivery_tahiti.png"

const Component = () => {
  return (
    <>
      <h2 id="propositions">
        <a href="#propositions">Nos propositions :</a>
      </h2>

      <section className="py-3 py-sm-5">
        <Row className="pt-3 pt-sm-5">
          <Col sm={6}>
            <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
          </Col>
          <Col>
            <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
              <h3 id="collecte">
                <a href="#collecte">- Collecte</a>
              </h3>
              <p>{"Collecte de vos achats dans tous les magasins de Tahiti de Papara à Papenoo, ou au domicile d'un particulier."}</p>
            </article>
          </Col>
        </Row>
        <Row className="pt-3 pt-sm-5">
          <Col className="order-sm-2">
            <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
          </Col>
          <Col sm={6}>
            <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
              <h3 id="livraison">
                <a href="#livraison">- Livraison</a>
              </h3>
              <p>
                {
                  "La livraison à domicile ou le fret aérien ou maritime pour les îles, les courses alimentaires, les courses administratives, le transport de 2 roues, de quads, le transport d'animaux, le transport de marchandises sur palette."
                }
              </p>
            </article>
          </Col>
        </Row>
        <Row className="pt-3 pt-sm-5">
          <Col sm={6}>
            <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
          </Col>
          <Col>
            <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
              <h3 id="demenagement">
                <a href="#demenagement">- Déménagement</a>
              </h3>
              <p>{"Les colis volumineux et l'électroménager : congélateur, réfrigérateur, lave-linge, four. Nous déménageons tous !"}</p>
            </article>
          </Col>
        </Row>
        <Row className="pt-3 pt-sm-5">
          <Col className="order-sm-2">
            <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
          </Col>
          <Col sm={6}>
            <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
              <h3 id="stockage">
                <a href="#stockage">- Stockage</a>
              </h3>
              <p>{"En partenariat avec un confrère qui stockera pour vous vos marchandises dans un conteneur sécurisé."}</p>
            </article>
          </Col>
        </Row>
      </section>
    </>
  )
}

export default Component
