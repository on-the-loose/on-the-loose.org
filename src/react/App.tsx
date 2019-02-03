import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

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
import Info from './views/Info'
import css from '@emotion/css'

export default function App({ user }: { user: firebase.User }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (user != null ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )

  return (
    <Router>
      <div css={styles.layout}>
        <BackgroundImage />
        <Header user={user} />
        <div css={styles.content}>
          <Route path="/" exact component={Home} />
          <Route path="/info" exact component={Info} />

          <Route path="/trips" exact component={TripList} />
          <PrivateRoute
            path="/trips/:id"
            exact
            component={({ match }) => <Trip id={match.params.id} />}
          />
          <PrivateRoute
            path="/trips/:id/edit"
            exact
            component={({ match }) => <TripEdit id={match.params.id} />}
          />
          <PrivateRoute path="/create" exact component={TripCreate} />

          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    </Router>
  )
}

const styles = {
  layout: css`
    height: 100%;
  `,

  content: css`
    padding: 8rem 4rem 4rem 4rem;

    @media (max-width: 700px) {
      padding: 2rem 1rem 4rem 1rem;
    }
  `
}
