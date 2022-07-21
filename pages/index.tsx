import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { description, fbAppId, sitename, siteurl } from "@utils/siteinfos"
import Organization from "@utils/schema"

import styles from "@styles/Home.module.css"
import image1 from "@images/delivery_tahiti.png"

const title = sitename + " - Le coursier de Tahiti et ses îles"

const Page: NextPage = () => {
  const handleCardObserver = (e: IntersectionObserverEntry[]) => {
    e.forEach((element) => {
      if (element.isIntersecting) {
        const target = element.target as HTMLElement
        target.style.opacity = "1"
        target.style.transform = "scale(1)"
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleCardObserver)
    document.querySelectorAll(".observer").forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="container pt-5">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="fb:app_id" content={`${fbAppId}`} />
        <meta property="og:url" content={siteurl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteurl}/images/couverture.png`} />
        <meta property="og:image:alt" content={`Le logo officiel de ${sitename}`} />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="482" />
        <script type="application/ld+json">{JSON.stringify(Organization)}</script>
      </Head>
      <h1>Accueil</h1>
      <p className={styles.indent}>
        {`Avez-vous déjà été bloqué dans les embouteillages, ou avez-vous dû planifier un voyage qui dépendait de la météo, et avez-vous déjà souhaité que tous vos colis soient livrés à votre porte ? Il
        ne s'agit pas seulement de commodité. C'est une question de sécurité et de tranquillité d'esprit. Vous ne voulez pas être absent de la ville lorsqu'une livraison importante arrive, n'est-ce
        pas ? `}
      </p>
      <p className={styles.indent}>
        {`Imaginez un monde où vous n'avez pas à craindre de manquer un colis important à cause de la météo. Imaginez que vous puissiez recevoir toutes vos livraisons dans un lieu sécurisé qui
        vous convienne, à vous et à votre emploi du temps. Ce monde est possible avec `}
        <span className="fw-bold text-primary">{sitename}</span>
        {`. Nous proposons des services de livraison pour toutes sortes de produits, des produits alimentaires aux
        fournitures de bureau en passant par les gros appareils électroménagers, et bien plus encore.
      `}
      </p>
      <p className={styles.indent}>
        {`  Que vous ayez besoin d'une livraison ou que vous souhaitiez simplement que quelqu'un s'en occupe pour vous, nous avons ce qu'il vous faut ! Nous offrons à la fois des options de ramassage et
        de livraison locaux, donc si vous cherchez quelqu'un qui peut ramasser vos courses au magasin ou les livrer directement à votre porte depuis Tahiti ou dans les îles, nous avons ce qu'il faut !
      `}
      </p>
      <h2 className="pt-3">Nos propositions :</h2>
      <Row className="pt-5">
        <Col sm={6}>
          <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h3 id="lorem1">
              <a href="#collecte">Collecte</a>
            </h3>
            <p>{"- Collecte de vos achats dans tous les magasins de Tahiti de Papara à Papenoo, ou au domicile d'un particulier."}</p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="order-sm-2">
          <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col sm={6}>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h3 id="lorem2">
              <a href="#livraison">Livraison</a>
            </h3>
            <p>
              {`- La livraison à domicile ou le fret aérien ou maritime pour les îles, les courses alimentaires, les courses administratives, le transport de 2 roues, de quads, le transport d'animaux,
              le transport de marchandises sur palette.`}
            </p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col sm={6}>
          <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h3 id="lorem3">
              <a href="#demenagement">{"Déménagement"}</a>
            </h3>
            <p>{"- Les colis volumineux et l'électroménager : congélateur, réfrigérateur, lave-linge, four."}</p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="order-sm-2">
          <Image className={`observer ${styles.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col sm={6}>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h3 id="lorem4">
              <a href="#partenariat">Partenariat</a>
            </h3>
            <p>{"- En partenariat avec un collègue qui stockera pour vous vos marchandises dans un conteneur sécurisé."}</p>
          </article>
        </Col>
      </Row>
      <p className="fs-6 text-muted py-5">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="align-text-sub text-warning me-3 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
        {"Pour rappel, pour toute demande de prix, veuillez préciser clairement : la nature des affaires ou des colis et leurs quantités ; les lieux de récupération et de livraison."}
      </p>
    </main>
  )
}

export default Page
