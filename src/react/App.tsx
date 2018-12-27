import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import AppHeader from './components/global/AppHeader'
import BackgroundImage from './components/global/BackgroundImage'
import Guide from './views/Guide'
import Home from './views/Home'
import Login from './views/Login'
import TripCreation from './views/TripCreation'
import Profile from './views/Profile'
import Trip from './views/Trip'
import TripList from './views/TripList'
import firebase from '@/firebase'
import styled from 'styled-components'

export default function App(props: { user: firebase.User }) {
  return (
    <Router>
      <s.Layout>
        <BackgroundImage />
        <AppHeader user={props.user} />
        <s.Content>
          <Route path="/" exact component={Home} />
          <Route path="/trips/" exact component={TripList} />
          <Route path="/trips/:id" exact component={({ match }) => <Trip id={match.params.id} />} />
          <Route path="/create" exact component={TripCreation} />
          <Route path="/guide/" component={Guide} />
          <Route path="/profile/" component={Profile} />
          <Route path="/login/" component={Login} />
        </s.Content>
      </s.Layout>
    </Router>
  )
}

const s = {
  Layout: styled.div`
    height: 100%;
  `,

  Content: styled.div`
    padding: 8rem 4rem 4rem 4rem;

    @media (max-width: 700px) {
      padding: 8rem 1rem 4rem 1rem;
    }
  `
}
