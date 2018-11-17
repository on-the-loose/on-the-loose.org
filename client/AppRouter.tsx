import * as React from 'react'
import Home from './pages/Home'
import Trips from './pages/Trips'
import Profile from './pages/Profile'
import AppHeader from './components/Header'
import styled from 'styled-components'
import BackgroundImage from './components/BackgroundImage'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const Layout = styled.div`
  background-color: rgb(247, 242, 237);
  height: 100%;
`
const Content = styled.div`
  padding: 6rem 3rem;
`

const AppRouter = () => (
  <Router>
    <Layout>
      <BackgroundImage />
      <AppHeader />
      <Content>
        <Route path="/" exact component={Home} />
        <Route path="/trips/" component={Trips} />
        <Route path="/profile/" component={Profile} />
      </Content>
    </Layout>
  </Router>
)

export default AppRouter
