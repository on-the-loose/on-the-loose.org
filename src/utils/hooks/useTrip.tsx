import { onSnapshot, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'src/firebase'

export default (id: string) => {
  const [tripDoc, setTripDoc] = useState(null)

  useEffect(() => {
    return onSnapshot(doc(db, `trips/${id}`), (doc) => setTripDoc(doc))
  }, [])

  return tripDoc
}
