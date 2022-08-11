import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import * as _ from 'lodash'
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import sgMail from '@sendgrid/mail'

// If you change this regex make sure to also change the one in the front-end (ProfileForm.tsx)
export const EMAIL_REGEX =
  /.+(@pomona\.edu|@mymail.pomona\.edu|@cmc\.edu|@hmc\.edu|@g\.hmc\.edu|@scrippscollege\.edu|@pitzer\.edu|@students\.pitzer\.edu|@cgu\.edu|@kgi\.edu)/

// Emails that get notifications when trips are created or modified

const EMAIL_LIST =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? ['simonpfish@gmail.com']
    : [
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

export const onTripCreation = functions
  .runWith({ secrets: ['SENDGRID_API_KEY'] })
  .firestore.document('trips/{tripId}')
  .onCreate(async (snap, context) => {
    const data = snap.data()

    sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

    const result = await sgMail.send({
      to: 'simonpfish@gmail.com',
      from: 'On The Loose Updates <updates@on-the-loose.org>',
      subject: `Trip created by ${data.leader.name}: ${data.title}`,
      html: `<p>Trip created by ${data.leader.name}: ${data.title}</p>
        <a href=https://on-the-loose.org/trips/${context.params.tripId}>Access the trip here.</a>`,
    })

    return result[0]
  })

export const getEmailList = functions.https.onCall(async (data, context) => {
  if (context.auth?.uid == null) {
    throw new Error('Not authorized')
  }

  return EMAIL_LIST
})
