import { Icon, Button, Switch, Divider } from 'antd'

import React, { useState, useEffect } from 'react'
import TripCard from '../components/trips/TripCard'
import firebase from '@/firebase'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useCurrentProfile from '../hooks/useCurrentProfile'

// TODO pre-fetch trips
// TODO fix top button spacing on mobile
// TODO improve loading indicators

const db = firebase.firestore()

export default function Trips(props) {
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
          <s.Buttons>
            <Link to="/create">
              <Button icon="plus">Create trip</Button>
            </Link>
          </s.Buttons>
          <TripCardsList trip_docs={trips} />
        </div>
      ) : (
        <h2 style={{ marginTop: '4rem' }}>Login to discover trips and sign up for them!</h2>
      )}
    </div>
  )
}

const TripCardsList = ({ trip_docs }) => {
  if (trip_docs == null) return <Icon type="loading" style={{ fontSize: '50px' }} />

  const profile = useCurrentProfile()

  const trips = trip_docs.map(doc => [doc.id, doc.data()])
  const isSignedUp = trips.map(
    ([_, t]) => t.signUps && t.signUps.map(e => e.email).includes(profile.email)
  )
  const isLeader = trips.map(([_, t]) => t.leader.email == profile.email)

  const signed_up_trips = trips.filter((_, index) => isSignedUp[index])
  const leader_trips = trips.filter((_, index) => isLeader[index])

  const other_trips = trips.filter((_, index) => !isSignedUp[index] && !isLeader[index])

  return (
    <s.Cards>
      {signed_up_trips.length + leader_trips.length > 0 && (
        <Divider orientation="left">My Trips</Divider>
      )}

      {leader_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripCard trip_data={trip_data} id={id} />
        </div>
      ))}
      {signed_up_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripCard trip_data={trip_data} id={id} />
        </div>
      ))}

      {signed_up_trips.length + leader_trips.length > 0 && (
        <Divider orientation="left" style={{ marginTop: '2.5rem' }} />
      )}

      {other_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripCard trip_data={trip_data} id={id} />
        </div>
      ))}
    </s.Cards>
  )
}

const s = {
  Buttons: styled.div`
    margin-bottom: 2rem;
    & > * {
      padding: 0rem 1rem;
    }
  `,
  Cards: styled.div`
    margin: auto;
    max-width: 50rem;
    width: 90%;
  `
}
