import * as React from 'react'
import Home from './pages/Home'
import Trips from './pages/Trips'
import Profile from './pages/Profile'
import AppHeader from './components/Header'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Layout } from 'antd'

import 'antd/lib/layout/style/css'

const { Content, Footer } = Layout

const AppRouter = () => (
  <Router>
    <Layout style={{ height: '100%' }}>
      <AppHeader />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Route path="/" exact component={Home} />
          <Route path="/trips/" component={Trips} />
          <Route path="/profile/" component={Profile} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        On The Loose -- The outdoors club of the Claremont Colleges
      </Footer>
    </Layout>
  </Router>
)

export default AppRouter
