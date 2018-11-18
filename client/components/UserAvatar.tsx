import * as React from 'react'
import { Popover, Button } from 'antd'
import { Link } from 'react-router-dom'

import 'antd/lib/popover/style/css'
import 'antd/lib/button/style/css'

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
        <Button shape="circle" icon="user" size="large" />
      </Popover>
    )

    // <Avatar size="large">{this.props.user.email[0].toUpperCase()}</Avatar>
  }
}
