import { Button } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import firebase from '@/firebase'
import ProfileForm from './ProfileForm'

// TODO: handle errors
// TODO: add cancel button

export interface Props {
  email: string
}

export default function SignUp(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      setIsLoading(true)
      setIsDisabled(true)

      firebase
        .functions()
        .httpsCallable('createAccount')({
          account: values,
          url:
            process.env.NODE_ENV == 'production'
              ? 'https://on-the-loose.firebaseapp.com/login'
              : 'http://localhost:3000/login'
        })
        .then(res => {
          setIsLoading(false)
          setIsEmailSent(true)
        })

      window.localStorage.setItem('emailForSignIn', values.email)
    })
  }

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Welcome to OTL! Let's set up your profile.
      </p>
      <ProfileForm
        onSubmit={handleSubmit}
        isDisabled={isDisabled}
        initialValues={{
          bday: undefined,
          email: props.email,
          gradYear: undefined,
          name: undefined,
          school: undefined,
          tel: undefined,
          verified: undefined
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
