import Image from "next/image"
import Link from "next/link"
import { Container, Navbar } from "react-bootstrap"
import { email, sitename /* , telephone */ } from "@libs/app"
// import { useFacebookURL } from "@libs/hooks"

import styles from "@styles/Header.module.css"
import logo from "@images/logo_shape_white.png"
import couverture from "@images/cover.jpg"

const Header = () => {
  // const [fb_url] = useFacebookURL()

  return (
    <header className={styles.displayUnset}>
      <Navbar className="border-top border-5 border-primary" style={{ backgroundColor: "#21211f" }} variant="dark">
        <Container fluid>
          <Link href="/">
            <Navbar.Brand href="/">
              <Image priority alt={`Logo de ${sitename}`} src={logo} width={160} height={60} />
            </Navbar.Brand>
          </Link>
          <Navbar.Text as="section" className="d-flex justify-content-center me-sm-5">
            {/* <a className="me-4" href={`tel:${telephone}`}>
              <svg style={{ transform: "rotate(90deg)" }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="link-addr bi bi-telephone" viewBox="0 0 16 16">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
            </a>
            <a className="me-4" href={fb_url} target={fb_url.match("fb://") ? "" : "_blank"} rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="link-addr bi bi-facebook" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a> */}
            <a className="me-4" href={`mailto:${email}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="link-addr bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
            </a>
            <Link href="/dashboard">
              <a className="me-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </a>
            </Link>
          </Navbar.Text>
        </Container>
      </Navbar>
      <Image priority alt={`Bannière de ${sitename}`} src={couverture} />
    </header>
  )
}

export default Header
