import { Form, Icon, Input, Select } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import { Profile } from '@/react/hooks/useCurrentProfile'
import React from 'react'
import moment from 'moment'
import { WrappedFormUtils } from 'antd/lib/form/Form'

export const EMAIL_REGEX = /.+(@pomona\.edu|@mymail.pomona\.edu|@cmc\.edu|@hmc\.edu|@g\.hmc\.edu|@scrippscollege\.edu|@pitzer\.edu|@students\.pitzer\.edu|@cgu\.edu|@kgi\.edu)/

export interface Props extends FormComponentProps {
  onSubmit: (e: React.FormEvent<any>, form: WrappedFormUtils) => void
  isDisabled: boolean
  submitButton: React.ReactElement<any>
  initialValues?: Profile
}

function ProfileForm(props: Props) {
  const { getFieldDecorator } = props.form

  const iv = props.initialValues

  return (
    <Form onSubmit={e => props.onSubmit(e, props.form)} className="login-form">
      <Form.Item>
        {getFieldDecorator('email', {
          initialValue: iv ? iv.email : undefined,
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
            disabled={props.isDisabled || (iv && iv.email != null)}
            size="large"
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="School Email"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: iv ? iv.name : undefined,
          rules: [{ required: true, message: 'Please enter your date of birth' }]
        })(
          <Input
            disabled={props.isDisabled}
            size="large"
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Name"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('bday', {
          initialValue: iv
            ? iv.bday &&
              iv.bday
                .toDate()
                .toISOString()
                .split('T')[0]
            : undefined,
          rules: [{ required: true, message: 'Please enter your date of birth' }]
        })(
          <Input
            disabled={props.isDisabled}
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
          initialValue: iv ? iv.tel : undefined,
          rules: [{ required: true, message: 'Please enter your phone number' }]
        })(
          <Input
            disabled={props.isDisabled}
            type="tel"
            size="large"
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Phone number"
          />
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('school', {
          initialValue: iv ? iv.school : undefined,
          rules: [{ required: true, message: 'Please enter your school' }]
        })(
          <Select size="large" placeholder="School" disabled={props.isDisabled}>
            <Select.Option value="pom">Pomona</Select.Option>
            <Select.Option value="hmc">Harvey Mudd</Select.Option>
            <Select.Option value="cmc">Claremont Mckenna</Select.Option>
            <Select.Option value="scr">Scripps</Select.Option>
            <Select.Option value="pit">Pitzer</Select.Option>
            <Select.Option value="cgu">CGU</Select.Option>
            <Select.Option value="kgi">KGI</Select.Option>
          </Select>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator('gradYear', {
          initialValue: iv ? iv.gradYear : undefined,
          rules: [{ required: true, message: 'Please enter your graduation year' }]
        })(
          <Select size="large" placeholder="Graduation year" disabled={props.isDisabled}>
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

      <Form.Item>
        {getFieldDecorator('dietary_restrictions', {
          initialValue: iv ? iv.dietary_restrictions : undefined,
          rules: [{ required: false }]
        })(<Input disabled={props.isDisabled} size="large" placeholder="Dietary Restrictions" />)}
      </Form.Item>

      {props.submitButton}
    </Form>
  )
}

export default Form.create()(ProfileForm)
