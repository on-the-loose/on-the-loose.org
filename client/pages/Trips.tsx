import * as React from 'react'
import firebase from '../firebase'
import { Icon } from 'antd'
import TripCard from '../components/TripCard'
import styled from 'styled-components'

import 'antd/lib/icon/style/css'

// TODO chache trip results

const TripList = styled.div`
  text-align: center;
`
const db = firebase.firestore()

type State = {
  trips: firebase.firestore.QueryDocumentSnapshot[]
}

export default class Trips extends React.Component<any, State> {
  public componentDidMount() {
    db.collection('trips')
      .get()
      .then(qs => this.setState({ trips: qs.docs }))

    // TODO: add login prompt on fetch fail
  }

  public render() {
    return (
      <TripList>
        {this.state && this.state.trips ? (
          this.state.trips.map(doc => (
            <div key={doc.id}>
              <TripCard trip={doc} />
            </div>
          ))
        ) : (
          <Icon type="loading" style={{ fontSize: '50px' }} />
        )}
      </TripList>
    )
  }
}
