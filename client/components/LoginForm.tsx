import * as React from 'react'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

import 'antd/lib/form/style/css'
import 'antd/lib/icon/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/button/style/css'

export interface State {}

class LoginForm extends React.Component<FormComponentProps, State> {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <p style={{ fontSize: 16, marginBottom: '2rem' }}>
          Use your school email from one of the Claremont Colleges to log in to OTL. You'll receive
          a link to access your account.
        </p>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              // TODO: better form validation
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                style={{ minHeight: '1.5rem' }}
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
