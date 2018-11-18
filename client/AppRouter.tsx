import * as React from 'react'
import Home from './pages/Home'
import Trips from './pages/Trips'
import Profile from './pages/Profile'
import AppHeader from './components/AppHeader'
import styled from 'styled-components'
import BackgroundImage from './components/BackgroundImage'
import Login from './pages/Login'
import Guide from './pages/Guide'
import firebase from 'firebase'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const Layout = styled.div`
  background-color: rgb(247, 242, 237);
  height: 100%;
`
const Content = styled.div`
  padding: 8rem 4rem 4rem 4rem;
`

export interface State {
  user: firebase.User
}

export default class AppRouter extends React.Component<any, State> {
  state = { user: null }
  removeAuthListener: firebase.Unsubscribe

  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  componentWillUnmount() {
    this.removeAuthListener()
  }
  public render() {
    return (
      <Router>
        <Layout>
          <BackgroundImage />
          <AppHeader user={this.state.user} />
          <Content>
            <Route path="/" exact component={Home} />
            <Route path="/trips/" component={() => <Trips user={this.state.user} />} />
            <Route path="/guide/" component={Guide} />
            <Route path="/profile/" component={() => <Profile user={this.state.user} />} />
            <Route path="/login/" component={Login} />
          </Content>
        </Layout>
      </Router>
    )
  }
}
