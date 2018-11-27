import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import AppHeader from './components/global/AppHeader'
import BackgroundImage from './components/global/BackgroundImage'
import Guide from './views/Guide'
import Home from './views/Home'
import Login from './views/Login'
import Profile from './views/Profile'
import Trip from './views/Trip'
import TripList from './views/TripList'
import firebase from '@/firebase'
import styled from 'styled-components'

export default function App() {
  const user = firebase.auth().currentUser

  return (
    <Router>
      <s.Layout>
        <BackgroundImage />
        <AppHeader user={user} />
        <s.Content>
          <Route path="/" exact component={Home} />
          <Route path="/trips/" exact component={() => <TripList user={user} />} />
          <Route path="/trips/:id" component={({ match }) => <Trip id={match.params.id} />} />
          <Route path="/guide/" component={Guide} />
          <Route path="/profile/" component={() => <Profile user={user} />} />
          <Route path="/login/" component={Login} />
        </s.Content>
      </s.Layout>
    </Router>
  )
}

const s = {
  Layout: styled.div`
    background-color: rgb(247, 242, 237);
    height: 100%;
  `,

  Content: styled.div`
    padding: 8rem 4rem 4rem 4rem;
  `
}
