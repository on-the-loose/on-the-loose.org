import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

admin.initializeApp()
const db = admin.firestore()

firebase.initializeApp({
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735'
})

export const checkAccountExists = functions.https.onCall((data, context) => {
  // TODO: switch from 'verified' to admin.auth().getUserByEmail(email)
  return db
    .doc(`users/${data.email}`)
    .get()
    .then(value => value.exists && value.data().verified)
    .catch(console.log)
})

export const createAccount = functions.https.onCall((data, context) => {
  data.account.bday = new Date(data.account.bday)
  data.account.verified = false

  return db
    .doc(`users/${data.account.email}`)
    .get()
    .then(value => {
      if (!(value.exists && value.data().verified))
        return Promise.all([
          db.doc(`users/${data.account.email}`).set(data.account),
          firebase.auth().sendSignInLinkToEmail(data.account.email, {
            url: data.url,
            handleCodeInApp: true
          })
        ])
      else throw new Error('Account already exists')
    })
})

export const verifyAccount = functions.auth.user().onCreate(user => {
  return db.doc(`users/${user.email}`).update({ verified: true })
})
