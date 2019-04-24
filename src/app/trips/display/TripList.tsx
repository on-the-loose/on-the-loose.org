import { Icon, Button, Switch, Divider, Spin } from 'antd'

import React, { Dispatch, SetStateAction } from 'react'
import TripPreview from 'src/app/trips/display/TripPreview'
import firebase from 'src/firebase'
import { Link } from 'react-router-dom'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import css from '@emotion/css'

export interface Props {
  trips: firebase.firestore.QueryDocumentSnapshot[]
  pastTrips: firebase.firestore.QueryDocumentSnapshot[]
  hidePastTrips: boolean
  setHidePastTrips: Dispatch<SetStateAction<boolean>>
}

// TODO fix top button spacing on mobile
// TODO add limit to trips fetched

export default (props: Props) => {
  const { trips, pastTrips, hidePastTrips, setHidePastTrips } = props
  const user = firebase.auth().currentUser

  return (
    <div style={{ textAlign: 'center' }}>
      {user ? (
        <div>
          <div css={styles.buttons}>
            <Link to="/create">
              <Button icon="plus">Create trip</Button>
            </Link>
          </div>
          {trips && trips.length == 0 ? (
            <h3> No upcoming trips </h3>
          ) : (
            <TripPreviewsList trip_docs={trips} />
          )}
          <div
            css={css`
              ${styles.buttons};
              margin-top: 3rem;
            `}
          >
            <Button onClick={() => setHidePastTrips(!hidePastTrips)}>
              {hidePastTrips ? 'Show Past Trips' : 'Hide Past Trips'}
            </Button>
          </div>
          {}
          {!hidePastTrips &&
            (pastTrips && pastTrips.length == 0 ? (
              <h3> No past trips </h3>
            ) : (
              <TripPreviewsList trip_docs={pastTrips} />
            ))}
        </div>
      ) : (
        <h2 style={{ marginTop: '4rem' }}>Login to discover trips and sign up for them!</h2>
      )}
    </div>
  )
}

const TripPreviewsList = ({ trip_docs }) => {
  const profile = useCurrentProfile()

  if (trip_docs == null || profile == null) return <Spin size="large" delay={500} />

  const trips = trip_docs.map(doc => [doc.id, doc.data()])
  const isSignedUp = trips.map(
    ([_, t]) => t.signUps && t.signUps.map(e => e.email).includes(profile.email)
  )
  const isLeader = trips.map(([_, t]) => t.leader.email == profile.email)

  const signed_up_trips = trips.filter((_, index) => isSignedUp[index])
  const leader_trips = trips.filter((_, index) => isLeader[index])

  const other_trips = trips.filter((_, index) => !isSignedUp[index] && !isLeader[index])

  return (
    <div css={styles.cards}>
      {signed_up_trips.length + leader_trips.length > 0 && (
        <Divider orientation="left">My Trips</Divider>
      )}

      {leader_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripPreview trip_data={trip_data} id={id} />
        </div>
      ))}
      {signed_up_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripPreview trip_data={trip_data} id={id} />
        </div>
      ))}

      {signed_up_trips.length + leader_trips.length > 0 && (
        <Divider orientation="left" style={{ marginTop: '2.5rem' }} />
      )}

      {other_trips.map(([id, trip_data]) => (
        <div key={id} style={{ marginBottom: '1rem' }}>
          <TripPreview trip_data={trip_data} id={id} />
        </div>
      ))}
    </div>
  )
}

const styles = {
  buttons: css`
    margin-bottom: 2rem;
    & > * {
      padding: 0rem 1rem;
    }
  `,
  cards: css`
    margin: auto;
    max-width: 50rem;
    width: 90%;
  `
}
