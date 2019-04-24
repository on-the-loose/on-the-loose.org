import React, { Component } from 'react'
import * as Sentry from '@sentry/browser'
import { Alert } from 'antd'
import css from '@emotion/css'

export default class ErrorBoundary extends Component<any, { error: any }> {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  render() {
    if (this.state.error) {
      //render fallback UI
      return (
        <Alert
          message={
            <p>
              Whoops! something went wrong. We just received a notification and will work on fixing
              it as soon as possible.{' '}
              <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>
            </p>
          }
          type="error"
          css={css`
            max-width: 40rem;
            margin: 1rem auto;
          `}
        />
      )
    } else {
      //when there's not an error, render children untouched
      return this.props.children
    }
  }
}
