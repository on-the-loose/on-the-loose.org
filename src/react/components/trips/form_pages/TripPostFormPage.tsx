import React from 'react'
import { Row, Col, Form, Input, DatePicker, InputNumber } from 'antd'
import imageValidator from 'src/utils/imageValidator'
import moment from 'moment'
import { FormProps } from 'antd/lib/form'

export interface Props {
  initialData?: any
  parentForm: FormProps['form']
  isDisplayed: boolean
}

export default function TripPostFormPage(props: Props) {
  const { getFieldDecorator } = props.parentForm

  const dates = props.initialData && [
    moment(props.initialData.dates.start.toDate()),
    moment(props.initialData.dates.end.toDate())
  ]

  return (
    <div style={{ display: !props.isDisplayed && 'none' }}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Enter a trip title' }],
              initialValue: props.initialData && props.initialData.title
            })(<Input placeholder="Give your trip a fun title" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Destination">
            {getFieldDecorator('destination', {
              initialValue: props.initialData && props.initialData.destination,
              rules: [{ required: true, message: 'Enter a destination' }]
            })(<Input placeholder="Where would you like to go?" />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Image">
            {getFieldDecorator('image', {
              initialValue: props.initialData && props.initialData.image,
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
              initialValue: props.initialData && props.initialData.max_participants,
              rules: [{ required: true, message: 'Enter a number' }]
            })(<InputNumber style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={
              <span>
                Description (supports{' '}
                <a href="https://commonmark.org/help/" target="blank">
                  markdown
                </a>
                )
              </span>
            }
          >
            {getFieldDecorator('description', {
              initialValue: props.initialData && props.initialData.description,
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
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={
              <span>
                Packing List (supports{' '}
                <a href="https://commonmark.org/help/" target="blank">
                  markdown
                </a>
                )
              </span>
            }
          >
            {getFieldDecorator('packing_list', {
              initialValue: props.initialData && props.initialData.packing_list,
              rules: [
                {
                  required: false
                }
              ]
            })(
              <Input.TextArea
                rows={4}
                placeholder={
                  'Optional: A list of gear your participants should bring. For example:\n- Sleeping bag\n- Head lamp\n- Rain jacket'
                }
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </div>
  )
}
