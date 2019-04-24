import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import firebase from 'src/firebase'
import { EMAIL_REGEX } from '../profile/ProfileForm'

export interface Props extends FormComponentProps {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
  setEmail: (string) => void
}

const LoginForm: React.FC<Props> = (props: Props) => {
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
        url:
          process.env.NODE_ENV == 'production'
            ? 'https://on-the-loose.org/login'
            : 'http://localhost:1234/login',
        // This must be true.
        handleCodeInApp: true
      }

      firebase
        .functions()
        .httpsCallable('checkAccountExists')({ email: values.email })
        .then(res => {
          if (res.data) {
            firebase
              .auth()
              .sendSignInLinkToEmail(values.email, actionCodeSettings)
              .then(() => {
                setIsLoading(false)
                setIsEmailSent(true)

                window.localStorage.setItem('emailForSignIn', values.email)
              })
          } else {
            setIsLoading(false)
            props.setEmail(values.email)
            props.setIsSignUp(true)
          }
        })
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Use your Claremont Colleges email address to log in to OTL. You'll receive a link to access
        your account.
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
                pattern: EMAIL_REGEX,
                message: 'You must use a Claremont Colleges email address.'
              }
            ]
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="School Email"
              onChange={() => {
                if (isEmailSent) setIsEmailSent(false)
              }}
            />
          )}
        </Form.Item>
        {isEmailSent ? (
          <p>A login link has been sent to your email</p>
        ) : (
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Log in
          </Button>
        )}
      </Form>
    </div>
  )
}

export default Form.create<Props>()(LoginForm)