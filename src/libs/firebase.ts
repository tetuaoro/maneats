import { initializeApp } from "firebase/app"
import { onSnapshot, getDocs, increment, updateDoc, Timestamp, query, where, orderBy, collection, getFirestore, doc, getDoc, setDoc, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { initializeAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged as _onAuthStateChanged, browserLocalPersistence, updatePassword } from "firebase/auth"
import { logger } from "./helpers"

import type { DocumentData, DocumentSnapshot } from "firebase/firestore"
import type { NextOrObserver, User } from "firebase/auth"

const firebaseConfigClientSide = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
}

const app = initializeApp(firebaseConfigClientSide)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = initializeAuth(app, { persistence: browserLocalPersistence })

type ContractType = "free" | "premium"
export interface AccountData {
  name: string
  email: string
  contractType: ContractType
  organization: string
  description: string
  createdAt: Timestamp
  endedAt?: Timestamp
  updatedate?: Timestamp
  id?: string
}

export interface Image {
  filename: string
  src: string
  width: number
  height: number
}
export interface ServiceData {
  name: string
  public?: boolean
  image: Image
  description: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
  id?: string
}

export type CurrencyType = "XPF" | "EUR" | "USD"
type CurrencyFieldType = {
  XPF: CurrencyType
  EUR: CurrencyType
  USD: CurrencyType
}
export const CurrencyField: CurrencyFieldType = { XPF: "XPF", EUR: "EUR", USD: "USD" }
export interface PriceData {
  id?: string
  group: string
  description: string
  price: number
  extraPrice?: number
  promotion?: number
  public?: boolean
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type BillDataRefType = {
  group: string
  description: string
  extraPrice: number
  size: string
}
export interface BillData {
  id?: string
  fullname: string
  public?: boolean
  phone: string
  refs: BillDataRefType[]
  total: number
  comment: string
  createdAt?: Timestamp
}

export interface BillCounter {
  counter: number
}

export const ACCOUNT_REF = "account"
export const SERVICES_REF = "services"
export const PRICES_REF = "prices"
export const BILLS_REF = "bills"
export const COUNTER_REF = "counter"

/* ACCOUNT */

export const signOutMe = async () => {
  try {
    return await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const onAuthStateChanged = (onAuthStateChangedObserver: NextOrObserver<User>) => {
  try {
    return _onAuthStateChanged(auth, onAuthStateChangedObserver)
  } catch (error) {
    throw error
  }
}

export const loginWithEmail = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    throw error
  }
}

export const updateAuthenticationPassword = async (newpassword: string) => {
  try {
    if (auth && auth.currentUser) return await updatePassword(auth.currentUser, newpassword)
  } catch (error) {
    throw error
  }
}

export const onAccountStateChanged = (onAccountStateChangedObserver: (doc: DocumentSnapshot<DocumentData>) => void) => {
  try {
    const docId = "54ckQ6JK8nQkyNea1r3J"
    const docRef = doc(collection(db, ACCOUNT_REF), docId)
    return onSnapshot(docRef, onAccountStateChangedObserver)
  } catch (error) {
    throw error
  }
}

export const getAccount = async () => {
  try {
    const docId = "54ckQ6JK8nQkyNea1r3J"
    const docRef = doc(collection(db, ACCOUNT_REF), docId)
    const docSnap = await getDoc(docRef)
    if (!docSnap.exists()) throw new Error("account empty !")
    return docSnap.data() as AccountData
  } catch (error) {
    throw error
  }
}

/* SERVICES */

export const getServices = async () => {
  try {
    const q = query(collection(db, SERVICES_REF), where("public", "==", true))
    const docsSnap = await getDocs(q)
    if (docsSnap.empty) throw new Error("services empty !")
    const data: ServiceData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as ServiceData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data.sort((a, b) => (a.createdAt && b.createdAt && a.createdAt.valueOf() < b.createdAt.valueOf() ? 0 : 1))
  } catch (error) {
    throw error
  }
}

export const addService = async (data: ServiceData) => {
  try {
    data = { ...data, public: true, createdAt: Timestamp.now() }
    await addDoc(collection(db, SERVICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const removeService = async (id: string) => {
  try {
    const serviceDoc = doc(collection(db, SERVICES_REF), id)
    const docData = { public: false, updatedAt: Timestamp.now() }
    await setDoc(serviceDoc, docData, { merge: true })
  } catch (error) {
    throw error
  }
}

export const updateService = async (data: Partial<ServiceData>, id: string) => {
  try {
    const serviceDoc = doc(collection(db, SERVICES_REF), id)
    const docData = { ...data, updatedAt: Timestamp.now() }
    await setDoc(serviceDoc, docData, { merge: true })
  } catch (error) {
    throw error
  }
}

export const updateServiceImage = async (image: Image, file: Blob, data: ServiceData) => {
  try {
    const newFileRef = ref(ref(storage, SERVICES_REF), image.filename)
    const serviceDataDoc = doc(collection(db, SERVICES_REF), data.id)
    const uploadTask = uploadBytesResumable(newFileRef, file)
    const { state } = await uploadTask
    if (state !== "success") throw new Error("error uploadTask !")
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
    const docData: Partial<ServiceData> = {
      updatedAt: Timestamp.now(),
      image: { ...image, src: downloadURL },
    }
    await setDoc(serviceDataDoc, docData, { merge: true })

    if (data.image.src.match("https")) {
      const oldFileRef = ref(storage, data.image.src)
      await deleteObject(oldFileRef)
    }
  } catch (error) {
    logger("err", error)
    throw error
  }
}

/* PRICES */

export const getPrices = async () => {
  try {
    const q = query(collection(db, PRICES_REF), orderBy("group"), where("public", "==", true))
    const docsSnap = await getDocs(q)
    if (docsSnap.empty) throw new Error("prices empty !")
    const data: PriceData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as PriceData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data
  } catch (error) {
    throw error
  }
}

export const addPrice = async (data: PriceData) => {
  try {
    data = { ...data, public: true, createdAt: Timestamp.now() }
    await addDoc(collection(db, PRICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const removePrice = async (id: string) => {
  try {
    const priceDoc = doc(collection(db, PRICES_REF), id)
    const docData = { public: false, updatedAt: Timestamp.now() }
    await setDoc(priceDoc, docData, { merge: true })
  } catch (error) {
    throw error
  }
}

export const updatePrice = async (data: Partial<PriceData>, id: string) => {
  try {
    const priceDoc = doc(collection(db, PRICES_REF), id)
    const docData = { ...data, updatedAt: Timestamp.now() }
    await setDoc(priceDoc, docData, { merge: true })
  } catch (error) {
    throw error
  }
}

/* BILLS */

export const getBills = async () => {
  try {
    const q = query(collection(db, BILLS_REF), orderBy("createdAt", "desc"), where("public", "==", true))
    const docsSnap = await getDocs(q)
    if (docsSnap.empty) throw new Error("bills empty !")
    const data: BillData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as BillData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data
  } catch (error) {
    throw error
  }
}

export const getBill = async (id: string) => {
  try {
    const _doc = await getDoc(doc(db, BILLS_REF, id))
    if (!_doc.exists()) throw new Error("bill no exist !")
    return _doc.data() as BillData
  } catch (error) {
    throw error
  }
}

const counterID = "JDdeJ7O90Joj"
export const addBill = async (data: BillData, incBill: boolean) => {
  try {
    data = { ...data, public: incBill, createdAt: Timestamp.now() }
    const _doc = await addDoc(collection(db, BILLS_REF), data)
    try {
      if (incBill) await updateDoc(doc(db, COUNTER_REF, counterID), { counter: increment(1) })
    } catch (error) {
      if (incBill) await setDoc(doc(db, COUNTER_REF, counterID), { counter: 1 })
    }
    return _doc
  } catch (error) {
    throw error
  }
}

export const getBillCounter = async () => {
  try {
    const _doc = await getDoc(doc(db, COUNTER_REF, counterID))
    if (_doc.exists()) return (_doc.data() as BillCounter).counter
    return 0
  } catch (error) {
    throw error
  }
}
