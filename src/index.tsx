import App from './app/Main'
import React from 'react'
import { Global, css } from '@emotion/core'
import { render } from 'react-dom'
import firebase from 'src/firebase'
import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'

ReactGA.initialize('UA-135898682-1')

Sentry.init({
  dsn: 'https://8fe2ccffd0b144d9b076ccb889f6bc36@sentry.io/1412813',
  environment: process.env.NODE_ENV
})

const renderApp = MainComponent => {
  render(<MainComponent />, document.getElementById('react-app'))
}

// make sure auth is initialized before initial render
firebase.auth().onAuthStateChanged(u => {
  renderApp(App)
})

// hot reloading
//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept('./app/Main', () => {
    renderApp(require('./app/Main').default)
  })
}
