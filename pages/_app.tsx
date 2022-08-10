import "@styles/globals.scss"
import type { UserCredential } from "firebase/auth"
import type { AppProps } from "next/app"
import { useEffect, useState } from "react"
import { Alert, Modal } from "react-bootstrap"
import { useRouter } from "next/router"

import Header from "@components/header"
import Footer from "@components/footer"
import DashboardHeader from "@components/dashboard-header"
import AppP from "@libs/context"

function App({ Component, pageProps }: AppProps) {
  const { pathname, replace } = useRouter()

  const [text, setText] = useState("")
  const [variant, setVariant] = useState("info")
  const [show, setShow] = useState(false)
  const [auth, setAuth] = useState<UserCredential | null>(null)

  const setModal = (text: string, timeout?: number, variant?: string) => {
    setText(text)
    setVariant(variant || "info")
    setShow(true)

    const id = setTimeout(() => {
      setShow(false)
      clearTimeout(id)
    }, timeout || 3000)
  }

  useEffect(() => {
    if (pathname.startsWith("/dashboard/login") && auth) {
      replace("/dashboard")
    }
    if (pathname.startsWith("/dashboard") && !auth) {
      replace("/dashboard/login")
    }
  }, [auth, pathname])

  if (pathname.startsWith("/dashboard")) {
    return (
      <AppP.Provider value={{ setModal, setAuth, auth }}>
        <Modal show={show} style={{ top: "calc(100vh - 6rem)" }}>
          <Modal.Body className="p-0">
            <Alert className="m-0" variant={variant}>
              {text}
            </Alert>
          </Modal.Body>
        </Modal>
        <div className="d-sm-flex">
          <DashboardHeader />
          <Component {...pageProps} />
        </div>
      </AppP.Provider>
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
