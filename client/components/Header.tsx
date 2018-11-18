import * as React from 'react'

import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'
import styled from 'styled-components'

import logo from '../assets/otl_logo_circle_lq.png'
import LoginButton from './LoginButton'
import firebase from 'firebase'
import AccountAvatar from './UserAvatar'

import 'antd/lib/menu/style/css'

const Logo = styled.img`
  width: 3rem;
  height: 3rem;
`

const Header = styled.div`
  align-items: center;
  padding: 3rem 4rem;
  display: flex;
  height: 3rem;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 10;
`

const StyledMenu = styled(Menu)`
  margin-left: auto;
  margin-right: auto;
`

const StyledItem = styled(Menu.Item)`
  margin-left: auto;
  padding: 0 3rem;
`

export interface State {
  user: firebase.User
}

class AppHeader extends React.Component<RouteComponentProps, State> {
  state = { user: null }
  removeAuthListener: firebase.Unsubscribe

  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }

  public render() {
    return (
      <Header>
        <Logo src={logo} alt="logo" />

        <StyledMenu mode="horizontal" selectedKeys={[this.props.location.pathname]}>
          <StyledItem key="/">
            <Link to="/">HOME</Link>
          </StyledItem>

          <StyledItem key="/trips">
            <Link to="/trips">TRIPS</Link>
          </StyledItem>

          <StyledItem key="/guide">
            <Link to="/guide">GUIDE</Link>
          </StyledItem>
        </StyledMenu>

        {this.state.user ? (
          <AccountAvatar user={this.state.user} />
        ) : (
          <LoginButton>LOGIN</LoginButton>
        )}
      </Header>
    )
  }
}

export default withRouter(AppHeader)
