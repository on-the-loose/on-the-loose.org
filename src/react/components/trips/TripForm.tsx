import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, InputNumber, Steps, Select } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'

import moment from 'moment'
import imageValidator from '@/utils/imageValidator'
import css from '@emotion/css'

export interface Props extends FormComponentProps {
  onSubmit: (Event, WrappedFormUtils) => void
  submitText: string
  onCancel: () => void
  loading: boolean
  initialTripData?: any
}

function TripForm(props: Props) {
  const { getFieldDecorator } = props.form

  const [currentStep, setCurrentStep] = useState(0)

  const dates = props.initialTripData && [
    moment(props.initialTripData.dates.start.toDate()),
    moment(props.initialTripData.dates.end.toDate())
  ]

  return (
    <Form layout="vertical" onSubmit={e => props.onSubmit(e, props.form)}>
      <Steps
        current={currentStep}
        size="small"
        css={css`
          position: sticky;
          top: 0rem;
          z-index: 1;
          background: white;
          height: 4rem;
          padding-top: 1.5rem;
          margin-bottom: 1rem;
        `}
      >
        <Steps.Step key="started" title="Getting Started" />
        <Steps.Step key="planning" title="Planning Info" />
        <Steps.Step key="public" title="Public Post" />
        <Steps.Step key="done" title="Done!" />
      </Steps>
      <div style={{ display: currentStep != 0 && 'none', marginTop: '20%' }}>
        <h2 style={{ textAlign: 'center' }}>Welcome to the trip creation process!</h2>
        <span style={{ fontSize: '1.1rem' }}>
          <br />
          <p>
            To create a trip you will fill out the planning form and then create a post to advertise
            your trip.
          </p>
          <p>
            Your trip will then be reviewed by the OEC and OTL leadership withing 2 business days of
            the posting, and they will either approve it or reach out to you with comments or
            concerns.
          </p>
          <p>
            Once your trip is approved, it will be displayed publicly on the website and other
            students will be able to sign up.
          </p>
        </span>
      </div>
      <div style={{ display: currentStep != 1 && 'none' }}>
        <Form.Item label="What is the location and/or trailhead name of your destination?">
          {getFieldDecorator('planning.location', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Do you need a special permit to visit this location? How will you obtain it?">
          {getFieldDecorator('planning.permit', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="What activities will you be doing? (Hiking, kayaking, surfing, climbing, etc.)">
          {getFieldDecorator('planning.activities', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="What are the potential risks associated with this activity?">
          {getFieldDecorator('planning.risks', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="How do you plan to manage or eliminate these risks?">
          {getFieldDecorator('planning.risk_management', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Will this be a backcountry trip? (2 hours or more away from definitive medical care)">
          {getFieldDecorator('planning.backcountry', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(
            <Select>
              <Select.Option value="Yes">Yes</Select.Option>
              <Select.Option value="No">No</Select.Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="If Yes, who is (are) the leader or participant with Wilderness First Aid training?">
          {getFieldDecorator('planning.wfa_wfr', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="If No, who is (are) the leader or participant with CPR/FirstAid from American Red Cross, American Heart Association, or equivalent?">
          {getFieldDecorator('planning.first_aid', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Have any of the leaders been in this location before?">
          {getFieldDecorator('planning.been_before', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Do you have a planned evacuation route for emergencies?">
          {getFieldDecorator('planning.evacuation', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Approximately how much is your trip going to request reimbursement through OTL? (Reimbursements include gas ($0.15/mile to 300 miles), campsites, permits, park entrance fees) ">
          {getFieldDecorator('planning.reimbursement', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="How much is your trip going to cost per participant? ">
          {getFieldDecorator('planning.cost_per_person', {
            rules: [{ required: true, message: 'This field is required.' }]
          })(<Input />)}
        </Form.Item>

        <p>If hiking, please complete the following questions:</p>
        <Form.Item label="Are you bringing a SPOT device GPS locator?">
          {getFieldDecorator('planning.spot_gps', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="How many total miles are you planning to complete during your hike?">
          {getFieldDecorator('planning.miles', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Do you have a reliable water source along the way?">
          {getFieldDecorator('planning.water', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Do you have a turnaround time for your hike? When?">
          {getFieldDecorator('planning.turnaround_time', {
            rules: [{ required: false }]
          })(<Input />)}
        </Form.Item>
      </div>
      <div style={{ display: currentStep != 2 && 'none' }}>
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
      </div>
      <div style={{ display: currentStep != 3 && 'none', marginTop: '20%', textAlign: 'center' }}>
        <h2> Good job! </h2>
        <br />
        <p>Check that all the information is correct before submitting.</p>
      </div>

      <div
        css={styles.buttons}
        style={{ textAlign: currentStep == 3 || currentStep == 0 ? 'center' : 'right' }}
      >
        <Button
          css={css`
            margin-right: 1rem;
          `}
          onClick={currentStep > 0 ? () => setCurrentStep(currentStep - 1) : props.onCancel}
        >
          {currentStep > 0 ? 'Back' : 'Cancel'}
        </Button>
        {currentStep < 3 ? (
          <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
            {currentStep == 0 ? 'Get started' : 'Next'}
          </Button>
        ) : (
          <Button htmlType="submit" type="primary" loading={props.loading}>
            {props.submitText}
          </Button>
        )}
      </div>
    </Form>
  )
}

const styles = {
  buttons: css`
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    background: #fff;
    border-radius: 0 0 4px 4px;
    margin-top: 2rem;
  `
}

export default Form.create()(TripForm)
