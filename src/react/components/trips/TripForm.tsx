import React from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Icon, InputNumber } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'

import moment from 'moment'
import imageValidator from '@/utils/imageValidator'
import styled from 'styled-components'

export interface Props extends FormComponentProps {
  onSubmit: (Event, WrappedFormUtils) => void
  submitText: string
  onCancel: () => void
  loading: boolean
  initialTripData?: any
}

function TripForm(props: Props) {
  const { getFieldDecorator } = props.form

  const dates = props.initialTripData && [
    moment(props.initialTripData.dates.start.toDate()),
    moment(props.initialTripData.dates.end.toDate())
  ]

  return (
    <s.Container>
      <s.Content>
        <Form layout="vertical" onSubmit={e => props.onSubmit(e, props.form)}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Title">
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Enter a trip title' }],
                  initialValue: props.initialTripData && props.initialTripData.title
                })(<Input placeholder="Give your trip a fun title" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Destination">
                {getFieldDecorator('destination', {
                  initialValue: props.initialTripData && props.initialTripData.destination,
                  rules: [{ required: true, message: 'Enter a destination' }]
                })(<Input placeholder="Where would you like to go?" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Image">
                {getFieldDecorator('image', {
                  initialValue: props.initialTripData && props.initialTripData.image,
                  rules: [
                    { required: true, message: 'An image is required.' },
                    {
                      validator: (rule, value, cb) => {
                        imageValidator({ url: value })
                          .then(() => cb()) // TODO: preview image
                          .catch(() => cb(true))
                      },
                      message: 'Enter a valid image url.'
                    }
                  ]
                })(<Input placeholder="A link to an image that shows where you're going" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Dates">
                {getFieldDecorator('dates', {
                  initialValue: dates,
                  rules: [{ required: true, message: 'Choose the trip dates' }]
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
            <Col span={12}>
              <Form.Item label="Maximum participants">
                {getFieldDecorator('max_participants', {
                  initialValue: props.initialTripData && props.initialTripData.max_participants,
                  rules: [{ required: true, message: 'Enter a number' }]
                })(<InputNumber style={{ width: '100%' }} />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Description">
                {getFieldDecorator('description', {
                  initialValue: props.initialTripData && props.initialTripData.description,
                  rules: [
                    {
                      required: true,
                      message: 'Enter a description for your trip'
                    }
                  ]
                })(<Input.TextArea rows={4} placeholder="Details about your trip" />)}
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
              onClick={props.onCancel}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" loading={props.loading}>
              {props.submitText}
            </Button>
          </div>
        </Form>
      </s.Content>
    </s.Container>
  )
}

const s = {
  Container: styled.div`
    position: absolute;

    top: 8rem;
    bottom: 4rem;
    left: 10rem;
    right: 10rem;

    @media (max-width: 750px) {
      top: 8rem;
      bottom: 4rem;
      left: 1rem;
      right: 1rem;
    }

    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: min-content;
    max-width: 50rem;
    margin: auto;
  `,

  Content: styled.div`
    padding: 1rem 2rem;
    margin-top: 10%;
  `
}

export default Form.create()(TripForm)
