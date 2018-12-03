import { Icon } from 'antd'

import NewTripForm from '../components/trips/NewTripForm'
import React, { useState, useEffect } from 'react'
import TripCard from '../components/trips/TripCard'
import firebase from '@/firebase'

// TODO pre-fetch trips

const db = firebase.firestore()

export interface Props {
  user: firebase.User
}

export default function Trips(props: Props) {
  const [trips, setTrips] = useState<firebase.firestore.QueryDocumentSnapshot[]>(null)

  useEffect(() => {
    if (props.user)
      db.collection('trips')
        .get()
        .then(qs => setTrips(qs.docs))
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {props.user ? (
        <div>
          <NewTripForm />
          <TripCardsList trips={trips} />
        </div>
      ) : (
        <h2 style={{ marginTop: '4rem' }}>Login to discover trips and sign up for them!</h2>
      )}
    </div>
  )
}

const TripCardsList = ({ trips }) =>
  trips ? (
    trips.map(doc => (
      <div key={doc.id} style={{ marginBottom: '1rem' }}>
        <TripCard trip={doc} />
      </div>
    ))
  ) : (
    <Icon type="loading" style={{ fontSize: '50px' }} />
  )
