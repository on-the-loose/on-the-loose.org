import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import firebase from '@/firebase'
import { withRouter } from 'react-router-dom'
import { Icon } from 'antd'

function Login(props: RouteComponentProps) {
  const [hasLoginError, setHasLoginError] = useState<boolean>(false)

  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      var email = window.localStorage.getItem('emailForSignIn')
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation')
      }
      // The client SDK will parse the code from the link for you.
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(result => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn')
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          if (!result.additionalUserInfo.isNewUser) props.history.replace('/')
          else props.history.replace('/profile')
        })
        .catch(error => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          setHasLoginError(true)
          console.log(error.code)
        })
    } else {
      props.history.replace('/')
    }
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {hasLoginError ? (
        <h2 style={{ margin: '4rem' }}>Login error. Try again.</h2>
      ) : (
        <div>
          {' '}
          <h2 style={{ margin: '4rem' }}>Logging in</h2>
          <Icon type="loading" style={{ fontSize: '50px' }} />
        </div>
      )}
    </div>
  )
}

export default withRouter(Login)
