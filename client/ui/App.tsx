import * as React from 'react'

import { Layout, Menu } from 'antd'
import 'antd/lib/layout/style/css'
import 'antd/lib/menu/style/css'

const { Header, Content, Footer } = Layout

export default class App extends React.Component {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#FFF' }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">Trips</Menu.Item>
            <Menu.Item key="3">Profile</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div style={{ padding: 24, minHeight: 380 }}>Trips</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          On The Loose -- The outdoors club of the Claremont Colleges
        </Footer>
      </Layout>
    )
  }
}
