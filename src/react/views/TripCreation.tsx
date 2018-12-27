import React, { useState } from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Icon } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'
import firebase from '@/firebase'
import moment from 'moment'
import imageValidator from '@/utils/imageValidator'
import styled from 'styled-components'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export interface Props extends RouteComponentProps, FormComponentProps {}

function TripCreation(props: Props) {
  const [isLoading, setIsLoading] = useState(false)

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
        .then(res => {
          setIsLoading(false)
          props.history.replace(`/trips/${res.id}`)
        })
        .catch(() => console.log('failed'))

      // TODO: add error indicator
    })
  }

  const { getFieldDecorator } = props.form

  return (
    <s.Container>
      <s.Content>
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
                  rules: [
                    { required: true, message: 'An image is required.' },
                    {
                      validator: (rule, value, cb) => {
                        imageValidator({ url: value })
                          .then(() => cb()) // TODO: preview image
                          .catch(() => cb(true))
                      },
                      message: 'Please enter a valid image url.'
                    }
                  ]
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
              onClick={() => props.history.push(`/trips`)}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create
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

  ImageWrap: styled.div`
    width: 100%;
    height: 10rem;
    overflow: hidden;
    vertical-align: middle;
  `,

  Image: styled.img`
    width: 100%;

    transform: translateY(-25%);
  `,

  LoadingIcon: styled(Icon)`
    font-size: 50px;
    margin: auto;
    display: block;
  `,

  Content: styled.div`
    padding: 1rem 2rem;
    @media (min-width: 700px) {
      margin-top: 20%;
    }
  `
}

export default withRouter(Form.create()(TripCreation))
