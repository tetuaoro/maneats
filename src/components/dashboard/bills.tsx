import { useState, useRef, useContext, createContext } from "react"
import { Button, Form, Modal, Table, FloatingLabel, InputGroup, Placeholder } from "react-bootstrap"
import { useRecoilValueLoadable, useSetRecoilState } from "recoil"
import { addBill as _addBill, getBills, getBillPhoneCounter } from "@libs/firebase"
import { logger, parseIntWithThrow } from "@libs/helpers"
import { modalState, billsState, pricesState } from "@libs/atoms"
import { telephone } from "@libs/app"
import EmbedLayout from "@components/dashboard/layouts"

import type { FormEvent, ChangeEvent, Dispatch, SetStateAction, PropsWithChildren } from "react"
import type { BillData, PriceData, BillDataRefType } from "@libs/firebase"

import styles from "@styles/Bills.module.scss"

type ModalContextType = {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
  show: false,
  setShow: () => {},
}

const ModalContext = createContext<ModalContextType>(defaultState)

const FormModal = (props: PropsWithChildren) => {
  const pricesRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)
  const [validated, setValidated] = useState(false)

  const setBills = useSetRecoilState(billsState)
  const setModal = useSetRecoilState(modalState)

  const updateBillDataState = async () => {
    try {
      const data = await getBills()
      setBills(data)
    } catch (error) {
      throw error
    }
  }

  const modalError = (error?: any) => {
    logger("err", error)
    if (error instanceof Error) setModal({ text: error.message, variant: "danger" })
    else setModal({ text: "Erreur lors de l'ajout !", variant: "danger" })
  }

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
          modalError(error)
        }
      })

      if (refs.length === 0) throw new Error("no refs entry !")

      const fullname = (document.querySelector("[name='fullname']") as HTMLInputElement | null)?.value
      const phone = (document.querySelector("[name='phone']") as HTMLInputElement | null)?.value
      const comment = (document.querySelector("[name='comment']") as HTMLInputElement | null)?.value

      if (!fullname || !phone) throw new Error("fullname & phone required !")

      let data: BillData = {
        fullname,
        phone,
        refs,
        comment: comment || "",
        total,
      }

      await _addBill(data, false)
      await updateBillDataState()
    } catch (error) {
      modalError(error)
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
    await addBill()
    setShow(false)
    setValidated(false)
  }

  const { state, contents } = useRecoilValueLoadable(pricesState)
  const prices = contents as PriceData[] | null

  return (
    <ModalContext.Provider value={{ show, setShow }}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un nouveau devis</Modal.Title>
        </Modal.Header>
        {state === "hasValue" && prices && (
          <>
            <Modal.Body>
              <Form id="my-modal-form-bill" noValidate validated={validated} onSubmit={handleForm}>
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
                  <Form.Control name="fullname" placeholder="ex : Teva Manea" autoFocus required />
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
                <Form.Control as="textarea" name="comment" />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="dark" type="submit" form="my-modal-form-bill">
                Ajouter
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      {props.children}
    </ModalContext.Provider>
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

type PropsFormPrices = {
  prices: PriceData[]
}

const FormPrices = ({ prices }: PropsFormPrices) => {
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
          <div className="text-decoration-underline">{group[0].group}</div>
          {group.map((price, k2) => (
            <FormPrice key={k2} price={price} />
          ))}
        </div>
      ))}
    </>
  )
}

const MyTable = () => {
  const { state, contents } = useRecoilValueLoadable(billsState)
  const bills = contents as BillData[] | null

  const setModal = useSetRecoilState(modalState)

  const onClick = async (phone: string) => {
    try {
      const counter = await getBillPhoneCounter(phone)
      setModal({ text: `Ce client a commandé ${counter} fois.`, variant: "info" })
    } catch (error) {
      setModal({ text: error instanceof Error ? error.message : "Une erreur est survenue !", variant: "danger" })
    }
  }

  return (
    <Table responsive="sm" className="mt-5">
      <thead>
        <tr className="border-bottom border-dark">
          <th className="text-nowrap">Nom complet</th>
          <th className="text-nowrap">Téléphone</th>
          <th className="text-nowrap">Prix Total</th>
          <th className="text-nowrap" title="Désignation / description / nombre">
            Détails
          </th>
          <th className="text-nowrap">Commentaire</th>
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
          </tr>
        )}
        {state === "hasValue" &&
          bills &&
          bills.map((bill, k) => (
            <tr key={k} className="border-bottom border-dark" onClick={() => onClick(bill.phone)}>
              <td>{bill.fullname}</td>
              <td>
                <a className="link-success" href={`tel:+689${bill.phone}`}>
                  {bill.phone}
                </a>
              </td>
              <td>{bill.total}</td>
              <td>
                {bill.refs.map((ref, k2) => (
                  <div key={k2} className="text-nowrap">{`[${ref.group}] [${ref.description}] [${ref.size}]`}</div>
                ))}
              </td>
              <td>{bill.comment}</td>
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
      <h1>Devis/Factures</h1>
      <Button variant="dark" onClick={handleShow}>
        Faire un devis
      </Button>
      <MyTable />
    </EmbedLayout>
  )
}

const Component = () => {
  return (
    <FormModal>
      <Layout />
    </FormModal>
  )
}

export default Component
