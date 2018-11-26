import { Button, Form, Icon, Input } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import firebase from '@/firebase'

function LoginForm(props: FormComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (err) return

      setIsLoading(true)

      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:3000/login',
        // This must be true.
        handleCodeInApp: true
      }

      firebase
        .auth()
        .sendSignInLinkToEmail(values.email, actionCodeSettings)
        .then(() => {
          setIsLoading(false)
          setIsEmailSent(true)

          window.localStorage.setItem('emailForSignIn', values.email)
        })
        .catch(error => {
          console.error(error)
        })
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Use your email from one of the Claremont Colleges to log in to OTL. You'll receive a link to
        access your account.
      </p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item style={{ height: '1.5rem', marginBottom: '3rem' }}>
          {getFieldDecorator('email', {
            rules: [
              { required: true, message: 'Please enter your email' },
              {
                type: 'email',
                message: ' '
              },
              {
                pattern: /.+(@pomona\.edu|@mymail.pomona\.edu|@cmc\.edu|@hmc\.edu|@g\.hmc\.edu|@scrippscollege\.edu|@pitzer\.edu)/,
                message: 'You must use a Claremont Colleges email address.'
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="School Email"
            />
          )}
        </Form.Item>

        {isEmailSent ? (
          <p>A login link has been sent to your email</p>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Log in
          </Button>
        )}
      </Form>
    </div>
  )
}

export default Form.create()(LoginForm)
