import 'firebase/firestore'

import firebase from 'firebase/app'

const firebase_config = {
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735'
}

firebase.initializeApp(firebase_config)

const db = firebase.firestore()

db.settings({
  timestampsInSnapshots: true
})

export default firebase
