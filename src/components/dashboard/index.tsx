import Link from "next/link"
import dynamic from "next/dynamic"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Alert, Container, Modal, Nav, Navbar, Offcanvas, Button } from "react-bootstrap"
import { sitename } from "@libs/app"
import { signOutMe } from "@libs/firebase"
import { modalState, authState, routeState, RouteField, componentState } from "@libs/atoms"

import type { RouteType } from "@libs/atoms"

import styles from "@styles/Dashboard.module.scss"

const NavbarOffcanvas = dynamic(() => import("react-bootstrap/NavbarOffcanvas"), { ssr: false })

const LoginBtn = () => {
  const auth = useRecoilValue(authState)
  const setModal = useSetRecoilState(modalState)

  const handleLogin = async () => {
    try {
      auth && (await signOutMe())
    } catch (error) {
      setModal({ text: "Une erreur est survenue !", variant: "danger" })
    }
  }
  return (
    <Button onClick={handleLogin} variant={auth ? "light" : "info"}>
      {auth ? "Deconnexion" : "Se connecter"}
    </Button>
  )
}

const Navs = () => {
  const setRoute = useSetRecoilState(routeState)
  const handleClick = (id: RouteType) => setRoute(id)

  return (
    <>
      <Nav.Item as="li">
        <LoginBtn />
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="#compte" onClick={() => handleClick(RouteField.ACCOUNT)} className="py-3">
          Compte
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="#services" onClick={() => handleClick(RouteField.SERVICES)} className="py-3">
          Services
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="#prices" onClick={() => handleClick(RouteField.PRICES)} className="py-3">
          Tarifs
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link href="#bills" onClick={() => handleClick(RouteField.BILLS)} className={`position-relative py-3 ${styles.badge}`} data-badge={3}>
          Devis/Factures
        </Nav.Link>
      </Nav.Item>
    </>
  )
}

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm" collapseOnSelect className="align-items-sm-start">
      <Container fluid className="flex-sm-column">
        <Link href="/">
          <Navbar.Brand href="/" className="mb-sm-5">
            {sitename}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <NavbarOffcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="bg-dark text-white h-100">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel" className="fs-1">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav as="ul" className="justify-content-end flex-sm-column flex-grow-1 pe-3">
                <Navs />
              </Nav>
            </Offcanvas.Body>
          </div>
        </NavbarOffcanvas>
      </Container>
    </Navbar>
  )
}

const Component = () => {
  const [{ text, variant }, ComponentState] = [useRecoilValue(modalState), useRecoilValue(componentState)]

  const onEnter = () => {
    const navbar: HTMLElement | null = document.querySelector(".navbar")
    const body: HTMLElement | null = document.querySelector("body")
    if (navbar) {
      navbar.style.paddingRight = ""
      navbar.style.marginRight = ""
    }
    if (body) {
      body.style.overflow = ""
      body.style.paddingRight = ""
    }
  }

  return (
    <>
      <Modal backdropClassName={`${styles.modalBackdrop}`} className={styles.modal} show={text.length > 0 ? true : false} dialogClassName="fixed-bottom" onEnter={onEnter}>
        <Modal.Body className="p-0">
          <Alert className="m-0" variant={variant || "info"}>
            {text}
          </Alert>
        </Modal.Body>
      </Modal>
      <div className="d-sm-flex">
        <Navigation />
        <ComponentState />
      </div>
    </>
  )
}

export default Component
