import * as React from 'react'
import { Avatar } from 'antd'

import 'antd/lib/avatar/style/css'
import firebase from 'firebase'

// TODO add signout

export interface Props {
  user: firebase.User
}

const AccountAvatar: React.SFC<Props> = props => {
  const user = firebase.auth().currentUser

  return <Avatar size="large">{user.email[0].toUpperCase()}</Avatar>
}

export default AccountAvatar
