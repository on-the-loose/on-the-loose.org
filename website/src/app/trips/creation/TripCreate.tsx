import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import TripForm from './form/TripForm'
import _ from 'lodash'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import CardView from 'src/app/_common/CardView'
import { addDoc, collection, doc } from 'firebase/firestore'
import { db } from 'src/firebase'

export default withRouter((props: RouteComponentProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()

  const handleFinish = (values) => {
    values.planning_info = _.omitBy(values.planning_info, _.isUndefined)
    const data = _.omitBy(values, _.isUndefined)

    data.dates = { start: data.dates[0].toDate(), end: data.dates[1].toDate() }
    data.leader = { name: profile.name, email: profile.email }

    setIsLoading(true)

    addDoc(collection(db, 'trips'), data)
      .then((res) => {
        setIsLoading(false)
        props.history.replace(`/trips/${res.id}`)
      })
      .catch(() => console.log('failed'))
  }

  return (
    <CardView>
      <TripForm
        firstPageContent={
          <div>
            <h2 style={{ textAlign: 'center' }}>Welcome to the trip creation process!</h2>
            <span style={{ fontSize: '1.1rem' }}>
              <br />
              <p>
                To create a trip you will fill out the planning form and then create a post to
                advertise your trip.
              </p>
              <p>
                The planning form won't be shown to trip participants and it's purpose is to help
                you plan the trip.
              </p>
              <p>
                The OTL leadership and the OEC will receive an email notification with the
                information in your planning form and trip posting. You will be contacted if we see
                any problems with the information provided.
              </p>
            </span>
          </div>
        }
        onFinish={handleFinish}
        onCancel={() => props.history.push(`/trips`)}
        submitText="Submit Trip"
        loading={isLoading}
      />
    </CardView>
  )
})
