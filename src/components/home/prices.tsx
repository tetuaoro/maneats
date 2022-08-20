import { useState, useRef } from "react"
import { Form, InputGroup, FloatingLabel, Button, Row, Col } from "react-bootstrap"
import { addBill as _addBill } from "@libs/firebase"
import { exploitablePricesData, parseIntWithThrow } from "@libs/helpers"
import { telephone } from "@libs/app"

import type { FormEvent, ChangeEvent } from "react"
import type { PriceData, BillDataRefType, BillData } from "@libs/firebase"

import styles from "@styles/Bills.module.scss"

const FormLayout = ({ prices }: Props) => {
  const pricesRef = useRef<HTMLDivElement | null>(null)
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")

  const addBill = async () => {
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
            if (inputExtraPrice && parseIntWithThrow(inputExtraPrice.value) > 1 && priceData.extraPrice && priceData.extraPrice > 1)
              total += priceData.extraPrice * (parseIntWithThrow(inputExtraPrice.value) - (priceData.price > 0 ? 1 : 0))
            refs.push({
              group: priceData.group.replace(/^\d+(\W|)/, ""),
              description: priceData.description,
              extraPrice: priceData.extraPrice || 0,
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

      await _addBill(data)
    } catch (error) {
      setError(error instanceof Error ? error.message : "")
    }
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    if (!e.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }
    await addBill()
    setValidated(false)
  }

  if (prices)
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
          <span>Services</span> <hr className="w-100" />
        </div>
        <div ref={pricesRef}>
          <FormPrices prices={prices} />
          {error.length > 0 && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
        </div>

        <div className={`d-flex align-items-center ${styles.gap}`}>
          <span>Commentaire</span> <hr className="w-100" />
        </div>
        <Form.Control as="textarea" name="comment" className="mb-3" rows={6} />
        <Button className="me-3 mb-2" variant="dark" type="submit">
          Recevoir uniquement le devis estimé
        </Button>
        <Button className="me-3 mb-2" type="submit">
          Établir le service
        </Button>
      </Form>
    )

  return null
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
      {checked && price.extraPrice && price.extraPrice > 0 ? (
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
      <h2 id="estimation" className="conthrax">
        <a href="#estimation">Faire une estimation de prix</a>
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
