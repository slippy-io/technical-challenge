import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import * as admin from 'firebase-admin';

const serviceAccount = require('../serviceAccountKey.json');

// Initialize Firebase Admin
export const app = initializeApp({
    credential: admin.credential.cert(serviceAccount),
})

// Initialize Firestore
export const db = getFirestore(app)
