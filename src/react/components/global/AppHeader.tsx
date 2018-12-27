import { RouteComponentProps, withRouter } from 'react-router'

import AccountAvatar from '../account/AccountAvatar'
import { Link } from 'react-router-dom'
import LoginButton from '../account/LoginButton'
import { Menu } from 'antd'
import React from 'react'
import firebase from '@/firebase'
import logo from '@/assets/otl_logo_circle_lq.png'
import styled from 'styled-components'

export interface Props extends RouteComponentProps {
  user: firebase.User
}

function AppHeader(props: Props) {
  const current_page = props.location.pathname.split('/')[1]
  return (
    <s.Header>
      <s.Logo src={logo} alt="logo" />

      <s.Menu mode="horizontal" selectedKeys={[current_page ? current_page : '/']}>
        <s.Item key="/">
          <Link to="/">HOME</Link>
        </s.Item>

        <s.Item key="trips">
          <Link to="/trips">TRIPS</Link>
        </s.Item>

        <s.Item key="guide">
          <Link to="/guide">GUIDE</Link>
        </s.Item>
      </s.Menu>

      {props.user ? <AccountAvatar user={props.user} /> : <LoginButton>LOGIN</LoginButton>}
    </s.Header>
  )
}

const s = {
  Logo: styled.img`
    width: 3rem;
    height: 3rem;
    @media (max-width: 550px) {
      display: none;
    }
  `,

  Header: styled.div`
    align-items: center;
    padding: 2.5rem 4rem 1.5rem 4rem;
    display: flex;
    height: 2rem;
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 10;
    background-color: rgb(247, 242, 237, 0.95);

    @media (max-width: 700px) {
      padding: 2.5rem 2rem 1.5rem 2rem;
    }
  `,

  Menu: styled(Menu)`
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;

    @media (max-width: 550px) {
      width: 4rem;
    }
  `,

  Item: styled(Menu.Item)`
    margin-left: auto;
    padding: 0 3rem;
  `
}

export default withRouter(AppHeader)
