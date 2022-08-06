import Link from "next/link"
import { useRouter } from "next/router"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"

function Header() {
  const { pathname } = useRouter()
  return (
      <Navbar sticky="top" bg="dark" variant="dark" expand="sm" collapseOnSelect className="vh-sm-100 align-items-sm-start">
        <Container fluid className="flex-sm-column">
          <Navbar.Brand href="/" className="mb-sm-5">
            Manea tahiti services
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas className="text-bg-dark" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
  )
}

export default Header
