import * as React from 'react'
import firebase from '../../firebase'
import { Icon } from 'antd'
import TripCard from './TripCard'
import styled from 'styled-components'

import 'antd/lib/icon/style/css'

const TripList = styled.div`
  margin-top: 2rem;
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
      .then(qs => {
        console.log(qs)
        this.setState({ trips: qs.docs })
      })
  }

  public render() {
    return (
      <TripList>
        {this.state && this.state.trips ? (
          this.state.trips.map(doc => (
            <div>
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
