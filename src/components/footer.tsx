import { Container, Nav } from "react-bootstrap"
import { email, fbId, raoLink, sitename, telephone } from "@libs/app"
import { isDeviceMobile } from "@libs/hooks"

const Footer = () => {
  const [isMobile] = isDeviceMobile()

  return (
    <footer className="bg-dark border-top border-primary border-5 text-white">
      <Container className="conthrax pt-130 pb-5">
        <h2 className="h1 mb-0">TEVA</h2>
        <hr className="border border-2 border-primary opacity-100" />
        <a href={`tel:${telephone}`}>{telephone}</a>
        <div>
          <a href={isMobile ? `fb://profile/${fbId}` : `https://facebook.com/pg/${fbId}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
            </svg>
            <span className="ms-2">{sitename}</span>
          </a>
        </div>
        <div>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
        <hr className="border border-2 border-primary opacity-75" />
        <p className="conthrax small">{"N° Tahiti : 919373 - RC : 091541A"}</p>
      </Container>
      <Container fluid className="d-flex justify-content-center">
        <Nav>
          <Nav.Item>
            <Nav.Link href="#" className="small">
              Conditions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="small">
              {"Confidentialité"}
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="small position-relative" href={`${raoLink}`} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bouncingglobe bi bi-globe" viewBox="0 0 16 16">
                <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
              </svg>
              <span className="ms-4">{"Licence © 2022 Tous droits réservés"}</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </footer>
  )
}

export default Footer
