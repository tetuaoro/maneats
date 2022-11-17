import { useState, useRef } from "react"
import { Form, InputGroup, FloatingLabel, Button, Row, Col, Alert } from "react-bootstrap"
import { addBill as _addBill } from "@libs/firebase"
import { exploitablePricesData, logger, parseIntWithThrow } from "@libs/helpers"
import { email, telephone } from "@libs/app"

import type { FormEvent, ChangeEvent } from "react"
import type { PriceData, BillDataRefType, BillData } from "@libs/firebase"

import styles from "@styles/Bills.module.scss"

import Formik from "@components/forms"

const FormLayout = ({ prices }: Props) => {
  const pricesRef = useRef<HTMLDivElement | null>(null)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const addBill = async (inc: boolean) => {
    try {
      if (!prices) throw new Error("no prices data !")
      const { current } = pricesRef
      if (!current) throw new Error("no form reference !")
      const inputs = current.querySelectorAll("input")
      if (!inputs) throw new Error("no inputs reference !")

      let total = 0
      const refs: BillDataRefType[] = []
      /* inputs.forEach((input) => {
        try {
          if (input.type === "checkbox" && input.id.startsWith(checkboxId) && input.checked) {
            const id = input.id.substring(checkboxId.length)
            const priceData = prices.find((p) => p.id === id)
            if (!priceData) return
            total += priceData.price
            const inputExtraPrice = current.querySelector(`#${extrapriceId}${id}`) as HTMLInputElement | null
            if (inputExtraPrice) {
              const priceThrow = parseIntWithThrow(inputExtraPrice.value)
              if (priceThrow > 1 && priceData.extraPrice > 1) total += priceData.extraPrice * (priceThrow - (priceData.price > 0 ? 1 : 0))
            }
            if (priceData.promotion > 0) total -= priceData.promotion
            refs.push({
              group: priceData.group.replace(/^\d+(\W|)/, ""),
              description: priceData.description,
              extraPrice: priceData.extraPrice,
              promotion: priceData.promotion,
              size: inputExtraPrice ? inputExtraPrice.value : "1",
            })
          }
        } catch (error) {
          refs.splice(0, refs.length)
        }
      }) */

      if (refs.length === 0) throw new Error("Vous devez sélectioner au moins un service !")

      const fullname = (document.querySelector("[name='fullname']") as HTMLInputElement | null)?.value
      const phone = (document.querySelector("[name='phone']") as HTMLInputElement | null)?.value
      const comment = (document.querySelector("[name='comment']") as HTMLInputElement | null)?.value

      if (!fullname || !phone) throw new Error("Le nom et le téléphone sont requis !")

      const data: BillData = {
        fullname,
        phone,
        refs,
        comment: comment || "",
        total,
      }

      return inc ? await _addBill(data) : data
    } catch (error) {
      setError(error instanceof Error ? error.message : "Une erreur est survenue ! [8907]")
      throw error
    }
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }

    try {
      const email = (document.querySelector("[name='email']") as HTMLInputElement)?.value
      if (!email) throw new Error("L'email est requis !")
      const { submitter } = e.nativeEvent as any
      /* `sendbill` check if it is a true request for a delivery or not  */
      const sendbill = submitter.id === "send-bill"
      const bill = await addBill(sendbill)
      const { status } = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bill, sendbill }),
      })

      if (status >= 400) throw new Error(`status ${status}`)

      setValidated(false)
      setError("")
      setMessage(`Votre devis a bien été envoyé à ${email}${sendbill ? " et a été soumis à nos services." : "."}`)
    } catch (error) {
      logger("err", error)
      setError(error instanceof Error ? error.message : "Une erreur est survenue ! [8907]")
    }
  }

  if (!prices) return null

  return (
    <Form noValidate validated={validated} onSubmit={handleForm}>
      <Coordonnees />
      <Details />

      <div className="mt-4">
        <Form.Text>{"Nous collectons ces données afin de vous adresser par courriel le devis que vous avez sollicité."}</Form.Text>
        <Form.Check required label={"J'accepte de partager mes informations confidentielles"} id={"emailok"} className="mb-3" type="checkbox" />

        <Button className="me-3 mb-2" variant="dark" type="submit">
          Recevoir uniquement le devis estimé
        </Button>
        <Button className="me-3 mb-2" id="send-bill" type="submit">
          Soumettre le devis
        </Button>

        {error.length > 0 && (
          <Alert className="d-block mb-2" variant="danger">
            {error}
          </Alert>
        )}

        {message.length > 0 && (
          <Alert className="d-block mb-2" variant="success">
            {message}
          </Alert>
        )}

        <Form.Text muted className="d-block">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="me-1 bi bi-info-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
          {"Recevoir le devis estimé n'est pas une demande pour nos services. Si vous voulez qu'on vous sert réelement, il faut soumettre le devis."}
        </Form.Text>
      </div>
    </Form>
  )
}

type Item = {
  departure?: string
  arrival?: string
  package?: string
  quantity?: string
  comment?: string
}

const Details = () => {
  const [items, setItems] = useState<Item[]>([])

  const addItem = () => {
    setItems([
      ...items,
      {
        departure: "departure",
        arrival: "arrival",
        package: "package",
        quantity: "quantity",
        comment: "comment",
      },
    ])
  }

  const removeItem = (k: number) => {
    setItems(items.filter((_, index) => index != k))
  }

  return (
    <>
      <div className={`d-flex align-items-center ${styles.gap}`}>
        <span className="text-primary fs-4">Détails des courses</span> <hr className="w-100" />
      </div>

      <p className="my-3">
        {
          "Ajouter tous les colis à récupérer et recever le devis estimé dans votre boîte de messagerie. Préciser le plus possible les détails importants : numéro d'appartement, nom du magasin, bateau de Rangiroa, c'est le cousin qui récupère."
        }
      </p>

      <div id="items">
        {items.map((item, k) => (
          <div key={k} className="mb-3 p-4 border border-2 rounded">
            <div className="d-flex justify-content-between w-100">
              <span>Course {k + 1}</span>
              <span className="text-primary" onClick={() => removeItem(k)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                </svg>
              </span>
            </div>
            <Row>
              <Col>
                <Form.Select className="mt-2" aria-label="lieu de ramassage">
                  <option>Lieu de récupération</option>
                  <SelectOptions />
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="mt-2" aria-label="lieu de livraison">
                  <option>Lieu de livraison</option>
                  <option value="1">Papeete centre</option>
                  <option value="2">Punaauia ZI</option>
                </Form.Select>
              </Col>
            </Row>
            <Form.Select className="mt-2" aria-label="nature du colis">
              <option>Nature du colis</option>
              <option value="1">Course alimentaire</option>
              <option value="2">Transport animale</option>
            </Form.Select>
          </div>
        ))}
      </div>

      <div>
        <Button onClick={addItem} variant="outline-primary" className="border-0">
          Ajouter un colis
        </Button>
      </div>
    </>
  )
}

const SelectOptions = () => {
  return (
    <>
      <option value="1">Papeete centre</option>
      <option value="2">Punaauia ZI</option>
    </>
  )
}

const Coordonnees = () => {
  return (
    <>
      <div className={`d-flex align-items-center ${styles.gap}`}>
        <span className="text-primary fs-4">Coordonnées</span> <hr className="w-100" />
      </div>
      <Form.Group className="mb-3" controlId="fullname">
        <Form.Label className={`d-flex align-items-center ${styles.gap}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
          <span>Nom complet</span>
        </Form.Label>
        <Form.Control name="fullname" placeholder="ex : Teva Manea" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label className={`d-flex align-items-center ${styles.gap}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
            />
          </svg>
          <span>Téléphone</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon1">+689</InputGroup.Text>
          <Form.Control
            aria-label={"ex : " + telephone.replace("+689", "")}
            aria-describedby="basic-addon1"
            name="phone"
            type="tel"
            pattern="^(40|87|89)([0-9]{6})$"
            placeholder={"ex : " + telephone.replace("+689", "")}
            required
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label className={`d-flex align-items-center ${styles.gap}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
          </svg>
          <span>Email</span>
        </Form.Label>
        <InputGroup>
          <InputGroup.Text id="basic-addon2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-at" viewBox="0 0 16 16">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
          </InputGroup.Text>
          <Form.Control aria-label={"ex : " + `${email}`} aria-describedby="basic-addon2" name="email" type="email" placeholder={"ex : " + `${email}`} required />
        </InputGroup>
      </Form.Group>
    </>
  )
}

type Props = {
  prices: ReturnType<typeof exploitablePricesData> | null
}
const Component = ({ prices }: Props) => {
  return (
    <>
      <h2 id="devis" className="conthrax">
        <a href="#devis">Estimer mon devis</a>
      </h2>

      <section className="py-3 py-sm-5">
        <Row>
          <Col md={8} className="order-1">
            {/* <FormLayout prices={prices} /> */}
            <Formik />
          </Col>
          <Col className="order-0"></Col>
          <Col className="order-2"></Col>
        </Row>
      </section>
    </>
  )
}

export default Component
