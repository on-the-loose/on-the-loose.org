import App from './react/App'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { render } from 'react-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(247, 242, 237);
  }
`

const renderApp = MainComponent => {
  render(
    <div>
      <GlobalStyle />
      <MainComponent />
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

renderApp(App)

// TODO: register service worker
