import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import React, { useState } from 'react'
import _ from 'lodash'
import { createGlobalStyle } from 'styled-components'
import firebase from '@/firebase'
import moment from 'moment'

export interface State {
  visible: boolean
}

function NewTripForm(props: FormComponentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (err) return

      const data = _.omitBy(values, _.isUndefined)

      data.dates = { start: data.dates[0].toDate(), end: data.dates[1].toDate() }

      setIsLoading(true)

      firebase
        .firestore()
        .collection('trips')
        .add(data)
        .then(() => {
          console.log('success')
          setIsLoading(false)
          setIsVisible(false)
        })
        .catch(() => console.log('fail'))

      // TODO: add error indicator
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <div>
      <Button onClick={() => setIsVisible(true)} icon="plus" style={{ marginBottom: '2rem' }}>
        Create trip
      </Button>
      <Drawer
        title="Create Trip"
        height="100%"
        placement="bottom"
        onClose={() => setIsVisible(false)}
        visible={isVisible}
        style={{
          overflow: 'auto',
          padding: '4rem 6rem'
        }}
      >
        <Form layout="vertical" onSubmit={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please enter a trip title' }]
                })(<Input placeholder="Give your trip a fun title" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Destination">
                {getFieldDecorator('destination', {
                  rules: [{ required: true, message: 'Please enter a destination' }]
                })(<Input placeholder="Where would you like to go?" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Image">
                {getFieldDecorator('image', {
                  rules: [{ required: true, message: 'Please enter a image url' }]
                })(<Input placeholder="A link to an image that shows where you're going" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Dates">
                {getFieldDecorator('dates', {
                  rules: [{ required: true, message: 'Please choose the trip dates' }]
                })(
                  <DatePicker.RangePicker
                    style={{ width: '100%' }}
                    showTime={{
                      format: 'h:mm a',
                      minuteStep: 15,
                      use12Hours: true,
                      defaultValue: [moment('10:00', 'HH:mm'), moment('16:00', 'HH:mm')]
                    }}
                    format="ddd MM/DD h:mm a"
                    disabledDate={current => current && current < moment().endOf('day')}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  rules: [
                    {
                      required: true,
                      message: 'Please enter a description for your trip'
                    }
                  ]
                })(<Input.TextArea rows={4} placeholder="Details about your trip" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Gear">
                {getFieldDecorator('gear', {})(
                  <Input.TextArea
                    rows={4}
                    placeholder="What gear will participants need to bring?"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px'
            }}
          >
            <Button
              style={{
                marginRight: 8
              }}
              onClick={() => setIsVisible(false)}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create
            </Button>
          </div>
        </Form>
      </Drawer>
    </div>
  )
}

export default Form.create()(NewTripForm)
