import { useState, useRef, useContext, createContext } from "react"
import { Button, Form, Modal, Placeholder, Table } from "react-bootstrap"
import { useRecoilStateLoadable, useSetRecoilState } from "recoil"
import { addPrice as _addPrice, getPrices, removePrice as _removePrice, updatePrice } from "@libs/firebase"
import { logger, parseIntWithThrow } from "@libs/helpers"
import { modalState, pricesState } from "@libs/atoms"
import EmbedLayout from "@components/dashboard/layouts"

import type { FormEvent, Dispatch, SetStateAction, KeyboardEvent, PropsWithChildren, MouseEvent, FocusEvent } from "react"
import type { PriceData } from "@libs/firebase"

import styles from "@styles/Prices.module.scss"

type ModalContextType = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  show: false,
  setShow: () => {},
}

const ModalContext = createContext<ModalContextType>(defaultState)

const MyModal = (props: PropsWithChildren) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const [, setPrices] = useRecoilStateLoadable(pricesState)
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
      const extraPrice = form.querySelector<HTMLInputElement>("[name=extraPrice]")?.value
      const promotion = form.querySelector<HTMLInputElement>("[name=promotion]")?.value

      if (!group || !description || !price) throw new Error("no valid data !")
      let data: PriceData = {
        group,
        description,
        price: parseIntWithThrow(price),
      }

      if (extraPrice && parseIntWithThrow(extraPrice) > 0) data["extraPrice"] = parseIntWithThrow(extraPrice)
      if (promotion && parseIntWithThrow(promotion) > 0) data["promotion"] = parseIntWithThrow(promotion)

      await _addPrice(data)
      await updatePriceDataState()
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de l'ajout !", variant: "danger" })
    }
  }

  const handleClose = () => {
    setShow(false)
    setValidated(false)
  }

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!e.currentTarget.checkValidity()) {
      setValidated(true)
      return
    }
    await addPrice()
    setShow(false)
    setValidated(false)
  }

  return (
    <ModalContext.Provider value={{ show, setShow }}>
      <Modal scrollable show={show} onHide={handleClose}>
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
      {props.children}
    </ModalContext.Provider>
  )
}

const MyTable = () => {
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

  const removePrice = async (id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const price = prices?.find((p) => p.id === id)
      if (!price) throw new Error("Aucun tarif !")
      await _removePrice(id)
      await updatePriceDataState()
      setModal({ text: "Tarif supprimé !", variant: "success" })
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Erreur lors de la suppression !", variant: "danger" })
    }
  }

  const onBlur = async (e: FocusEvent<HTMLInputElement>, id?: string) => {
    try {
      if (!id) throw new Error("Pas d'identifiant !")
      const { value, type, name } = e.target
      const price = prices?.find((p) => p.id === id)
      if (!price) throw new Error("Price data no exist !")
      let data: { [key: string]: any } = {}
      if (type === "number") data[name] = parseIntWithThrow(value)
      else data[name] = value
      if (data[name] !== (price as any)[name]) {
        await updatePrice(data, id)
        await updatePriceDataState()
      }
    } catch (error) {
      logger("err", error)
      if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
      else setModal({ text: "Une erreur est survenue !", variant: "danger" })
    }
  }

  const onClick = (e: MouseEvent<HTMLTableCellElement>) => {
    const target = e.target as Element
    target.querySelector("input")?.focus()
  }

  const onInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLElement
    target.style.height = "auto"
    target.style.height = target.scrollHeight + "px"
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <Table responsive="sm" className="mt-5">
      <thead>
        <tr>
          <th className="text-nowrap">Action</th>
          <th className="text-nowrap">Désignation</th>
          <th className="text-nowrap">Description</th>
          <th className="text-nowrap">Prix TTC</th>
          <th className="text-nowrap">Prix extra</th>
          <th className="text-nowrap">Promotion</th>
        </tr>
      </thead>
      <tbody>
        {state !== "hasValue" && (
          <tr>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
            <Placeholder as="td" animation="glow">
              <Placeholder xs={12} />
            </Placeholder>
          </tr>
        )}
        {state === "hasValue" &&
          prices &&
          prices.map(({ id, group, description, price, extraPrice, promotion }, k) => (
            <tr key={k}>
              <td>
                <Button size="sm" variant="danger" onClick={() => removePrice(id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                  </svg>
                </Button>
              </td>
              <td onClick={onClick} className={styles.cell}>
                <textarea onKeyDown={onKeyDown} onInput={onInput} onBlur={(e: any) => onBlur(e, id)} className={styles.input} defaultValue={group} name="group" />
              </td>
              <td onClick={onClick} className={styles.cell}>
                <textarea onKeyDown={onKeyDown} onInput={onInput} onBlur={(e: any) => onBlur(e, id)} className={styles.input} defaultValue={description} name="description" />
              </td>
              <td>
                <input onBlur={(e: any) => onBlur(e, id)} className={styles.input} defaultValue={price && price > 0 ? price : ""} name="price" min="0" type="number" />
              </td>
              <td>
                <input onBlur={(e: any) => onBlur(e, id)} className={styles.input} defaultValue={extraPrice && extraPrice > 0 ? extraPrice : ""} name="extraPrice" min="0" type="number" />
              </td>
              <td>
                <input onBlur={(e: any) => onBlur(e, id)} className={styles.input} defaultValue={promotion && promotion > 0 ? promotion : ""} name="promotion" min="0" type="number" />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

const Layout = () => {
  const { setShow } = useContext(ModalContext)
  const handleShow = () => setShow(true)

  return (
    <EmbedLayout>
      <h1>Tarifs</h1>
      <Button variant="dark" onClick={handleShow}>
        Ajouter un tarif
      </Button>
      <MyTable />
    </EmbedLayout>
  )
}

const Component = () => {
  return (
    <MyModal>
      <Layout />
    </MyModal>
  )
}

export default Component
