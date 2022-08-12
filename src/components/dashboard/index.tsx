// import type { PropsWithChildren } from "react"
import type { MouseEvent } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Alert, Container, Modal, Nav, Navbar, Offcanvas, Button } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { sitename } from "@libs/app"
import { modalState, authState, routeState, ROUTE_VALUES, componentState } from "@libs/atoms"
import { signOutMe } from "@libs/firebase"

const NavbarOffcanvas = dynamic(() => import("react-bootstrap/NavbarOffcanvas"), { ssr: false })

const LoginBtn = () => {
  const auth = useRecoilValue(authState)
  const setModal = useSetRecoilState(modalState)

  const handleLogin = async () => {
    try {
      auth && (await signOutMe())
    } catch (error) {
      setModal({ text: "Une erreur est survenue !", timeout: 4200, variant: "danger" })
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

  const handleClick = (e: MouseEvent<HTMLLinkElement>) => {
    e.preventDefault()
    const { id } = e.target as any
    setRoute(id)
  }

  return (
    <>
      <Nav.Item as="li">
        <LoginBtn />
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link onClick={handleClick} id={ROUTE_VALUES.ACCOUNT} className="py-sm-3">
          Compte
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link onClick={handleClick} id={ROUTE_VALUES.ACCOUNT} className="py-sm-3">
          Services
        </Nav.Link>
      </Nav.Item>
      <Nav.Item as="li">
        <Nav.Link onClick={handleClick} id={ROUTE_VALUES.ACCOUNT} className="py-sm-3">
          Devis/Factures
        </Nav.Link>
      </Nav.Item>
    </>
  )
}

const Navigation = () => {
  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="sm" collapseOnSelect className="vh-sm-100 align-items-sm-start">
      <Container fluid className="flex-sm-column">
        <Link href="/">
          <Navbar.Brand href="/" className="mb-sm-5">
            {sitename}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <NavbarOffcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
        </NavbarOffcanvas>
      </Container>
    </Navbar>
  )
}

const Component = () => {
  const { text, variant } = useRecoilValue(modalState)
  const ComponentState = useRecoilValue(componentState)

  const onEnter = () => {
    const navbar: HTMLElement | null = document.querySelector(".navbar")
    if (navbar) {
      navbar.style.paddingRight = "0px"
      navbar.style.marginRight = "0px"
    }
  }

  return (
    <>
      <Modal show={text.length > 0 ? true : false} backdrop={false} dialogClassName="fixed-bottom" onEnter={onEnter}>
        <Modal.Body className="p-0">
          <Alert className="m-0" variant={variant}>
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
