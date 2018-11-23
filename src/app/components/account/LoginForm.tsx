import { Button, Form, Icon, Input } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import React from 'react'
import firebase from '../../main/firebase'

export interface State {}

class LoginForm extends React.Component<FormComponentProps, State> {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (err) return

      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: 'http://localhost:1234/login',
        // This must be true.
        handleCodeInApp: true
      }

      firebase
        .auth()
        .sendSignInLinkToEmail(values.email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', values.email)
          // TODO add email sent confirmation
        })
        .catch(error => {
          console.error(error)
        })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <p style={{ fontSize: 16, marginBottom: '2rem' }}>
          Use your email from one of the Claremont Colleges to log in to OTL. You'll receive a link
          to access your account.
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
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

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form>
      </div>
    )
  }
}

export default Form.create()(LoginForm)
