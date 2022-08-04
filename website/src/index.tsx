import App from './app/Main'
import ReactDOM from 'react-dom/client'
import ReactGA from 'react-ga'
import * as Sentry from '@sentry/browser'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebase'
import { getDoc, doc } from 'firebase/firestore'

ReactGA.initialize('UA-135898682-1')

Sentry.init({
  dsn: 'https://8fe2ccffd0b144d9b076ccb889f6bc36@sentry.io/1412813',
  environment: process.env.NODE_ENV,
})

const renderApp = (MainComponent) => {
  const root = ReactDOM.createRoot(document.getElementById('react-app'))
  root.render(<MainComponent />)
}

// make sure auth is initialized before initial render
onAuthStateChanged(auth, (user) => {
  renderApp(App)

  // logout if user data doesn't exist
  if (user && user.email) {
    getDoc(doc(db, 'users', user.email)).then((doc) => {
      if (!doc.exists) {
        window.alert(
          'We just improved the OTL website by making adjustments to our account model, ' +
            'you will have to re-authenticate to make these changes effective. ' +
            'Simply reload the page once this alert is gone. Sorry for any inconveniences caused.'
        )
        auth.signOut()
      }
    })
  }
})
