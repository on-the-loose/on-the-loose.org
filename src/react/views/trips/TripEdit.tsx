import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TripForm from '../../components/trips/TripForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import _ from 'lodash'
import firebase from '@/firebase'
import useCurrentProfile from '../../hooks/useCurrentProfile'
import { useDocument } from 'react-firebase-hooks/firestore'
import CardView from '@/react/components/CardView'

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

      values.planning_info = _.omitBy(values.planning_info, _.isUndefined)
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
    <CardView>
      <TripForm
        firstPageContent={
          <div>
            <h2 style={{ textAlign: 'center' }}>Editing your trip.</h2>
            <span style={{ fontSize: '1.1rem' }}>
              <br />
              <p>
                Here you'll be able to edit your trip. Once you save your changes, if the trip
                hasn't been approved yet a notification email will be sent to the OTL and OEC so
                that they can review the changes. Otherwise an email will be sent to trip
                participants notifying them of the changes.
              </p>
            </span>
          </div>
        }
        onSubmit={handleSubmit}
        onCancel={() => props.history.push(`/trips/${props.id}`)}
        submitText="Save"
        loading={isLoading || loading}
        initialData={value && value.data()}
      />
    </CardView>
  )
}

export default withRouter(TripEdit)
