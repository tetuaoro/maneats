import { useState, useRef } from "react"
import { Form, InputGroup, FloatingLabel, Button, Row, Col, Alert } from "react-bootstrap"
import { addBill as _addBill } from "@libs/firebase"
import { exploitablePricesData, logger, parseIntWithThrow } from "@libs/helpers"
import { email, telephone } from "@libs/app"

import type { FormEvent, ChangeEvent } from "react"
import type { PriceData, BillDataRefType, BillData } from "@libs/firebase"

import styles from "@styles/Bills.module.scss"

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
      inputs.forEach((input) => {
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
      })

      if (refs.length === 0) throw new Error("Vous devez sélectioner au moins un service !")

      const fullname = (document.querySelector("[name='fullname']") as HTMLInputElement | null)?.value
      const phone = (document.querySelector("[name='phone']") as HTMLInputElement | null)?.value
      const comment = (document.querySelector("[name='comment']") as HTMLInputElement | null)?.value

      if (!fullname || !phone) throw new Error("Le nom et le téléphone sont requis !")

      let data: BillData = {
        fullname,
        phone,
        refs,
        comment: comment || "",
        total,
      }

      return await _addBill(data, inc)
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
      const sendbill = submitter.id === "send-bill"
      const bill = await addBill(sendbill)
      const { status, text } = await fetch("/api/sendmail", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bill, sendbill }),
      })

      if (status >= 400) throw new Error(await text())

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
      <div className={`d-flex align-items-center ${styles.gap}`}>
        <span>Coordonnées</span> <hr className="w-100" />
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

      <div className={`d-flex align-items-center ${styles.gap}`}>
        <span>Détails</span> <hr className="w-100" />
      </div>
      <div ref={pricesRef}>
        <FormPrices prices={prices} />
      </div>

      <div className={`d-flex align-items-center ${styles.gap}`}>
        <span>Commentaire</span> <hr className="w-100" />
      </div>
      <Form.Control as="textarea" name="comment" className="mb-3" rows={3} />
      <Form.Group className="mb-3" controlId="email">
        <Form.Label className={`d-flex align-items-center ${styles.gap}`}>
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
    </Form>
  )
}

type PropsFormPrice = {
  price: PriceData
}

const checkboxId = "checkbox-"
const extrapriceId = "extraprice-"

const FormPrice = ({ price }: PropsFormPrice) => {
  const [checked, setChecked] = useState(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.target.checked)

  return (
    <>
      <Form.Check label={price.description} id={`${checkboxId}${price.id}`} onChange={onChange} className="mb-3" type="checkbox" />
      {checked && price.extraPrice > 0 ? (
        <FloatingLabel label="Quantité">
          <Form.Control placeholder="90" id={`${extrapriceId}${price.id}`} type="number" min={1} defaultValue={1} required />
        </FloatingLabel>
      ) : (
        ""
      )}
    </>
  )
}

const FormPrices = ({ prices }: Props) => {
  const groups: PriceData[][] = Object.values(
    (prices as any[]).reduce((acc, x) => {
      acc[x.group] = [...(acc[x.group] || []), x]
      return acc
    }, {})
  )

  return (
    <>
      {groups.map((group, k1) => (
        <div key={k1}>
          <div className="text-decoration-underline">{group[0].group.replace(/^\d+(\W|)/, "")}</div>
          {group.map((price, k2) => (
            <FormPrice key={k2} price={price} />
          ))}
        </div>
      ))}
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
        <a href="#devis">Demander mon devis</a>
      </h2>

      <section className="py-3 py-sm-5">
        <Row>
          <Col md={8} className="order-1">
            <FormLayout prices={prices} />
          </Col>
          <Col className="order-0"></Col>
          <Col className="order-2"></Col>
        </Row>
      </section>
    </>
  )
}

export default Component
