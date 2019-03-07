import React, { useState } from 'react'
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  InputNumber,
  Steps,
  Select,
  Popover,
  Icon
} from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'

import css from '@emotion/css'
import TripPostFormPage from './form_pages/TripPostFormPage'
import TripPlanFormPage from './form_pages/TripPlanFormPage'
import { bool } from 'prop-types'

export interface Props extends FormComponentProps {
  onSubmit: (Event, WrappedFormUtils) => void
  submitText: string
  onCancel: () => void
  loading: boolean
  initialData?: any
  firstPageContent: JSX.Element
}

function TripForm(props: Props) {
  const { validateFields } = props.form

  const [currentStep, setCurrentStep] = useState(0)
  const [page1HasError, setPage1HasError] = useState(false)
  const [page2HasError, setPage2HasError] = useState(false)

  const handleNextClick = () => {
    if (currentStep == 1) {
      validateFields(['planning'], errors => {
        setPage1HasError(errors != null)
      })
    }

    if (currentStep == 2) {
      validateFields(errors => {
        setPage2HasError(errors != null)
      })
    }

    setCurrentStep(currentStep + 1)
  }

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

          @media (max-width: 500px) {
            position: relative;
            margin-bottom: 10rem;
          }
        `}
      >
        <Steps.Step key="started" title="Getting Started" />
        <Steps.Step key="planning" title="Planning Info" status={page1HasError ? 'error' : null} />
        <Steps.Step key="public" title="Public Post" status={page2HasError ? 'error' : null} />
        <Steps.Step key="done" title="Done!" />
      </Steps>

      <WelcomePage isDisplayed={currentStep == 0} content={props.firstPageContent} />
      <TripPlanFormPage
        isDisplayed={currentStep == 1}
        parentForm={props.form}
        initialData={props.initialData}
      />
      <TripPostFormPage
        isDisplayed={currentStep == 2}
        parentForm={props.form}
        initialData={props.initialData}
      />
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
          <Button type="primary" onClick={handleNextClick}>
            {currentStep == 0 ? 'Get started' : 'Next'}
          </Button>
        ) : (
          <Popover
            content={
              <div>
                <Icon type="close-circle" /> There are some errors or fields missing in your form.
              </div>
            }
            placement="bottom"
            visible={page1HasError || page2HasError}
          >
            <Button
              disabled={page1HasError || page2HasError}
              type="primary"
              loading={props.loading}
              htmlType="submit"
            >
              {props.submitText}
            </Button>
          </Popover>
        )}
      </div>
    </Form>
  )
}

function WelcomePage({ isDisplayed, content }) {
  return (
    <div
      css={css`
        margin-top: 20%;
        display: ${!isDisplayed && 'none'};
      `}
    >
      {content}
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
