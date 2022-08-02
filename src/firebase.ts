import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/functions'

import firebase from 'firebase/app'

const firebase_config = {
  // It's okay for this key to be public (https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different)
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735'
}

firebase.initializeApp(firebase_config)

export default firebase
