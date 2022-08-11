import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions'

const firebaseConfig = {
  // It's okay for this key to be public (https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different)
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  console.log('Connecting to Firebase Emulators')
  connectFunctionsEmulator(functions, 'localhost', 4001)
  connectAuthEmulator(auth, 'http://localhost:9099')
}
