import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin
export const app = initializeApp()

// Initialize Firestore
export const db = getFirestore(app)
