import * as React from 'react'

import { Layout, Menu } from 'antd'
import 'antd/lib/menu/style/css'
import { Link } from 'react-router-dom'
import { withRouter, RouteComponentProps } from 'react-router'

const { Header } = Layout

class AppHeader extends React.Component<RouteComponentProps, any> {
  public render() {
    return (
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#FFF' }}>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[this.props.location.pathname]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item key="/trips">
            <Link to="/trips">Trips</Link>
          </Menu.Item>

          <Menu.Item key="/profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

export default withRouter(AppHeader)
