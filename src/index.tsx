import App from './react/App'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { render } from 'react-dom'
import firebase from '@/firebase'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(247, 242, 237);
  }
`

const renderApp = (MainComponent, user) => {
  render(
    <div>
      <GlobalStyle />
      <MainComponent user={user} />
    </div>,
    document.getElementById('react-app')
  )
}

// make sure auth is initialized before initial render
let user = firebase.auth().currentUser
firebase.auth().onAuthStateChanged(u => {
  user = u
  renderApp(App, user)
})

// hot reloading
//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept('./react/App', () => {
    renderApp(require('./react/App').default, user)
  })
}

// TODO: register service worker
