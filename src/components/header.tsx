import Image from "next/image"
import { useEffect, useRef } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import Style from "@styles/Header.module.css"
import { generateArray } from "@utils/functions"

const Header = () => {
  const coverPictureRef = useRef<HTMLElement>(null)
  const navbarRef = useRef<HTMLElement>(null)

  const handleCoverObserver = (e: IntersectionObserverEntry[]) => {
    const element: IntersectionObserverEntry = e[0]
    const target = element.target as HTMLElement
    const f = target.firstChild as HTMLElement
    target.style.opacity = `${element.intersectionRatio}`
    f.style.transform = `scale(${element.intersectionRatio})`
  }

  const handleNavbarObserver = (e: IntersectionObserverEntry[]) => {
    if (!navbarRef.current) return
    const element = navbarRef.current
    if (e[0].isIntersecting) {
      element.classList.add("bg-black")
      element.classList.remove("bg-primary")
    } else {
      element.classList.remove("bg-black")
      element.classList.add("bg-primary")
    }
  }

  useEffect(() => {
    if (!coverPictureRef.current || !navbarRef.current) return
    const element = coverPictureRef.current
    const ratios = generateArray(0.4, 1, 0.01).map((val) => new IntersectionObserver(handleCoverObserver, { threshold: val }))
    ratios.map((observer) => observer.observe(element))

    const observer = new IntersectionObserver(handleNavbarObserver)
    observer.observe(element)

    return () => {
      observer.disconnect()
      ratios.map((observer) => observer.disconnect())
    }
  }, [])

  return (
    <header className={Style.displayUnset}>
      <section ref={coverPictureRef} className={`d-flex justify-content-center bg-black ${Style.transition0}`}>
        <Image priority alt="Image de couverture de Manea Tahiti Services" src="/images/couverture.png" width={720} height={482} />
      </section>
      <Navbar ref={navbarRef} className={`border-top border-5 border-primary ${Style.transition03}`} bg="black" variant="dark" expand="sm" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#home">
            <Image priority alt="Logo de Manea Tahiti Services" src="/images/logo.png" width={60} height={60} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto align-items-center">
              <Nav.Link className="fs-5" href="#home">
                Home
              </Nav.Link>
              <Nav.Link className="fs-5" href="#link">
                Link
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
