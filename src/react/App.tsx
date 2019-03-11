import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  withRouter
} from 'react-router-dom'
import Header from './components/Header'
import Home from './views/Home'
import BackgroundImage from './components/BackgroundImage'
import Login from './views/account/Login'
import TripCreate from './views/trips/TripCreate'
import TripEdit from './views/trips/TripEdit'
import Profile from './views/account/Profile'
import Trip from './views/trips/Trip'
import TripList from './views/trips/TripList'
import firebase from '@/firebase'
import Info from './views/info/Info'
import css from '@emotion/css'
import LeaderGuide from './views/info/LeaderGuide'
import SkillTutorials from './views/info/SkillTutorials'
import LiabilityWaiver from './views/info/LiabilityWaiver'
import ReactGA from 'react-ga'
import ErrorBoundary from './ErrorBoundary'
import useTrips from './hooks/useTrips'

export default function App({ user }: { user: firebase.User }) {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props => (user != null ? <Component {...props} /> : <Redirect to="/" />)}
    />
  )

  const RouteListener = withRouter((props: RouteComponentProps) => {
    useEffect(props.history.listen(location => ReactGA.pageview(location.pathname)), [])
    return <div />
  })

  const [hidePastTrips, setHidePastTrips] = useState(true)
  const [trips, pastTrips] = useTrips(user, hidePastTrips)

  return (
    <ErrorBoundary>
      <Router>
        <div css={styles.layout}>
          <RouteListener />
          <BackgroundImage />
          <Header user={user} />
          <div css={styles.content}>
            <Route path="/" exact component={Home} />
            <Route path="/info" exact component={Info} />
            <Route path="/info/leader" exact component={LeaderGuide} />
            <Route path="/info/skills" exact component={SkillTutorials} />
            <Route path="/info/liability" exact component={LiabilityWaiver} />

            <Route
              path="/trips"
              exact
              component={() => (
                <TripList
                  trips={trips}
                  pastTrips={pastTrips}
                  hidePastTrips={hidePastTrips}
                  setHidePastTrips={setHidePastTrips}
                />
              )}
            />
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
    </ErrorBoundary>
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
