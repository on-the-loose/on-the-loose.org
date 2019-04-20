import React, { useState } from 'react'
import firebase from '@/firebase'
import { Button, Modal, Input, Spin } from 'antd'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import useCurrentProfile from '../../hooks/useCurrentProfile'
import { Link } from 'react-router-dom'
import css from '@emotion/css'
import SignUpButton from '@/react/components/trips/SignUpButton'
import CardView from '@/react/components/CardView'
import useTrip from '@/react/hooks/useTrip'
import ParticipantList from '@/react/components/trips/ParticipantList'

export interface Props extends RouteComponentProps {
  id: string
}

function Trip(props: Props) {
  const tripDoc = useTrip(props.id)

  if (tripDoc && !tripDoc.exists) props.history.replace('/trips')

  const tripData = tripDoc && tripDoc.exists && tripDoc.data()

  return (
    <CardView headerImage={tripData && tripData.image}>
      {!tripData ? (
        <Spin css={styles.spinner} size="large" delay={500} />
      ) : (
        <TripInfo id={props.id} tripData={tripData} />
      )}
      <Button
        shape="circle"
        icon="close"
        ghost
        style={{ position: 'absolute', right: ' 0.5rem', top: ' 0.5rem' }}
        onClick={() => props.history.replace('/trips')}
      />
    </CardView>
  )
}

function TripInfo({ id, tripData }) {
  const db = firebase.firestore()

  const start = moment(tripData.dates.start.toDate())
  const end = moment(tripData.dates.end.toDate())
  const duration = end.diff(start, 'days')

  const [showEmailModal, setShowEmailModal] = useState(false)

  const profile = useCurrentProfile()

  const isLeader = tripData.leader.email == profile.email

  const setIsConfirmed = (email, isConfirmed) => {
    const operation = !isConfirmed
      ? firebase.firestore.FieldValue.arrayRemove
      : firebase.firestore.FieldValue.arrayUnion

    db.doc(`trips/${id}`)
      .update({
        confirmedParticipants: operation(email)
      })
      .catch(() => console.log('failed'))
  }

  const pastTrip = tripData.dates.start.toDate() < Date.now()

  return (
    <div
      css={css`
        padding: 1rem 0rem;
      `}
    >
      <h2>
        {tripData.title}
        {isLeader && (
          <Link to={`${id}/edit`}>
            <Button style={{ float: 'right' }} disabled={pastTrip}>
              Edit Trip
            </Button>
          </Link>
        )}
      </h2>
      <h3>{tripData.destination}</h3>
      <p>
        {duration == 0 ? (
          'Day trip: '
        ) : (
          <i>
            <b>{duration} Nights: </b>
          </i>
        )}
        <i>
          {start.format('ddd, MMM Do, h:mma')} - {end.format('ddd, MMM Do, h:mma')}{' '}
        </i>
      </p>
      <p>
        <b>Leader: </b> {tripData.leader.name} - {tripData.leader.email}
      </p>
      <ReactMarkdown source={tripData.description} />
      {tripData.packing_list && (
        <div>
          <h4>Packing list:</h4>
          <ReactMarkdown source={tripData.packing_list} />
        </div>
      )}

      <ParticipantList
        isLeader={isLeader}
        tripData={tripData}
        onToggleConfirm={(user, isConfirmed) => setIsConfirmed(user.email, !isConfirmed)}
      />

      {isLeader && <Button onClick={() => setShowEmailModal(true)}> Email Participants </Button>}
      <Modal
        title="Emails"
        visible={showEmailModal}
        onCancel={() => setShowEmailModal(false)}
        footer={null}
        closable
        centered
      >
        <h3>Confirmed</h3>
        <p>
          <Input.TextArea
            rows={4}
            value={tripData.confirmedParticipants && tripData.confirmedParticipants.join('\n')}
          />
        </p>

        <h3>Unconfirmed</h3>
        <p>
          <Input.TextArea
            rows={4}
            value={
              tripData.signUps &&
              tripData.signUps
                .map(x => x.email)
                .filter(
                  x =>
                    !(tripData.confirmedParticipants && tripData.confirmedParticipants.includes(x))
                )
                .join('\n')
            }
          />
        </p>

        <h3>All</h3>
        <p>
          <Input.TextArea
            rows={4}
            value={tripData.signUps && tripData.signUps.map(x => x.email).join('\n')}
          />
        </p>
      </Modal>
      {!isLeader && (
        <SignUpButton
          isSignedUp={
            tripData.signUps && tripData.signUps.map(e => e.email).includes(profile.email)
          }
          profile={profile}
          tripId={id}
          disabled={pastTrip}
        />
      )}
    </div>
  )
}

const styles = {
  spinner: css`
    margin: auto;
    display: block;
    margin-top: 40%;
  `
}

export default withRouter(Trip)
