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

let user = firebase.auth().currentUser
firebase.auth().onAuthStateChanged(u => {
  user = u
})

const renderApp = MainComponent => {
  render(
    <div>
      <GlobalStyle />
      <MainComponent user={user} />
    </div>,
    document.getElementById('react-app')
  )
}

//@ts-ignore
if (module.hot) {
  //@ts-ignore
  module.hot.accept('./react/App', () => {
    renderApp(require('./react/App').default)
  })
}

// make sure auth is initialized before initial render
firebase.auth().onAuthStateChanged(u => renderApp(App))

// TODO: register service worker
