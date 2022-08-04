import { getDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from 'src/firebase'

export default (user) => {
  const [isLeader, setIsLeader] = useState(false)

  useEffect(() => {
    if (user == null) {
      setIsLeader(false)
    } else {
      getDoc(doc(db, 'leaders', user.email)).then((doc) => setIsLeader(doc.exists))
    }
  }, [user])

  return isLeader
}
