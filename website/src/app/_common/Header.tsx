import { RouteComponentProps, useLocation, withRouter } from 'react-router'
import UserAvatar from '../account/UserAvatar'
import { Link } from 'react-router-dom'
import LoginButton from '../account/login/LoginButton'
import { Menu } from 'antd'
import logo from 'src/assets/otl_logo_circle_lq.png'
import { css } from '@emotion/react'
import { auth } from 'src/firebase'

function Header(_) {
  const user = auth.currentUser
  const location = useLocation()

  const current_page = location.pathname.split('/')[1]

  return (
    <div css={styles.header}>
      <img css={styles.logo} src={logo} alt="logo" />

      <Menu
        css={styles.menu}
        mode="horizontal"
        selectedKeys={[current_page ? current_page : '/']}
        items={[
          {
            key: '/',
            label: (
              <Link css={styles.item} to="/">
                HOME
              </Link>
            ),
          },
          {
            key: 'trips',
            label: (
              <Link css={styles.item} to="/trips">
                TRIPS
              </Link>
            ),
          },
          {
            key: 'info',
            label: (
              <Link css={styles.item} to="/info">
                INFO
              </Link>
            ),
          },
        ]}
      />

      {user ? <UserAvatar /> : <LoginButton />}
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
    background-color: rgba(0, 0, 0, 0);
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  `,

  item: css`
    padding: 0 2rem;

    @media (max-width: 550px) {
      padding: 0 1rem;
    }
  `,
}

export default Header
