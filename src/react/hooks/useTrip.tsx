import { useEffect, useState } from 'react'
import firebase from 'src/firebase'

export default id => {
  const [tripDoc, setTripDoc] = useState(null)

  useEffect(() => {
    return firebase
      .firestore()
      .doc(`trips/${id}`)
      .onSnapshot(doc => setTripDoc(doc))
  }, [])

  return tripDoc
}
