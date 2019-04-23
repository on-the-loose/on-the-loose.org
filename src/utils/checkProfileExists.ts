import firebase from 'src/firebase'

export default function checkProfileExists(uid) {
  return new Promise((resolve, reject) => {
    const userRef = firebase.firestore().doc(`users/${uid}`)

    userRef
      .get()
      .then(value => {
        resolve(value.exists)
      })
      .catch(reject)
  })
}
