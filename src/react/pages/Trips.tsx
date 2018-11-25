import { Button, Icon } from 'antd'

import NewTripForm from '../components/trips/NewTripForm'
import React from 'react'
import TripCard from '../components/trips/TripCard'
import firebase from '@/firebase'
import styled from 'styled-components'

// TODO chache trip results

const Container = styled.div`
  text-align: center;
`
const db = firebase.firestore()

export interface Props {
  user: firebase.User
}

export interface State {
  trips: firebase.firestore.QueryDocumentSnapshot[]
}

export default class Trips extends React.Component<Props, State> {
  state = { trips: null }

  public componentDidMount() {
    if (this.props.user)
      db.collection('trips')
        .get()
        .then(qs => this.setState({ trips: qs.docs }))
  }

  public render() {
    return (
      <Container>
        {this.props.user ? (
          <div>
            <NewTripForm />
            <TripList trips={this.state.trips} />
          </div>
        ) : (
          <h2 style={{ marginTop: '4rem' }}>Login to discover trips and sign up for them!</h2>
        )}
      </Container>
    )
  }
}

const TripList = ({ trips }) =>
  trips ? (
    trips.map(doc => (
      <div key={doc.id} style={{ marginBottom: '1rem' }}>
        <TripCard trip={doc} />
      </div>
    ))
  ) : (
    <Icon type="loading" style={{ fontSize: '50px' }} />
  )
