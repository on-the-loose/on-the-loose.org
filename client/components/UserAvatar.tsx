import * as React from 'react'
import { Popover, Button } from 'antd'

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
        content={<a onClick={this.handleSignOut}>Sign out</a>}
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
