import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { description, fbAppId, sitename, siteurl } from "@utils/siteinfos"
import Organization from "@utils/schema"

import HomeCss from "@styles/Home.module.css"
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
        <meta property="og:title" content={sitename} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${siteurl}/images/couverture.png`} />
        <meta property="og:image:width" content="720" />
        <meta property="og:image:height" content="482" />
        <script type="application/ld+json">{JSON.stringify(Organization)}</script>
      </Head>
      <h1>Accueil</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore at harum, similique, libero expedita quibusdam dolores sint id cumque exercitationem voluptas in cupiditate sequi voluptatem!
        Laborum eius tenetur architecto voluptate? Dolor odio, quasi quisquam molestiae, nisi adipisci quae culpa quod doloremque dolore totam, quo excepturi! Aut labore, exercitationem reiciendis
        ipsa itaque quidem obcaecati amet, magnam eveniet dolores consectetur nemo explicabo! Nam nesciunt, consectetur non voluptates aperiam, est nemo tenetur commodi numquam laudantium, cumque
        nihil. Modi quisquam reprehenderit culpa a voluptates beatae earum nisi, quis error quae inventore debitis, blanditiis dolorum. Saepe aliquid doloribus consectetur, soluta amet praesentium
        quaerat repellat molestiae eaque consequuntur adipisci architecto optio? Perferendis, quas. Sit repellat laboriosam nemo maxime iure quod, pariatur ut facilis molestias illum quisquam? Maiores
        recusandae sapiente placeat adipisci facilis quibusdam atque iusto necessitatibus illum aliquam temporibus minima reiciendis praesentium nisi corrupti molestiae veritatis, modi dignissimos qui
        beatae quo. Beatae earum totam quos facilis?
      </p>
      <Row className="pt-5">
        <Col sm={6}>
          <Image className={`observer ${HomeCss.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h2 id="lorem1">
              <a href="#lorem1">Lorem 1</a>
            </h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis obcaecati error iure repellat quam dignissimos tenetur quod facilis. Possimus eius id maxime nesciunt voluptates, nulla
              ratione laboriosam. Iste, non possimus!
            </p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="order-sm-2">
          <Image className={`observer ${HomeCss.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col sm={6}>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h2 id="lorem2">
              <a href="#lorem2">Lorem 2</a>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere fugit, magni quae inventore, reprehenderit voluptatibus ducimus magnam voluptas rerum velit. Earum tempora neque
              cumque explicabo facere eaque voluptates vero!
            </p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col sm={6}>
          <Image className={`observer ${HomeCss.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h2 id="lorem3">
              <a href="#lorem3">Lorem 3</a>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime reprehenderit, eum, mollitia, dolorum dolore doloremque unde nisi optio aut magnam eius! Voluptatum quisquam error harum
              cum labore! Deleniti, esse eveniet.
            </p>
          </article>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col className="order-sm-2">
          <Image className={`observer ${HomeCss.transition_opacity_y_scale}`} src={image1} alt="Livraison à Tahiti et dans les îles" />
        </Col>
        <Col sm={6}>
          <article className="d-sm-flex flex-sm-column justify-content-sm-center h-100">
            <h2 id="lorem4">
              <a href="#lorem4">Lorem 4</a>
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, nulla beatae ratione vero quidem quasi minus officia cumque esse consequuntur quam odit modi neque aperiam corporis.
              Obcaecati assumenda dolorem nisi.
            </p>
          </article>
        </Col>
      </Row>
    </main>
  )
}

export default Page
