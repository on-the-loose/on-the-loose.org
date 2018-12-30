import { Icon, Button } from 'antd'

import React, { useState, useEffect } from 'react'
import TripCard from '../components/trips/TripCard'
import firebase from '@/firebase'
import { Link } from 'react-router-dom'

// TODO pre-fetch trips
// TODO fix top button spacing on mobile
// TODO improve loading indicators

const db = firebase.firestore()

export interface Props {
  user: firebase.User
}

export default function Trips(props: Props) {
  const [trips, setTrips] = useState<firebase.firestore.QueryDocumentSnapshot[]>(null)
  const user = firebase.auth().currentUser

  useEffect(() => {
    if (user)
      db.collection('trips')
        .get()
        .then(qs => setTrips(qs.docs))

    const unsubscribe = db.collection('trips').onSnapshot(qs => setTrips(qs.docs))

    return () => unsubscribe()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      {user ? (
        <div>
          <div>
            <Link to="/create">
              <Button icon="plus" style={{ marginBottom: '2rem' }}>
                Create trip
              </Button>
            </Link>
          </div>
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
