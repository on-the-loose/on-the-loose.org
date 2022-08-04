import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import * as nodemailer from 'nodemailer'
import * as _ from 'lodash'
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'

// If you change this regex make sure to also change the one in the front-end (ProfileForm.tsx)
export const EMAIL_REGEX =
  /.+(@pomona\.edu|@mymail.pomona\.edu|@cmc\.edu|@hmc\.edu|@g\.hmc\.edu|@scrippscollege\.edu|@pitzer\.edu|@students\.pitzer\.edu|@cgu\.edu|@kgi\.edu)/

// Emails that get notifications when trips are created or modified
const EMAIL_LIST = [
  'otlstaff@gmail.com',
  'oec@pomona.edu',
  'chris.Weyant@pomona.edu',
  'martin.crawford@pomona.edu',
]

admin.initializeApp()
const db = admin.firestore()

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCbdmTfvPp334ZhII9t2vxDACLUDJ_pfm0',
  authDomain: 'on-the-loose.firebaseapp.com',
  databaseURL: 'https://on-the-loose.firebaseio.com',
  projectId: 'on-the-loose',
  storageBucket: 'on-the-loose.appspot.com',
  messagingSenderId: '816227148735',
})

const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
})

export const checkAccountExists = functions.https.onCall((data, context) => {
  const accountDataCheck = db
    .collection('users')
    .doc(data.email.toLowerCase())
    .get()
    .then((doc) => doc.exists)

  return admin
    .auth()
    .getUserByEmail(data.email.toLowerCase())
    .then((_) => accountDataCheck)
    .catch((_) => accountDataCheck)
})

export const createAccount = functions.https.onCall(async (data, context) => {
  data.account.bday = new Date(data.account.bday)
  const email = data.account.email.toLowerCase()

  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Attempted to create account with non-5C email: ' + email)
  }

  let accountExists = false
  await admin
    .auth()
    .getUserByEmail(email)
    .then((_) => (accountExists = true))
    .catch((_) => (accountExists = false))

  return db
    .doc(`users/${email}`)
    .get()
    .then((value) => {
      if (value.exists && accountExists) throw new Error('Account already exists')
      console.log(`Creating account for: ${email}`)
      return Promise.all([
        db
          .doc(`users/${email}`)
          .set(data.account)
          .then(() => console.log(`Successfully created account for: ${email}`)),

        sendSignInLinkToEmail(getAuth(app), email, {
          url: data.url,
          handleCodeInApp: true,
        }).then(() => console.log(`Successfully sent first sign in link to: ${email}`)),
      ])
    })
})

export const onTripCreation = functions.firestore
  .document('trips/{tripId}')
  .onCreate((snap, context) => {
    const data = snap.data()
    return sendTripDataEmail(
      context.params.tripId,
      EMAIL_LIST,
      `Trip created by ${data.leader.name}: ${data.title}`
    )
  })

async function sendTripDataEmail(id: string, toEmails: string[], subject: string) {
  const mailOptions = toEmails.map((email) => ({
    from: `On The Loose <${gmailEmail}>`,
    to: email,
    subject,
    text: `Access the trip here: https://on-the-loose.org/trips/${id}`,
  }))

  await Promise.all(mailOptions.map((options) => mailTransport.sendMail(options)))
  console.log('Trip creation email notification sent')
}

export const test = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase!')
})
