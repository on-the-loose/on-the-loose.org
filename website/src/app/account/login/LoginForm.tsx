import Icon from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { sendSignInLinkToEmail } from 'firebase/auth'
import { httpsCallable } from 'firebase/functions'
import { useState } from 'react'
import { auth, functions } from 'src/firebase'
import { EMAIL_REGEX } from '../profile/ProfileForm'

export interface Props {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
  setEmail: (email: string) => void
}

const LoginForm: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [form] = Form.useForm()

  const handleFinish = (values) => {
    setIsLoading(true)

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be whitelisted in the Firebase Console.
      url:
        process.env.NODE_ENV == 'development'
          ? 'http://localhost:1234/login'
          : 'https://on-the-loose.org/login',
      // This must be true.
      handleCodeInApp: true,
    }

    httpsCallable(
      functions,
      'checkAccountExists'
    )({ email: values.email }).then((res) => {
      if (res.data) {
        sendSignInLinkToEmail(auth, values.email, actionCodeSettings).then(() => {
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
  }

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Use your Claremont Colleges email address to log in to OTL. You'll receive a link to access
        your account.
      </p>
      <Form onFinish={handleFinish} className="login-form" form={form}>
        <Form.Item
          style={{ height: '1.5rem', marginBottom: '3rem' }}
          name="username"
          rules={[
            { required: true, message: 'Please enter your email' },
            {
              type: 'email',
              message: ' ',
            },
            {
              pattern: EMAIL_REGEX,
              message: 'You must use a Claremont Colleges email address.',
            },
          ]}
        >
          <Input
            size="large"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="School Email"
            onChange={() => {
              if (isEmailSent) setIsEmailSent(false)
            }}
          />
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

export default LoginForm
