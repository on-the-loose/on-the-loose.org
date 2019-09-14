import { useEffect, useState } from 'react'
import firebase from 'src/firebase'

export default user => {
  const [isLeader, setIsLeader] = useState(false)

  useEffect(() => {
    firebase
      .firestore()
      .collection('leaders')
      .doc(user.email)
      .get()
      .then(doc => setIsLeader(doc.exists))
  }, [user])

  return isLeader
}
