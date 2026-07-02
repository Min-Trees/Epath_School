import { db } from './firebase'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore'

// Generic CRUD operations
export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const docRef = doc(db, collectionName, id)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as T
  }
  return null
}

export async function getDocuments<T>(
  collectionName: string,
  constraints?: QueryConstraint[]
): Promise<T[]> {
  const collectionRef = collection(db, collectionName)
  const q = constraints ? query(collectionRef, ...constraints) : collectionRef
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as T[]
}

// Programs
export async function getPrograms() {
  return getDocuments('programs', [orderBy('createdAt', 'desc')])
}

export async function getProgramsByLevel(level: string) {
  return getDocuments('programs', [
    where('level', '==', level),
    orderBy('createdAt', 'desc')
  ])
}

export async function getProgram(id: string) {
  return getDocument('programs', id)
}

// FAQs
export async function getFAQs() {
  return getDocuments('faqs', [orderBy('order', 'asc')])
}

// Testimonials
export async function getTestimonials() {
  return getDocuments('testimonials', [orderBy('createdAt', 'desc')])
}

// Partners
export async function getPartners() {
  return getDocuments('partners', [orderBy('createdAt', 'asc')])
}

// Contact form submission
export async function submitContact(data: Omit<DocumentData, 'createdAt'>) {
  const collectionRef = collection(db, 'contacts')
  return addDoc(collectionRef, {
    ...data,
    createdAt: new Date()
  })
}

// Statistics
export async function getStatistics() {
  return getDocuments('statistics', [orderBy('id', 'asc')])
}

// Admin operations
export async function createDocument(collectionName: string, data: DocumentData) {
  const collectionRef = collection(db, collectionName)
  return addDoc(collectionRef, {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

export async function updateDocument(
  collectionName: string,
  id: string,
  data: Partial<DocumentData>
) {
  const docRef = doc(db, collectionName, id)
  return updateDoc(docRef, {
    ...data,
    updatedAt: new Date()
  })
}

export async function deleteDocument(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id)
  return deleteDoc(docRef)
}
