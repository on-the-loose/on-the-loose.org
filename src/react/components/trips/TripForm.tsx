import React, { useState } from 'react'
import { Button, Col, DatePicker, Form, Input, Row, InputNumber, Steps, Select } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'

import css from '@emotion/css'
import TripPostFormPage from './form_pages/TripPostFormPage'
import TripPlanFormPage from './form_pages/TripPlanFormPage'

export interface Props extends FormComponentProps {
  onSubmit: (Event, WrappedFormUtils) => void
  submitText: string
  onCancel: () => void
  loading: boolean
  initialTripData?: any
}

function TripForm(props: Props) {
  const { getFieldDecorator, validateFields } = props.form

  const [currentStep, setCurrentStep] = useState(0)

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

      <WelcomePage isDisplayed={currentStep == 0} />
      <TripPlanFormPage isDisplayed={currentStep == 1} parentForm={props.form} />
      <TripPostFormPage isDisplayed={currentStep == 2} parentForm={props.form} />
      <DonePage isDisplayed={currentStep == 3} />

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
            {/* Validate fields on last Next button */}
            {currentStep == 0 ? 'Get started' : 'Next'}
          </Button>
        ) : (
          <Button type="primary" loading={props.loading} onClick={() => alert('wow')}>
            {/* Disable submit button if validation fails, popup message that there are errors*/}
            {props.submitText}
          </Button>
        )}
      </div>
    </Form>
  )
}

function WelcomePage({ isDisplayed }) {
  return (
    <div
      css={css`
        margin-top: 20%;
        display: ${!isDisplayed && 'none'};
      `}
    >
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
  )
}

function DonePage({ isDisplayed }) {
  return (
    <div
      css={css`
        margin-top: 20%;
        text-align: center;
        display: ${!isDisplayed && 'none'};
      `}
    >
      <h2> Good job! </h2>
      <br />
      <p>Check that all the information is correct before submitting.</p>
    </div>
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
