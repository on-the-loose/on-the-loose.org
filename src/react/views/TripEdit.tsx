import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TripForm from '../components/trips/TripForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import _ from 'lodash'
import firebase from '@/firebase'
import useCurrentProfile from '../hooks/useCurrentProfile'
import { useDocument } from 'react-firebase-hooks/firestore'

export interface Props extends RouteComponentProps {
  id: string
}

function TripEdit(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()
  const { error, loading, value } = useDocument(firebase.firestore().doc(`trips/${props.id}`))
  if (value && !value.exists) props.history.replace('/trips')

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
        .doc(`trips/${props.id}`)
        .set(data)
        .then(() => {
          setIsLoading(false)
          props.history.replace(`/trips/${props.id}`)
        })
        .catch(() => console.log('failed'))

      // TODO: add error indicator
    })
  }

  return (
    <TripForm
      onSubmit={handleSubmit}
      onCancel={() => props.history.push(`/trips/${props.id}`)}
      submitText="Save"
      loading={isLoading || loading}
      initialTripData={value && value.data()}
    />
  )
}

export default withRouter(TripEdit)
