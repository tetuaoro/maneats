import Link from "next/link"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { sitename } from "@libs/app"

const NavbarOffcanvas = dynamic(() => import("react-bootstrap/NavbarOffcanvas"), { ssr: false })

const Navigation = () => {
  const { pathname } = useRouter()
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
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-sm-column flex-grow-1 pe-3">
              <Link href="/dashboard">
                <Nav.Link as="a" href="/dashboard" className={`py-sm-3 ${pathname === "/dashboard" ? "active" : ""}`}>
                  Compte
                </Nav.Link>
              </Link>
              <Link href="/dashboard/services">
                <Nav.Link as="a" href="/dashboard/services" className={`py-sm-3 ${pathname === "/dashboard/services" ? "active" : ""}`}>
                  Services
                </Nav.Link>
              </Link>
              <Link href="/dashboard/devis-factures">
                <Nav.Link as="a" href="/dashboard/devis-factures" className={`py-sm-3 ${pathname === "/dashboard/devis-factures" ? "active" : ""}`}>
                  Devis/Factures
                </Nav.Link>
              </Link>
            </Nav>
          </Offcanvas.Body>
        </NavbarOffcanvas>
      </Container>
    </Navbar>
  )
}

export default Navigation
