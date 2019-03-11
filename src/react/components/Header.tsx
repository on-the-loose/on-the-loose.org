import { RouteComponentProps, withRouter } from 'react-router'

import AccountAvatar from './account/AccountAvatar'
import { Link } from 'react-router-dom'
import LoginButton from './account/LoginButton'
import { Menu } from 'antd'
import React from 'react'
import firebase from '@/firebase'
import logo from '@/assets/otl_logo_circle_lq.png'
import css from '@emotion/css'

export interface Props extends RouteComponentProps {
  user: firebase.User
}

function Header(props: Props) {
  const current_page = props.location.pathname.split('/')[1]
  return (
    <div css={styles.header}>
      <img css={styles.logo} src={logo} alt="logo" />

      <Menu css={styles.menu} mode="horizontal" selectedKeys={[current_page ? current_page : '/']}>
        <Menu.Item css={styles.item} key="/">
          <Link to="/">HOME</Link>
        </Menu.Item>

        <Menu.Item css={styles.item} key="trips">
          <Link to="/trips">TRIPS</Link>
        </Menu.Item>

        <Menu.Item css={styles.item} key="info">
          <Link to="/info">INFO</Link>
        </Menu.Item>
      </Menu>

      {props.user ? <AccountAvatar /> : <LoginButton>LOGIN</LoginButton>}
    </div>
  )
}

const styles = {
  logo: css`
    width: 2.5rem;
    height: 2.5rem;
  `,

  header: css`
    align-items: center;
    padding: 2.5rem 4rem 1.5rem 4rem;
    display: flex;
    height: 2rem;
    top: 0;
    width: 100%;
    z-index: 10;
    background-color: rgb(247, 242, 237);

    @media (max-width: 700px) {
      padding: 2rem 1rem 1.5rem 1rem;
    }
  `,

  menu: css`
    margin-left: auto;
    margin-right: auto;
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
  `,

  item: css`
    margin-left: auto;
    padding: 0 3rem;

    @media (max-width: 550px) {
      padding: 0 1rem;
    }
  `
}

export default withRouter(Header)
