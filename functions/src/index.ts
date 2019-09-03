import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as firebase from 'firebase/app'
import * as nodemailer from 'nodemailer'
import * as _ from 'lodash'
import { orderBy } from 'natural-orderby'
import 'firebase/auth'
import 'firebase/firestore'

// If you change this regex make sure to also change the one in the front-end (ProfileForm.tsx)
export const EMAIL_REGEX = /.+(@pomona\.edu|@mymail.pomona\.edu|@cmc\.edu|@hmc\.edu|@g\.hmc\.edu|@scrippscollege\.edu|@pitzer\.edu|@students\.pitzer\.edu|@cgu\.edu|@kgi\.edu)/

// Emails that get notifications when trips are created or modified
const EMAIL_LIST = [
  'otlstaff@gmail.com',
  'oec@pomona.edu',
  'Chris.Weyant@pomona.edu',
  'martin.crawford@pomona.edu'
]

// Map from database key to planning question for formatting the notifcation emails
const keyToQuestion = {
  location: '1. What is the location and/or trailhead name of your destination?',
  permit: '2. Do you need a special permit to visit this location? How will you obtain it?',
  activities: '3. What activities will you be doing? (Hiking, kayaking, surfing, climbing, etc.)',
  risks: '4. What are the potential risks associated with this activity?',
  risk_management: '5. How do you plan to manage or eliminate these risks?',
  backcountry:
    '6. Will this be a backcountry trip? (2 hours or more away from definitive medical care)',
  wfa_wfr: '7. If Yes, which leaders have Wilderness First Aid certification or above?',
  first_aid:
    '8. If this is not a backcountry trip, which leaders have a current CPR/FirstAid cert from American Red Cross, American Heart Association, or equivalent?',
  been_before: '9. Have any of the leaders been in this location before?',
  evacuation: '10. Do you have a planned evacuation route for emergencies?',
  reimbursement:
    '11. Approximately how much is your trip going to request reimbursement through OTL? (Reimbursements include gas ($0.15/mile up to 300 miles), campsites, permits, park entrance fees) ',
  cost_per_person: '12. How much is your trip going to cost per participant? ',
  miles: '13. How many total miles are you planning_info to complete during your hike?',
  water: '14. Do you have a reliable water source along the way?',
  turnaround_time: '15. Do you have a turnaround time for your hike? When?'
}

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
    .getUserByEmail(data.email.toLowerCase())
    .then(_ => true)
    .catch(_ => false)
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
    .then(_ => (accountExists = true))
    .catch(_ => (accountExists = false))

  return db
    .doc(`users/${email}`)
    .get()
    .then(value => {
      if (value.exists && accountExists) throw new Error('Account already exists')
      console.log(`Creating account for: ${email}`)
      return Promise.all([
        db
          .doc(`users/${email}`)
          .set(data.account)
          .then(() => console.log(`Successfully created account for: ${email}`)),
        firebase
          .auth()
          .sendSignInLinkToEmail(email, {
            url: data.url,
            handleCodeInApp: true
          })
          .then(() => console.log(`Successfully sent first sign in link to: ${email}`))
      ])
    })
})

export const onTripCreation = functions.firestore
  .document('trips/{tripId}')
  .onCreate((snap, context) => {
    const data = snap.data()
    return sendTripDataEmail(
      context.params.tripId,
      data,
      EMAIL_LIST,
      `Trip created by ${data.leader.name}: ${data.title}`
    )
  })

export const onTripEdit = functions.firestore
  .document('trips/{tripId}')
  .onUpdate((change, context) => {
    const before = change.before.data()
    const after = change.after.data()
    if (!_.isEqual(before.planning_info, after.planning_info)) {
      return sendTripDataEmail(
        context.params.tripId,
        after,
        EMAIL_LIST,
        `Trip edited by ${change.after.data().leader.name}: ${change.after.data().title}`
      )
    }
    return null
  })

async function sendTripDataEmail(id, data, toEmails, subject) {
  const planningInfo = _.mapKeys(data.planning_info, (value, key) => keyToQuestion[key])
  let htmlListItems = []
  Object.keys(planningInfo).forEach(key => {
    htmlListItems.push(`<p><b>${key}</b><ul><li>${planningInfo[key]}</li></ul></p>`)
  })
  const mailOptions = toEmails.map(email => ({
    from: `On The Loose <otlupdates@gmail.com>`,
    to: email,
    subject,
    text: ` \n\n \n\n`,
    html: `<html>
            <h3>Access the trip at https://on-the-loose.org/trips/${id}</h3> 
            <h3>Trip Planning Information:</h3>
            ${orderBy(htmlListItems).join('\n')}
          </html>`
  }))

  await Promise.all(mailOptions.map(options => mailTransport.sendMail(options)))
  console.log('Trip creation email notification sent')
}
