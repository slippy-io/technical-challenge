import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { credential } from 'firebase-admin';

// Firebase service account credentials
const serviceAccount = require('./firebase-adminsdk.json');

//fire base config 
const firebaseConfig = {
    apiKey: "AIzaSyCsJ6UHp7ttyGasmEVixaJTRGygGLjYUyU",
    authDomain: "technical-task-1566a.firebaseapp.com",
    projectId: "technical-task-1566a",
    storageBucket: "technical-task-1566a.appspot.com",
    messagingSenderId: "735077177798",
    appId: "1:735077177798:web:2d4837a8e5dc2a7d7cbac7",
    measurementId: "G-T4622DDYWB"
}

// Initialize Firebase Admin with the service account credentials
const app = initializeApp({
    credential: credential.cert(serviceAccount),
    ...firebaseConfig,
  });

// Initialize Firestore
export const db = getFirestore(app);