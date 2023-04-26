/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// var admin = require("firebase-admin");
import * as admin from 'firebase-admin'


const serviceAccount = require('../../src/firebase.json')


// Initialize Firebase Admin
export const app = initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

// Initialize Firestore
export const db = getFirestore(app)
