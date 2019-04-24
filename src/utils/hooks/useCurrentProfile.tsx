import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from 'src/firebase'

export interface Profile {
  bday: firebase.firestore.Timestamp
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
  let user = firebase.auth().currentUser

  const [profile, updateProfile] = useState(cachedProfile)

  if (cachedProfile == null || cachedUser != user) {
    cachedUser = user

    firebase
      .firestore()
      .collection('users')
      .doc(user.email)
      .onSnapshot(doc => {
        cachedProfile = doc.data() as Profile
        updateProfile(cachedProfile)
      })
  }

  return profile
}
