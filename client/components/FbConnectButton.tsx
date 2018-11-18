import * as React from 'react'
import firebase from 'firebase'
import { Button } from 'antd'
import styled from 'styled-components'

import facebook_f from '../assets/facebook-f.svg'
import 'antd/lib/button/style/css'

const FbLogo = styled.img`
  vertical-align: sub;
  margin-right: 0.75rem;
  height: 1rem;
`

export interface Props {}

export interface State {}

export default class FbConnectButton extends React.Component<Props, State> {
  state = {}

  handleClick = () => {
    var provider = new firebase.auth.FacebookAuthProvider()

    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(function(result) {
        // Accounts successfully linked.
        var credential = result.credential
        var user = result.user
        console.log(user)
      })
    // .catch(function(error) {
    // Handle Errors here.
    // TODO handle case in which another account is already linked
    // })
  }

  public render() {
    return (
      <Button type="primary" onClick={this.handleClick}>
        <FbLogo src={facebook_f} alt="Facebook logo" />
        Connect to Facebook
      </Button>
    )
  }
}
