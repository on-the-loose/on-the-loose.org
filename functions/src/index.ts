import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

export const checkProfileExists = functions.https.onCall((data, context) => {
  const usersRef = db.collection('users')
  const query = usersRef.where('email', '==', data.email)

  return query
    .get()
    .then(value => !value.empty)
    .catch(console.log)
})
