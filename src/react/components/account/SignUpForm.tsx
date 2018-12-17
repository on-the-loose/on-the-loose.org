import { Button, Form, Icon, Input, DatePicker } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import firebase from '@/firebase'
import moment from 'moment'

export interface Props extends FormComponentProps {
  email: string
}

function SignUpForm(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (err) return

      setIsLoading(true)

      // createAndVerifyAccount({
      //   email: props.email,
      //   url:
      //     process.env.NODE_ENV == 'production'
      //       ? 'https://on-the-loose.firebaseapp.com/login'
      //       : 'http://localhost:3000/login'
      // }).then(res => {
      //   setIsLoading(false)
      //   setIsEmailSent(true)
      // })

      window.localStorage.setItem('emailForSignIn', values.email)
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <div>
      <p style={{ fontSize: 16, marginBottom: '2rem' }}>
        Welcome to OTL! Let's set up your profile.
      </p>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            initialValue: props.email,
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

        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter your date of birth' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Name"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('bday', {
            rules: [{ required: true, message: 'Please enter your date of birth' }]
          })(
            <Input
              onFocus={e => (e.currentTarget.type = 'date')}
              max={
                moment()
                  .toISOString()
                  .split('T')[0]
              }
              size="large"
              prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Date of birth"
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
            Sign up
          </Button>
        )}
      </Form>
    </div>
  )
}

export default Form.create()(SignUpForm)
