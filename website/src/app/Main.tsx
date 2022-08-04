import { useEffect } from 'react'
import { BrowserRouter, Redirect, Route, RouteComponentProps, withRouter } from 'react-router-dom'
import Header from './_common/Header'
import Home from './Home'
import BackgroundImage from './_common/BackgroundImage'
import Login from './account/login/Login'
import TripCreate from './trips/creation/TripCreate'
import Profile from './account/profile/Profile'
import { auth } from 'src/firebase'
import Info from './info/Info'
import { css } from '@emotion/react'
import LeaderGuide from './info/LeaderGuide'
import SkillTutorials from './info/SkillTutorials'
import LiabilityWaiver from './info/LiabilityWaiver'
import ReactGA from 'react-ga'
import ErrorBoundary from './_common/ErrorBoundary'
import TripsRouter from './trips/TripsRouter'

export default () => {
  const user = auth.currentUser

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(p) => (user != null ? <Component {...p} /> : <Redirect to="/" />)} />
  )

  const RouteListener = withRouter((props: RouteComponentProps) => {
    useEffect(
      props.history.listen((location) => ReactGA.pageview(location.pathname)),
      []
    )
    return <div />
  })

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div css={styles.layout}>
          <RouteListener />
          <BackgroundImage />
          <Header />
          <div css={styles.content}>
            <Route path="/" exact component={Home} />

            <Route path="/info" exact component={Info} />
            <Route path="/info/leader" exact component={LeaderGuide} />
            <Route path="/info/skills" exact component={SkillTutorials} />
            <Route path="/info/liability" exact component={LiabilityWaiver} />

            <TripsRouter />

            <PrivateRoute path="/create" exact component={TripCreate} />

            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

const styles = {
  layout: css`
    height: 100%;
  `,

  content: css`
    padding: 3rem;

    @media (max-width: 700px) {
      padding: 2rem 1rem 4rem 1rem;
    }
  `,
}
