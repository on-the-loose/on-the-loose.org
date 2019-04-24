import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

import TripForm from 'src/app/trips/input/form/TripForm'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import _ from 'lodash'
import firebase from 'src/firebase'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import { useDocument } from 'react-firebase-hooks/firestore'
import CardView from 'src/app/_common/CardView'
import { Button, Popover } from 'antd'
import css from '@emotion/css'

export interface Props extends RouteComponentProps {
  id: string
}

function TripEdit(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()

  const { error, loading, value } = useDocument(firebase.firestore().doc(`trips/${props.id}`))
  const tripData = value && value.data()

  if (value && !value.exists) props.history.replace('/trips')
  if (tripData && tripData.leader.email != profile.email) {
    props.history.replace(`/trips/${props.id}`)
  }

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
        .update(data)
        .then(() => {
          setIsLoading(false)
          props.history.replace(`/trips/${props.id}`)
        })
        .catch(() => console.log('failed'))

      // TODO: add error indicator
    })
  }

  const handleDelete = () => {
    firebase
      .firestore()
      .doc(`trips/${props.id}`)
      .delete()
      .then(() => {
        props.history.replace(`/trips`)
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
                Here you'll be able to edit your trip. Once you save your changes, a notification
                email will be sent to the OTL, the OEC and the signed up trip participants so that
                they are aware of the changes.
              </p>
              <div
                css={css`
                  text-align: center;
                `}
              >
                <Popover
                  trigger="click"
                  content={
                    <Button type={'danger'} onClick={handleDelete}>
                      Confirm
                    </Button>
                  }
                >
                  <Button type="danger">Delete Trip</Button>
                </Popover>
              </div>
            </span>
          </div>
        }
        onSubmit={handleSubmit}
        onCancel={() => props.history.push(`/trips/${props.id}`)}
        submitText="Save"
        loading={isLoading || loading}
        initialData={tripData}
      />
    </CardView>
  )
}

export default withRouter(TripEdit)
