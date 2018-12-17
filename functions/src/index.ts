import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

firebase.initializeApp({
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735'
})

export const checkProfileExists = functions.https.onCall((data, context) => {
  const usersRef = db.collection('users')
  const query = usersRef.where('email', '==', data.email)

  return query
    .get()
    .then(value => !value.empty)
    .catch(console.log)
})

export const createAndVerifyAccount = functions.https.onCall((data, context) => {
  data.account.bday = new Date(data.account.bday)

  // Edge case: this is called but account is not verified

  return db
    .collection('users')
    .where('email', '==', data.account.email)
    .get()
    .then(value => {
      if (value.empty)
        return Promise.all([
          db.collection('users').add(data.account),
          firebase.auth().sendSignInLinkToEmail(data.account.email, {
            url: data.url,
            handleCodeInApp: true
          })
        ])
      else throw new Error('Account already exists')
    })
})
