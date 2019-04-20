import { useEffect, useState } from 'react'
import firebase from '@/firebase'

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
