import React, { useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '@/firebase'
import { Icon, Button } from 'antd'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import useCurrentProfile from '../hooks/useCurrentProfile'

export interface Props extends RouteComponentProps {
  id: string
}

function Trip(props: Props) {
  const trip_doc = firebase.firestore().doc(`trips/${props.id}`)
  const { error, loading, value } = useDocument(trip_doc)

  if (value && !value.exists) props.history.replace('/trips')

  return (
    <s.Container>
      {' '}
      {loading ? (
        <s.LoadingIcon type="loading" />
      ) : (
        value.exists && <TripInfo id={props.id} trip_data={value.data()} />
      )}
    </s.Container>
  )
}

function TripInfo({ id, trip_data }) {
  const start = moment(trip_data.dates.start.toDate())
  const end = moment(trip_data.dates.end.toDate())
  const duration = end.diff(start, 'days')

  const [isLoading, setIsLoading] = useState(false)

  const profile = useCurrentProfile()

  const isSignedUp =
    trip_data.signUps && trip_data.signUps.map(e => e.email).includes(profile.email)
  const isLeader = trip_data.leader.email == profile.email

  const toggleSignUp = () => {
    setIsLoading(true)

    const operation = isSignedUp
      ? firebase.firestore.FieldValue.arrayRemove
      : firebase.firestore.FieldValue.arrayUnion

    firebase
      .firestore()
      .doc(`trips/${id}`)
      .update({
        signUps: operation({
          email: profile.email,
          name: profile.name
        })
      })
      .then(res => {
        setIsLoading(false)
      })
      .catch(() => console.log('failed'))
  }

  return (
    <div>
      <s.ImageWrap>
        <s.Image src={trip_data.image} alt="trip image" />
      </s.ImageWrap>
      <s.Content>
        <h2>{trip_data.title}</h2>
        <p>
          <i>{start.calendar()}</i> {duration == 0 ? '' : <i> -- {duration} Nights</i>}
        </p>
        <ReactMarkdown source={trip_data.description} />
        <h3>Participants</h3>
        <ol>
          <li>
            <b>Leader: </b> {trip_data.leader.name}
          </li>
          {trip_data.signUps &&
            trip_data.signUps.map(user => <li key={user.email}>{user.name}</li>)}
        </ol>

        {!isLeader && (
          <Button
            onClick={toggleSignUp}
            loading={isLoading}
            type={isSignedUp ? 'danger' : 'primary'}
          >
            {isSignedUp ? 'Withdraw' : 'Sign up'}
          </Button>
        )}
      </s.Content>
    </div>
  )
}

const s = {
  Container: styled.div`
    position: absolute;

    top: 8rem;
    bottom: 4rem;
    left: 10rem;
    right: 10rem;

    @media (max-width: 750px) {
      top: 8rem;
      bottom: 4rem;
      left: 1rem;
      right: 1rem;
    }

    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: min-content;
    max-width: 50rem;
    margin: auto;
  `,

  ImageWrap: styled.div`
    width: 100%;
    height: 10rem;
    overflow: hidden;
    vertical-align: middle;
  `,

  Image: styled.img`
    width: 100%;

    transform: translateY(-25%);
  `,

  LoadingIcon: styled(Icon)`
    font-size: 50px;
    margin: auto;
    display: block;
    margin-top: 40%;
  `,

  Content: styled.div`
    padding: 1rem 2rem;
  `
}

export default withRouter(Trip)
