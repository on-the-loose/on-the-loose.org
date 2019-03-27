import React, { useState } from 'react'
import { Popover } from 'antd'
import firebase from '@/firebase'

export default function UserInfoPopover(props) {
  const db = firebase.firestore()

  const [userData, setUserData] = useState()

  db.collection('users')
    .doc(props.email)
    .get()
    .then(value => {
      setUserData(value.data())
    })

  return (
    <Popover content={userData && userData.gradYear} placement="right">
      {props.children}
    </Popover>
  )
}
