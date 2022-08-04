import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

export default function checkProfileExists(uid) {
  return new Promise((resolve, reject) => {
    const userRef = doc(db, `users/${uid}`)
    getDoc(userRef)
      .then((doc) => {
        resolve(doc.exists)
      })
      .catch(reject)
  })
}
