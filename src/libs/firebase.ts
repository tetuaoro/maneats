import type { NextOrObserver, User } from "firebase/auth"
import type { DocumentData, DocumentSnapshot } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import { onSnapshot, query, collection, deleteDoc, getFirestore, doc, getDoc as _getDoc, setDoc, getDocs as _getDocs, addDoc as _addDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage"
import { initializeAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged as _onAuthStateChanged, browserLocalPersistence, setPersistence, updatePassword } from "firebase/auth"
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

export interface Image {
  filename: string
  src: string
  width: number
  height: number
}
export interface ServiceData {
  name: string
  image: Image
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
    const docSnap = await _getDoc(docRef)
    if (!docSnap.exists()) throw new Error("account empty !")
    return docSnap.data() as AccountData
  } catch (error) {
    throw error
  }
}

export const addAccount = async (data: AccountData) => {
  try {
    return await _addDoc(collection(db, ACCOUNT_REF), data)
  } catch (error) {
    throw error
  }
}

export const getServices = async () => {
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
    const fileRef = ref(ref(storage, SERVICES_REF), data.image.filename)
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

export const updateServiceDocImage = async (imageSrc: Image, file: Blob, data: ServiceData) => {
  try {
    const oldFileRef = ref(ref(storage, SERVICES_REF), data.image.filename)
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
