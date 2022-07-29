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

export interface ServiceData {
  subtitle: string
  imagesrc: string
  description: string
  creationdate: number
  updatedate?: number
  id?: string
}

export const SERVICES_REF = "services"

export const getServiceDocs = async () => {
  try {
    const q = query(collection(db, SERVICES_REF))
    const docsSnap = await _getDocs(q)
    if (docsSnap.empty) throw new Error("services empty !")
    const data: ServiceData[] = []
    docsSnap.forEach((doc) => {
      const docData = doc.data() as ServiceData
      const normalize = { ...docData, id: doc.id }
      data.push(normalize)
    })
    return data
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
