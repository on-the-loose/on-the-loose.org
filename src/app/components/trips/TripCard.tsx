import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: inline-flex;
  text-align: left;
  align-items: center;
  overflow: hidden;
  border-radius: 7px;
  border: 1px solid lightgray;
  width: 80%;
  max-width: 50rem;
`

const TripInfo = styled(Card)`
  display: inline-block;
  height: 10rem;
  width: 70%;
  border-radius: 0px;
  border-style: none;
`

const TripImage = styled.img`
  display: inline-block;
  height: 10rem;
  width: 30%;
  border-left: 1px solid lightgray;
  z-index: 1;
`

export interface Props {
  trip: firebase.firestore.QueryDocumentSnapshot
}

export default class TripCard extends React.Component<Props, any> {
  public render() {
    const trip_data = this.props.trip.data()
    return (
      <Wrapper>
        <TripInfo title={trip_data.title}>
          <p>{trip_data.destination}</p>
        </TripInfo>
        <TripImage src={trip_data.image} alt="trip image" />
      </Wrapper>
    )
  }
}
