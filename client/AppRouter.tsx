import * as React from 'react'
import Home from './pages/Home'
import Trips from './pages/Trips'
import Profile from './pages/Profile'
import AppHeader from './components/Header'
import styled from 'styled-components'
import BackgroundImage from './components/BackgroundImage'
import Login from './pages/Login'
import Guide from './pages/Guide'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const Layout = styled.div`
  background-color: rgb(247, 242, 237);
  height: 100%;
`
const Content = styled.div`
  padding: 8rem 4rem 4rem 4rem;
`

const AppRouter = () => (
  <Router>
    <Layout>
      <BackgroundImage />
      <AppHeader />
      <Content>
        <Route path="/" exact component={Home} />
        <Route path="/trips/" component={Trips} />
        <Route path="/guide/" component={Guide} />
        <Route path="/profile/" component={Profile} />
        <Route path="/login/" component={Login} />
      </Content>
    </Layout>
  </Router>
)

export default AppRouter
