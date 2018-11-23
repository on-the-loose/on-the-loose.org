import 'antd/lib/popover/style/css'
import 'antd/lib/button/style/css'
import 'antd/lib/avatar/style/css'

import { Avatar, Button, Popover } from 'antd'

import { Link } from 'react-router-dom'
import React from 'react'
import firebase from 'firebase'

export interface Props {
  user: firebase.User
}

export interface State {
  show_popover: boolean
}

export default class AccountAvatar extends React.Component<Props, State> {
  state = { show_popover: false }

  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      })
  }

  public render() {
    const isFbConnected = this.props.user.providerData[0].providerId == 'facebook.com'
    const fbData = this.props.user.providerData[0]

    return (
      <Popover
        placement="bottomLeft"
        content={
          <div style={{ textAlign: 'center' }}>
            <a onClick={this.handleSignOut}>Sign out</a> |{' '}
            <Link to={'/profile'} onClick={() => this.setState({ show_popover: false })}>
              Profile
            </Link>
          </div>
        }
        title={this.props.user.email}
        trigger="click"
        visible={this.state.show_popover}
        onVisibleChange={show_popover => {
          this.setState({ show_popover })
        }}
      >
        {isFbConnected ? (
          <Button shape="circle" size="large">
            <Avatar src={fbData.photoURL + '?type=large'} />
          </Button>
        ) : (
          <Button shape="circle" icon="user" size="large" />
        )}
      </Popover>
    )

    // <Avatar size="large">{this.props.user.email[0].toUpperCase()}</Avatar>
  }
}
