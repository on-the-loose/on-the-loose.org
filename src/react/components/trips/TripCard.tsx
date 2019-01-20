import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import useCurrentProfile from '@/react/hooks/useCurrentProfile'

export default function TripCard({ id, trip_data }) {
  const profile = useCurrentProfile()
  const isSignedUp =
    trip_data.signUps && trip_data.signUps.map(e => e.email).includes(profile.email)

  const isLeader = trip_data.leader.email == profile.email

  return (
    <Link to={`/trips/${id}`}>
      <s.Wrapper>
        <s.TripInfoCard
          title={
            <span>
              {trip_data.title}
              <s.Subtitle>{isSignedUp && ' – SIGNED UP'}</s.Subtitle>
              <s.Subtitle>{isLeader && ' – LEADING'}</s.Subtitle>
            </span>
          }
          bordered={false}
          bodyStyle={{
            padding: '0.6rem 1.5rem',
            height: '6.5rem',
            overflow: 'hidden'
          }}
          extra={moment(trip_data.dates.start.toDate()).format('ddd, MMM Do')}
          // TODO display year for past trips
        >
          <div style={{ overflow: 'hidden', height: '100%' }}>
            <span style={{ fontWeight: 'bold', marginBottom: '-0.5rem' }}>
              {trip_data.destination + ' '}
            </span>
            - {trip_data.description}
          </div>
        </s.TripInfoCard>
        {/* TODO Add loading state for image */}
        <s.TripImage src={trip_data.image} alt="trip image" />
      </s.Wrapper>
    </Link>
  )
}

const s = {
  Wrapper: styled.div`
    max-width: 100%;
    display: inline-flex;
    text-align: left;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #e8e8e8;

    &:hover {
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.09);
      position: relative;
      top: -1px;
      transition: top 0.3s, box-shadow 0.25s;
    }
  `,

  TripInfoCard: styled(Card)`
    display: inline-block;
    height: 10rem;
    width: 70%;
    border-radius: 0px;
    border-style: none;

    @media (max-width: 700px) {
      width: 100%;
    }
  `,

  TripImage: styled.img`
    display: inline-block;
    height: 10rem;
    width: 30%;

    @media (max-width: 700px) {
      display: none;
    }
  `,

  Subtitle: styled.span`
    color: gray;
    font-size: 0.8rem;
    font-weight: lighter;
  `
}
