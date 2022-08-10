import type { NextOrObserver, User } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { query, collection, deleteDoc, getFirestore, doc, getDoc as _getDoc, setDoc, getDocs as _getDocs, addDoc as _addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { initializeAuth, signInWithEmailAndPassword, onAuthStateChanged, browserLocalPersistence, setPersistence, updatePassword } from "firebase/auth"
import { logger } from "./functions"

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

export interface ImageSrc {
  filename: string
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
  email: string
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

export const authentication = async (email: string, password: string, onAuthStateChangedObserver?: NextOrObserver<User>) => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const unsubscribe = onAuthStateChangedObserver ? onAuthStateChanged(auth, onAuthStateChangedObserver) : null
    return { userCredential, unsubscribe }
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

export const addAccountDoc = async (data: AccountData) => {
  try {
    return await _addDoc(collection(db, ACCOUNT_REF), data)
  } catch (error) {
    throw error
  }
}

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

export const addServiceDoc = async (data: ServiceData) => {
  try {
    return await _addDoc(collection(db, SERVICES_REF), data)
  } catch (error) {
    throw error
  }
}

export const removeServiceDoc = async (data: ServiceData) => {
  try {
    const serviceDataDoc = doc(collection(db, SERVICES_REF), data.id)
    const fileRef = ref(ref(storage, SERVICES_REF), data.imagesrc.filename)
    logger("log", data)
    await deleteObject(fileRef)
    await deleteDoc(serviceDataDoc)
  } catch (error) {
    throw error
  }
}

export const updateServiceDoc = async (data: any, id: string) => {
  try {
    const serviceDataDoc = doc(collection(db, SERVICES_REF), id)
    const docData = {
      ...data,
      updatedate: Date.now(),
    }
    await setDoc(serviceDataDoc, docData, { merge: true })
  } catch (error) {
    throw error
  }
}

export const updateServiceDocImage = async (imageSrc: ImageSrc, file: Blob, data: ServiceData) => {
  try {
    const oldFileRef = ref(ref(storage, SERVICES_REF), data.imagesrc.filename)
    const newFileRef = ref(ref(storage, SERVICES_REF), imageSrc.filename)
    const serviceDataDoc = doc(collection(db, SERVICES_REF), data.id)

    const uploadTask = uploadBytesResumable(newFileRef, file)
    const { state } = await uploadTask
    if (state === "success") {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
      const docData = {
        updatedate: Date.now(),
        imagesrc: { ...imageSrc, src: downloadURL },
      }
      await setDoc(serviceDataDoc, docData, { merge: true })
      await deleteObject(oldFileRef)
    }
    return state
  } catch (error) {
    throw error
  }
}
