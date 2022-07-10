import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useRef } from "react"
import { Row, Col, Card } from "react-bootstrap"
import { description, sitename, siteurl } from "@utils/siteinfos"
import Organization from "@utils/schema"

import HomeCss from "@styles/Home.module.css"

import example from "@images/example.svg"
import around from "@images/around.png"

const Page: NextPage = () => {
  const handleCardObserver = (e: IntersectionObserverEntry[]) => {
    e.forEach((element) => {
      console.log(element)
      if (element.isIntersecting) {
        const target = element.target as HTMLElement
        target.style.opacity = "1"
        target.style.transform = "scale(1)"
      }
    })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleCardObserver)
    document.querySelectorAll(".card").forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="container pt-5">
      <Head>
        <title>{sitename}</title>
        <meta name="description" content={description} />
        <meta property="fb:app_id" content="" />
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
        <Col sm={6}></Col>
        <Col>
          <Card as="article" className={`${HomeCss.card} border-0`}>
            <Card.Title as="h2">Livraisons</Card.Title>
            <Image src={around} alt="Livraison à Tahiti et dans les îles" />
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit necessitatibus impedit eveniet veniam voluptates minus maiores aut delectus quod? Eum tempore sunt rem debitis.
              Vero sit tempore laudantium eum quidem?
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col sm={6}>
          <Card as="article" className={`${HomeCss.card} border-0`}>
            <Card.Title as="h2">{"Déplacement"}</Card.Title>
            <Image src={example} alt="Example sample" />
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit necessitatibus impedit eveniet veniam voluptates minus maiores aut delectus quod? Eum tempore sunt rem debitis.
              Vero sit tempore laudantium eum quidem?
            </Card.Text>
          </Card>
        </Col>
        <Col></Col>
      </Row>
      <Row className="pt-5">
        <Col sm={6}></Col>
        <Col>
          <Card as="article" className={`${HomeCss.card} border-0`}>
            <Card.Title as="h2">Courses</Card.Title>
            <Image src={around} alt="Livraison à Tahiti et dans les îles" />
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit necessitatibus impedit eveniet veniam voluptates minus maiores aut delectus quod? Eum tempore sunt rem debitis.
              Vero sit tempore laudantium eum quidem?
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col sm={6}>
          <Card as="article" className={`${HomeCss.card} border-0`}>
            <Card.Title as="h2">{"À Tahiti et dans les îles"}</Card.Title>
            <Image src={example} alt="Example sample" />
            <Card.Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit necessitatibus impedit eveniet veniam voluptates minus maiores aut delectus quod? Eum tempore sunt rem debitis.
              Vero sit tempore laudantium eum quidem?
            </Card.Text>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </main>
  )
}

export default Page
