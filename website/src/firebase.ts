import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
  // It's okay for this key to be public (https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different)
  apiKey: process.env.API_KEY ?? 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: process.env.AUTH_DOMAIN ?? 'on-the-loose.firebaseapp.com',
  databaseURL: process.env.DB_URL ?? 'https://on-the-loose.firebaseio.com',
  projectId: process.env.PROJECT_ID ?? 'on-the-loose',
  storageBucket: process.env.STORAGE_BUCKET ?? 'on-the-loose.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID ?? '816227148735',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase Emulators')
  connectFunctionsEmulator(functions, 'localhost', 4001)
  connectAuthEmulator(auth, 'http://localhost:4003')
}
