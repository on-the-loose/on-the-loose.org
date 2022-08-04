import { doc, onSnapshot, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { auth, db } from 'src/firebase'

export interface Profile {
  bday: Timestamp
  email: string
  gradYear: number
  name: string
  school: string
  tel: number
  verified: boolean
  dietary_restrictions?: string
}

let cachedProfile: Profile = null
let cachedUser = null

export default () => {
  let user = auth.currentUser

  const [profile, updateProfile] = useState(cachedProfile)

  // TODO: maybe wrap this in a useEffect?
  if (cachedProfile == null || cachedUser != user) {
    cachedUser = user

    const userDoc = doc(db, 'users', user.email)
    onSnapshot(userDoc, (doc) => {
      cachedProfile = doc.data() as Profile
      updateProfile(cachedProfile)
    })
  }

  return profile
}
