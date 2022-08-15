import { useState, useRef } from "react"
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap"
import { useRecoilStateLoadable, useSetRecoilState } from "recoil"
import { addPrice as _addPrice, getPrices, removePrice as _removePrice, CurrencyField } from "@libs/firebase"
import { logger } from "@libs/helpers"
import { modalState, pricesState } from "@libs/atoms"

import type { FormEvent } from "react"
import type { PriceData, CurrencyType } from "@libs/firebase"

const Component = () => {
  const [{ state, contents }, setPrices] = useRecoilStateLoadable(pricesState)
  const prices = contents as PriceData[] | null
  const formRef = useRef<HTMLFormElement | null>(null)
  const [validated, setValidated] = useState(false)
  const setModal = useSetRecoilState(modalState)

  const updatePriceDataState = async () => {
    try {
      const data = await getPrices()
      setPrices(data)
    } catch (error) {
      throw error
    }
  }

  const addPrice = async () => {
    try {
      const { current: form } = formRef
      if (!form) throw new Error("no valid form reference !")

      const group = form.querySelector<HTMLInputElement>("[name=group]")?.value
      const description = form.querySelector<HTMLInputElement>("[name=description]")?.value
      const price = form.querySelector<HTMLInputElement>("[name=price]")?.value
      const currency = form.querySelector<HTMLSelectElement>("[name=currency]")?.value as CurrencyType | undefined
      const extraPrice = form.querySelector<HTMLInputElement>("[name=extraPrice]")?.value
      const promotion = form.querySelector<HTMLInputElement>("[name=promotion]")?.value

      if (!group || !description || !price || !currency) throw new Error("no valid data !")
      const stringToNumber = (str: string) => {
        try {
          if (!str || str.length === 0) throw "err"
          return parseInt(str)
        } catch (error) {
          return 0
        }
      }
      let data: PriceData = {
        group,
        description,
        price: stringToNumber(price),
        currency,
      }

      if (extraPrice && stringToNumber(extraPrice) > 0) data["extraPrice"] = stringToNumber(extraPrice)
      if (promotion && stringToNumber(promotion) > 0) data["promotion"] = stringToNumber(promotion)

      // await _addPrice(data)
      // await updatePriceDataState()
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de l'ajout !", variant: "danger" })
    }
  }

  const removePrice = async (id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const price = prices?.find((p) => p.id === id)
      if (!price) throw new Error("Aucun tarif !")
      await _removePrice(price)
      await updatePriceDataState()
      setModal({ text: "Tarif supprimé !", variant: "success" })
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de la suppression !", variant: "danger" })
    }
  }

  const [showModalForm, setShowModalForm] = useState(false)
  const handleClose = () => setShowModalForm(false)
  const handleShow = () => setShowModalForm(true)
  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }
    await addPrice()
    setShowModalForm(false)
    setValidated(false)
  }

  const promotionToPercentage = (price: number, pro?: number) => {
    try {
      if (!pro || price === 0) throw "error"
      const res = (pro * 100) / price
      return parseInt(res.toString())
    } catch (error) {
      return 0
    }
  }

  return (
    <main className="container min-vh-100 py-2 py-sm-4 bg-gray-300">
      <h1>Tarifs</h1>
      <Modal scrollable show={showModalForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau tarif</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="my-modal-form-price" noValidate validated={validated} ref={formRef} onSubmit={handleForm}>
            <Form.Group className="mb-3" controlId="group">
              <Form.Label>Désignation</Form.Label>
              <Form.Control name="group" placeholder="ex: Livraison en scooter" autoFocus required />
              <Form.Control.Feedback type="invalid">Ce champ est requis !</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" placeholder="ex: Papeete agglomération" required />
              <Form.Control.Feedback type="invalid">Ce champ est requis !</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Prix affiché</Form.Label>
              <Form.Control name="price" type="number" min={0} defaultValue={0} required />
              <Form.Text id="priceHelpBlock" muted>
                {"Le prix doit être plus grand ou égal à 0 (0 par défault)."}
              </Form.Text>
              <Form.Control.Feedback type="invalid">Ce champ est requis et doit être positif !</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="currency">
              <Form.Label>Devise</Form.Label>
              <Form.Select name="currency" required defaultValue={CurrencyField.XPF}>
                {Object.values(CurrencyField).map((currency, k) => (
                  <option key={k} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Select>
              <Form.Text id="currencyHelpBlock" muted>
                {"(XPF par défault)."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="extraPrice">
              <Form.Label>Prix extra</Form.Label>
              <Form.Control name="extraPrice" type="number" min={1} />
              <Form.Text id="extraPriceHelpBlock" muted>
                {"Représente le prix à chaque augmentation au lieu du prix normal."}
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="promotion">
              <Form.Label>Promotion/Réduction</Form.Label>
              <Form.Control name="promotion" type="number" min={1} />
              <Form.Text id="promotionHelpBlock" muted>
                {"Représente le prix de réduction par rapport au prix normal et est un prix fixé (pas de pourcentage)."}
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" type="submit" form="my-modal-form-price">
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
      <ButtonGroup aria-label="mybtns">
        <Button id="btnpromotion" variant="success" disabled>
          Faire une promotion
        </Button>
        <Button variant="dark" onClick={handleShow}>
          Ajouter un tarif
        </Button>
      </ButtonGroup>
      {state === "hasValue" && prices && (
        <Table bordered hover responsive="sm" className="mt-5">
          <thead>
            <tr>
              <th>Action</th>
              <th>Désignation</th>
              <th>Description</th>
              <th>Prix TTC</th>
              <th>Prix extra</th>
              <th>Promotion</th>
            </tr>
          </thead>
          <tbody>
            {prices.map(({ id, group, description, price, currency, extraPrice, promotion }, k) => (
              <tr key={k}>
                <td>
                  <Button size="sm" variant="danger" onClick={() => removePrice(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </Button>
                </td>
                <td>{group}</td>
                <td>{description}</td>
                <td>{`${price} ${currency}`}</td>
                <td>{extraPrice && <span className="text-danger">{`+${extraPrice} ${currency}`}</span>}</td>
                <td>{promotion && <span className="text-info">{`-${promotionToPercentage(price, promotion)} %`}</span>}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  )
}

export default Component
