import { initializeApp } from "firebase/app"
import { query, collection, getFirestore, getDocs as _getDocs, addDoc as _addDoc } from "firebase/firestore"

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

interface ImageSrc {
  src: string
  width: number
  height: number
}
export interface ServiceData {
  name: string
  imagesrc: ImageSrc
  description: string
  creationdate: number
  updatedate?: number
  id?: string
}

type ContratType = "free" | "premium"
export interface AccountData {
  name: string
  contratType: ContratType
  organization: string
  description: string
  creationdate: number
  enddate?: number
  updatedate?: number
  id?: string
}

export const SERVICES_REF = "services"
export const ACCOUNT_REF = "account"

export const getServiceDocs = async () => {
  try {
    const q = query(collection(db, SERVICES_REF))
    const docsSnap = await _getDocs(q)
    if (docsSnap.empty) throw new Error("services empty !")
    const data: ServiceData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as ServiceData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data.sort((a, b) => a.creationdate - b.creationdate)
  } catch (error) {
    throw error
  }
}

export const getAccount = async () => {
  try {
    const q = query(collection(db, ACCOUNT_REF))
    const docsSnap = await _getDocs(q)
    if (docsSnap.empty) throw new Error("account empty !")
    const data: AccountData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as AccountData
      docData["id"] = doc.id
      data.push(docData)
    })
    return data.sort((a, b) => a.creationdate - b.creationdate)[0]
  } catch (error) {
    throw error
  }
}

export const addServiceDoc = async (data: ServiceData) => {
  try {
    return await _addDoc(collection(db, SERVICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const addAccountDoc = async (data: AccountData) => {
  try {
    return await _addDoc(collection(db, ACCOUNT_REF), data)
  } catch (error) {
    throw error
  }
}
