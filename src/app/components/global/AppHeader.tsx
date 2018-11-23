import { RouteComponentProps, withRouter } from 'react-router'

import AccountAvatar from '../account/UserAvatar'
import { Link } from 'react-router-dom'
import LoginButton from '../account/LoginButton'
import { Menu } from 'antd'
import React from 'react'
import firebase from '../../main/firebase'
import logo from 'assets/otl_logo_circle_lq.png'
import styled from 'styled-components'

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
  background-color: rgba(0, 0, 0, 0);
`

const StyledItem = styled(Menu.Item)`
  margin-left: auto;
  padding: 0 3rem;
`

export interface Props extends RouteComponentProps {
  user: firebase.User
}

class AppHeader extends React.Component<Props, any> {
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

        {this.props.user ? (
          <AccountAvatar user={this.props.user} />
        ) : (
          <LoginButton>LOGIN</LoginButton>
        )}
      </Header>
    )
  }
}

export default withRouter(AppHeader)
