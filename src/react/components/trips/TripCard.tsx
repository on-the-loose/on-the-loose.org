import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Wrapper = styled.div`
  display: inline-flex;
  text-align: left;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid #e8e8e8;
  width: 80%;
  max-width: 50rem;

  &:hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.09);
    position: relative;
    top: -1px;
    transition: top 0.3s, box-shadow 0.25s;
  }
`

const TripInfoCard = styled(Card)`
  display: inline-block;
  height: 10rem;
  width: 70%;
  border-radius: 0px;
  border-style: none;
`

// Add loading state for image
const TripImage = styled.img`
  display: inline-block;
  height: 10rem;
  width: 30%;
  z-index: 1;
`

export interface Props {
  trip: firebase.firestore.QueryDocumentSnapshot
}

export default function TripCard(props: Props) {
  const trip_data = props.trip.data()

  return (
    <Link to={`/trips/${props.trip.id}`}>
      <Wrapper>
        <TripInfoCard
          title={trip_data.title}
          bordered={false}
          bodyStyle={{
            padding: '0.6rem 1.5rem',
            height: '6.5rem',
            overflow: 'hidden'
          }}
          extra={moment(trip_data.dates.start.toDate()).format('MMM Do YY')}
        >
          <div style={{ overflow: 'hidden', height: '100%' }}>
            <span style={{ fontWeight: 'bold', marginBottom: '-0.5rem' }}>
              {trip_data.destination + ' '}
            </span>
            - {trip_data.description}
          </div>
        </TripInfoCard>
        <TripImage src={trip_data.image} alt="trip image" />
      </Wrapper>
    </Link>
  )
}
