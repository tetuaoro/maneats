import "@styles/globals.scss"
import { useState } from "react"
import type { AppProps } from "next/app"
import { Alert, Modal } from "react-bootstrap"
import { useRouter } from "next/router"

import Header from "@components/header"
import Footer from "@components/footer"
import DashboardHeader from "@components/dashboard-header"
import ModalP from "@libs/modal"

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const [text, setText] = useState("")
  const [show, setShow] = useState(false)

  const setModal = (text: string, timeout?: number) => {
    setText(text)
    setShow(true)

    const id = setTimeout(() => {
      setShow(false)
      clearTimeout(id)
    }, timeout || 3000)
  }

  if (pathname.startsWith("/dashboard")) {
    return (
      <ModalP.Provider value={{ setModal }}>
        <Modal show={show} style={{ top: "calc(100% - 6rem)" }}>
          <Modal.Body className="p-0">
            <Alert className="m-0" variant="info">
              {text}
            </Alert>
          </Modal.Body>
        </Modal>
        <div className="d-sm-flex">
          <DashboardHeader />
          <Component {...pageProps} />
        </div>
      </ModalP.Provider>
    )
  }

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default App
