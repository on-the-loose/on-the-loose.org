import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TripForm from '../../components/trips/TripForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import _ from 'lodash'
import firebase from '@/firebase'
import useCurrentProfile from '../../hooks/useCurrentProfile'
import CardView from '@/react/components/CardView'

export interface Props extends RouteComponentProps {}

function TripCreate(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()

  const handleSubmit = (e: Event, form: WrappedFormUtils) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      values.planning = _.omitBy(values.planning, _.isUndefined)
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
      <TripForm
        onSubmit={handleSubmit}
        onCancel={() => props.history.push(`/trips`)}
        submitText="Submit Trip"
        loading={isLoading}
      />
    </CardView>
  )
}

export default withRouter(TripCreate)
