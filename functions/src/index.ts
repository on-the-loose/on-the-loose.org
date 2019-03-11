import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import * as nodemailer from 'nodemailer'
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

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

export const checkAccountExists = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(_ => true)
    .catch(_ => false)
})

export const createAccount = functions.https.onCall(async (data, context) => {
  data.account.bday = new Date(data.account.bday)

  let accountExists = false
  await admin
    .auth()
    .getUserByEmail(data.email)
    .then(_ => (accountExists = true))
    .catch(_ => (accountExists = false))

  return db
    .doc(`users/${data.account.email}`)
    .get()
    .then(value => {
      if (value.exists && accountExists) throw new Error('Account already exists')
      console.log(`Creating account for: ${data.account.email}`)
      return Promise.all([
        db
          .doc(`users/${data.account.email}`)
          .set(data.account)
          .then(() => console.log(`Successfully created account for: ${data.account.email}`)),
        firebase
          .auth()
          .sendSignInLinkToEmail(data.account.email, {
            url: data.url,
            handleCodeInApp: true
          })
          .then(() => console.log(`Successfully sent first sign in link to: ${data.account.email}`))
      ])
    })
})

export const onTripCreation = functions.firestore
  .document('trips/{tripId}')
  .onCreate((snap, context) =>
    sendTripDataEmail(
      context.params.tripId,
      snap.data(),
      'otlstaff@gmail.com',
      `Trip created by ${snap.data().leader.name}: ${snap.data().title}`
    )
  )

export const onTripEdit = functions.firestore
  .document('trips/{tripId}')
  .onUpdate((change, context) =>
    sendTripDataEmail(
      context.params.tripId,
      change.after.data(),
      'otlstaff@gmail.com',
      `Trip edited by ${change.after.data().leader.name}: ${change.after.data().title}`
    )
  )

async function sendTripDataEmail(id, data, toEmail, subject) {
  const mailOptions = {
    from: `On The Loose <noreply@on-the-loose.org>`,
    to: toEmail,
    subject,
    text: `https://on-the-loose.org/trips/${id} \n\n Planning Information: \n ${JSON.stringify(
      data.planning_info,
      null,
      2
    )}`
  }

  await mailTransport.sendMail(mailOptions)
  console.log('Trip creation email notification sent')
}
