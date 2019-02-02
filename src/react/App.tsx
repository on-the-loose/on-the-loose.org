import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import Header from './components/Header'
import Home from './views/Home'
import BackgroundImage from './components/BackgroundImage'
import Login from './views/Login'
import TripCreate from './views/TripCreate'
import TripEdit from './views/TripEdit'
import Profile from './views/Profile'
import Trip from './views/Trip'
import TripList from './views/TripList'
import firebase from '@/firebase'
import styled from 'styled-components'
import Info from './views/Info'

export default function App(props: { user: firebase.User }) {
  return (
    <Router>
      <s.Layout>
        <BackgroundImage />
        <Header user={props.user} />
        <s.Content>
          <Route path="/" exact component={Home} />
          <Route path="/info" exact component={Info} />

          <Route path="/trips/" exact component={TripList} />
          <Route path="/trips/:id" exact component={({ match }) => <Trip id={match.params.id} />} />
          <Route
            path="/trips/:id/edit"
            exact
            component={({ match }) => <TripEdit id={match.params.id} />}
          />
          <Route path="/create" exact component={TripCreate} />

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
      padding: 2rem 1rem 4rem 1rem;
    }
  `
}
