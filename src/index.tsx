import App from './react/App'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { render } from 'react-dom'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: rgb(247, 242, 237);
  }
`

render(
  <div>
    <GlobalStyle />
    <App />
  </div>,
  document.getElementById('react-app')
)
