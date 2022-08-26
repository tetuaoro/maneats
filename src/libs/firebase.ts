import { initializeApp } from "firebase/app"
import { onSnapshot, getDocs, increment, deleteDoc, updateDoc, where, Timestamp, query, orderBy, collection, getFirestore, doc, getDoc, setDoc, addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { initializeAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged as _onAuthStateChanged, browserLocalPersistence, updatePassword } from "firebase/auth"
import { getBillName, logger } from "./helpers"

import type { DocumentData, DocumentSnapshot } from "firebase/firestore"
import type { NextOrObserver, User } from "firebase/auth"

const isServer = typeof window === "undefined"

const firebaseConfigClientSide = {
  apiKey: isServer ? process.env.FIREBASE_API_KEY || "" : process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: isServer ? process.env.FIREBASE_AUTH_DOMAIN || "" : process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: isServer ? process.env.FIREBASE_PROJECT_ID || "" : process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: isServer ? process.env.FIREBASE_STORAGE_BUCKET || "" : process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: isServer ? process.env.FIREBASE_MESSAGING_SENDER_ID || "" : process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: isServer ? process.env.FIREBASE_APP_ID || "" : process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: isServer ? process.env.FIREBASE_MEASUREMENT_ID || "" : process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
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
  id?: string
  name: string
  image: Image
  description: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface PriceData {
  id?: string
  group: string
  description: string
  price: number
  extraPrice: number
  promotion: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type BillDataRefType = {
  group: string
  description: string
  extraPrice: number
  promotion: number
  size: string
}
export interface BillData {
  id?: string
  fullname: string
  phone: string
  refs: BillDataRefType[]
  total: number
  comment: string
  billname?: string
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
    const q = query(collection(db, SERVICES_REF), orderBy("createdAt"))
    const docsSnap = await getDocs(q)
    if (docsSnap.empty) throw new Error("services empty !")
    const data: ServiceData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as ServiceData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data
  } catch (error) {
    throw error
  }
}

export const addService = async (data: ServiceData) => {
  try {
    data = { ...data, createdAt: Timestamp.now() }
    await addDoc(collection(db, SERVICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const removeService = async (id: string) => {
  try {
    const serviceDoc = doc(collection(db, SERVICES_REF), id)
    await deleteDoc(serviceDoc)
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
    const q = query(collection(db, PRICES_REF), orderBy("group"))
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
    data = { ...data, createdAt: Timestamp.now() }
    await addDoc(collection(db, PRICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const removePrice = async (id: string) => {
  try {
    const priceDoc = doc(collection(db, PRICES_REF), id)
    await deleteDoc(priceDoc)
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
    const q = query(collection(db, BILLS_REF), orderBy("createdAt", "desc"))
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

const counterID = "QgUw5KNLMtUviRxovIbL"
export const addBill = async (data: BillData, incrementCounter = true) => {
  try {
    const billname = await getBillName()
    data = { ...data, billname, createdAt: Timestamp.now() }
    await addDoc(collection(db, BILLS_REF), data)
    if (incrementCounter)
      try {
        await updateDoc(doc(db, COUNTER_REF, counterID), { counter: increment(1) })
      } catch (error) {
        await setDoc(doc(db, COUNTER_REF, counterID), { counter: 1 })
      }
    return data
  } catch (error) {
    throw error
  }
}

export const getBillCounter = async () => {
  try {
    const _doc = await getDoc(doc(db, COUNTER_REF, counterID))
    return _doc.exists() ? (_doc.data() as BillCounter).counter : 0
  } catch (error) {
    throw error
  }
}

export const getBillPhoneCounter = async (phone: string) => {
  try {
    const q = query(collection(db, BILLS_REF), where("phone", "==", phone))
    const docsSnap = await getDocs(q)
    return docsSnap.empty ? 0 : docsSnap.size
  } catch (error) {
    throw error
  }
}
