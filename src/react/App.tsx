import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import AppHeader from './components/global/AppHeader'
import BackgroundImage from './components/global/BackgroundImage'
import Guide from './pages/Guide'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Trips from './pages/Trips'
import firebase from '@/firebase'
import styled from 'styled-components'

const Layout = styled.div`
  background-color: rgb(247, 242, 237);
  height: 100%;
`
const Content = styled.div`
  padding: 8rem 4rem 4rem 4rem;
`

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const removeAuthListener = firebase.auth().onAuthStateChanged(u => {
      setUser(u)
    })
    return () => removeAuthListener()
  }, [])

  return (
    <Router>
      <Layout>
        <BackgroundImage />
        <AppHeader user={user} />
        <Content>
          <Route path="/" exact component={Home} />
          <Route path="/trips/" component={() => <Trips user={user} />} />
          <Route path="/guide/" component={Guide} />
          <Route path="/profile/" component={() => <Profile user={user} />} />
          <Route path="/login/" component={Login} />
        </Content>
      </Layout>
    </Router>
  )
}
