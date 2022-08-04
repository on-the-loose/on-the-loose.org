import { Button } from 'antd'
import { useState } from 'react'
import ProfileForm from './profile/ProfileForm'
import _ from 'lodash'
import { functions } from 'src/firebase'
import { httpsCallable } from 'firebase/functions'

// TODO: handle errors
// TODO: add cancel button

export interface Props {
  email: string
}

export default (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleFormFinish = (values) => {
    setIsLoading(true)
    setIsDisabled(true)

    httpsCallable(
      functions,
      'createAccount'
    )({
      account: _.omitBy(values, _.isUndefined),
      url:
        process.env.NODE_ENV == 'development'
          ? 'http://localhost:1234/login'
          : 'https://on-the-loose.org/login',
    }).then((res) => {
      setIsLoading(false)
      setIsEmailSent(true)
    })

    window.localStorage.setItem('emailForSignIn', values.email)
  }

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Welcome to OTL! Let's set up your profile.
      </p>
      <ProfileForm
        onFinish={handleFormFinish}
        isDisabled={isDisabled}
        initialValues={{
          bday: undefined,
          email: props.email,
          gradYear: undefined,
          name: undefined,
          school: undefined,
          tel: undefined,
          verified: undefined,
        }}
        submitButton={
          isEmailSent ? (
            <p>
              Welcome! A log in link has been sent to your email.{' '}
              <a
                onClick={() => {
                  setIsEmailSent(false)
                  setIsDisabled(false)
                }}
              >
                Cancel
              </a>
            </p>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={isLoading}
            >
              Sign up
            </Button>
          )
        }
      />
    </div>
  )
}
