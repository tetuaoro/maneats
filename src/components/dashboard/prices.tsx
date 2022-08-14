import type { FormEvent } from "react"
import type { PriceData } from "@libs/firebase"
import { Button, ButtonGroup, Form, Modal, Table } from "react-bootstrap"
import { useRecoilStateLoadable, useSetRecoilState } from "recoil"
import { addPrice as _addPrice, getPrices, removePrice as _removePrice } from "@libs/firebase"
import { logger } from "@libs/helpers"
import { modalState, pricesState } from "@libs/atoms"
import { useState } from "react"

const Component = () => {
  const [{ state, contents }, setPrices] = useRecoilStateLoadable(pricesState)
  const prices = contents as PriceData[] | null
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
      const data: PriceData = {
        group: "g3",
        name: "test 2 price",
        description: "test price",
        currency: "XPF",
        price: 100,
      }
      await _addPrice(data)
      await updatePriceDataState()
    } catch (error) {
      logger("err", error)
      setModal({ text: "Erreur lors de l'ajout !", variant: "danger" })
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
    await addPrice()
    setShowModalForm(false)
  }

  return (
    <main className="container min-vh-100 py-2 py-sm-4 bg-gray-300">
      <h1>Tarifs</h1>
      <Modal show={showModalForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleForm}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" type="submit">
              Ajouter
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ButtonGroup aria-label="mybtns">
        <Button variant="success" disabled>
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
              <th>#</th>
              <th>Désignation</th>
              <th>Description</th>
              <th>Prix TTC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((p, k) => (
              <tr key={k}>
                <td>{k + 1}</td>
                <td>{p.group}</td>
                <td>{p.description}</td>
                <td>{`${p.price} ${p.currency}`}</td>
                <td>
                  <Button size="sm" variant="danger" onClick={() => removePrice(p.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </main>
  )
}

export default Component
