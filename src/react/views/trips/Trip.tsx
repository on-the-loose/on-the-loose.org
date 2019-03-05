import React, { useState, useEffect } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '@/firebase'
import { Icon, Button, Modal, Input, Popover, Spin } from 'antd'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import useCurrentProfile from '../../hooks/useCurrentProfile'
import { Link } from 'react-router-dom'
import css from '@emotion/css'
import SignUpButton from '@/react/components/trips/SignUpButton'

export interface Props extends RouteComponentProps {
  id: string
}

function Trip(props: Props) {
  const [tripDoc, setTripDoc] = useState(null)

  useEffect(() => {
    return firebase
      .firestore()
      .doc(`trips/${props.id}`)
      .onSnapshot(doc => setTripDoc(doc))
  }, [])

  if (tripDoc && !tripDoc.exists) props.history.replace('/trips')

  return (
    <div css={styles.container}>
      {!tripDoc ? (
        <Spin css={styles.spinner} size="large" delay={500} />
      ) : (
        tripDoc.exists && <TripInfo id={props.id} trip_data={tripDoc.data()} />
      )}
      <Button
        shape="circle"
        icon="close"
        ghost
        style={{ position: 'absolute', right: ' 0.5rem', top: ' 0.5rem' }}
        onClick={() => props.history.replace('/trips')}
      />
    </div>
  )
}

function TripInfo({ id, trip_data }) {
  const db = firebase.firestore()

  const start = moment(trip_data.dates.start.toDate())
  const end = moment(trip_data.dates.end.toDate())
  const duration = end.diff(start, 'days')

  const [showEmailModal, setShowEmailModal] = useState(false)

  const profile = useCurrentProfile()

  const isLeader = trip_data.leader.email == profile.email

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

  return (
    <div>
      <div css={styles.imageWrap}>
        <img css={styles.tripImage} src={trip_data.image} alt="trip image" />
      </div>
      <div css={styles.content}>
        <h2>
          {trip_data.title}{' '}
          {isLeader && (
            <Link to={`${id}/edit`}>
              <Button style={{ float: 'right' }}>Edit Trip</Button>
            </Link>
          )}
        </h2>

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

        <ReactMarkdown source={trip_data.description} />
        <h3>Participants</h3>
        <ol>
          <li>
            <b>Leader: </b> {trip_data.leader.name}
          </li>
          {trip_data.signUps &&
            trip_data.signUps.map(user => {
              const isConfirmed =
                trip_data.confirmedParticipants &&
                trip_data.confirmedParticipants.includes(user.email)
              return (
                <li key={user.email}>
                  {user.name} {isConfirmed && <i> - Confirmed</i>}
                  {isLeader && (
                    <a onClick={() => setIsConfirmed(user.email, !isConfirmed)}>
                      {' '}
                      {!isConfirmed ? (
                        'Confirm'
                      ) : (
                        <Icon
                          type="close"
                          style={{ verticalAlign: 'middle', lineHeight: '1rem' }}
                        />
                      )}
                    </a>
                  )}
                </li>
              )
            })}
        </ol>

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
              value={trip_data.confirmedParticipants && trip_data.confirmedParticipants.join('\n')}
            />
          </p>

          <h3>Unconfirmed</h3>
          <p>
            <Input.TextArea
              rows={4}
              value={
                trip_data.signUps &&
                trip_data.signUps
                  .map(x => x.email)
                  .filter(
                    x =>
                      !(
                        trip_data.confirmedParticipants &&
                        trip_data.confirmedParticipants.includes(x)
                      )
                  )
                  .join('\n')
              }
            />
          </p>

          <h3>All</h3>
          <p>
            <Input.TextArea
              rows={4}
              value={trip_data.signUps && trip_data.signUps.map(x => x.email).join('\n')}
            />
          </p>
        </Modal>

        {!isLeader && (
          <SignUpButton
            isSignedUp={
              trip_data.signUps && trip_data.signUps.map(e => e.email).includes(profile.email)
            }
            profile={profile}
            tripId={id}
          />
        )}
      </div>
    </div>
  )
}

const styles = {
  container: css`
    position: absolute;

    top: 7rem;
    bottom: 2rem;
    left: 10rem;
    right: 10rem;

    @media (max-width: 950px) {
      top: 6rem;
      bottom: 2rem;
      left: 5rem;
      right: 5rem;
    }

    @media (max-width: 750px) {
      top: 6rem;
      bottom: 2rem;
      left: 1rem;
      right: 1rem;
    }

    margin: auto;

    background-color: white;
    border-radius: 0.5rem;

    max-width: 50rem;
    max-height: 100%;
    overflow: scroll;
  `,

  imageWrap: css`
    width: 100%;
    height: 10rem;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
  `,

  tripImage: css`
    width: 100%;

    transform: translateY(-25%);
  `,

  spinner: css`
    margin: auto;
    display: block;
    margin-top: 40%;
  `,

  content: css`
    padding: 1rem 2rem;
  `
}

export default withRouter(Trip)
