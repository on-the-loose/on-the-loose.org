import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TripForm from '../../components/trips/TripForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import _ from 'lodash'
import firebase from '@/firebase'
import useCurrentProfile from '../../hooks/useCurrentProfile'
import CardView from '@/react/components/CardView'
import { Steps } from 'antd'
import css from '@emotion/css'

export interface Props extends RouteComponentProps {}

function TripCreate(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()

  const handleSubmit = (e: Event, form: WrappedFormUtils) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      const data = _.omitBy(values, _.isUndefined)

      data.dates = { start: data.dates[0].toDate(), end: data.dates[1].toDate() }
      data.leader = { name: profile.name, email: profile.email }

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

  return (
    <CardView>
      <Steps
        current={0}
        progressDot
        css={css`
          margin: 3rem auto;
        `}
      >
        <Steps.Step key="planning1" title="Planning Form" />
        <Steps.Step key="planning2" title="" />
        <Steps.Step key="planning3" title="" />
        <Steps.Step key="public" title="Public Info" />
        <Steps.Step key="done" title="Done!" />
      </Steps>
      <TripForm
        onSubmit={handleSubmit}
        onCancel={() => props.history.push(`/trips`)}
        submitText="Create"
        loading={isLoading}
      />
    </CardView>
  )
}

export default withRouter(TripCreate)
