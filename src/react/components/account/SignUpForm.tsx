import { Button, Form, Icon, Input, DatePicker, Select } from 'antd'

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

      console.log(values)

      setIsLoading(true)

      firebase
        .functions()
        .httpsCallable('createAndVerifyAccount')({
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

        <Form.Item>
          {getFieldDecorator('tel', {
            rules: [{ required: true, message: 'Please enter your phone number' }]
          })(
            <Input
              type="tel"
              size="large"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Phone number"
            />
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('school', {
            rules: [{ required: true, message: 'Please enter your school' }]
          })(
            <Select size="large" placeholder="School">
              <Select.Option value="pom">Pomona</Select.Option>
              <Select.Option value="hmc">Harvey Mudd</Select.Option>
              <Select.Option value="cmc">Claremont Mckenna</Select.Option>
              <Select.Option value="scr">Scripps</Select.Option>
              <Select.Option value="pit">Pitzer</Select.Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('gradYear', {
            rules: [{ required: true, message: 'Please enter your graduation year' }]
          })(
            <Select size="large" placeholder="Graduation year">
              {[0, 1, 2, 3, 4].map(i => (
                <Select.Option
                  key={i.toString()}
                  value={moment()
                    .add(i, 'year')
                    .year()}
                >
                  {moment()
                    .add(i, 'year')
                    .year()}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        {isEmailSent ? (
          <p>Welcome! A log in link has been sent to your email</p>
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
