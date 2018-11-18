import * as React from 'react'
import FbConnectButton from '../components/FbConnectButton'
import { Avatar } from 'antd'

import 'antd/lib/avatar/style/css'

export interface Props {
  user: firebase.User
}

export default class Profile extends React.Component<Props> {
  public render() {
    if (this.props.user) {
      const isFbConnected = this.props.user.providerData[0].providerId == 'facebook.com'
      const fbData = this.props.user.providerData[0]

      console.log(fbData)

      return isFbConnected ? (
        <div style={{ textAlign: 'center' }}>
          <Avatar size={200} src={fbData.photoURL + '?type=large'} />
          <h1>{fbData.displayName}</h1>
        </div>
      ) : (
        <FbConnectButton />
      )
    } else {
      return <div />
    }
  }
}
