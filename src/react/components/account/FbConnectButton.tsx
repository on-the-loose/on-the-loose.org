import { Button } from 'antd'
import React from 'react'
import facebook_f from '@/assets/facebook-f.svg'
import firebase from '@/firebase'
import styled from 'styled-components'

const FbLogo = styled.img`
  vertical-align: sub;
  margin-right: 0.75rem;
  height: 1rem;
`

export default class FbConnectButton extends React.Component {
  handleClick = () => {
    var provider = new firebase.auth.FacebookAuthProvider()

    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(function(result) {
        // Accounts successfully linked.
        var credential = result.credential
        var user = result.user
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
