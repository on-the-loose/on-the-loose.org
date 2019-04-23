import { Card } from 'antd'
import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'
import moment from 'moment'
import useCurrentProfile from 'src/react/hooks/useCurrentProfile'

export default function TripCard({ id, trip_data }) {
  const profile = useCurrentProfile()
  const isSignedUp =
    trip_data.signUps && trip_data.signUps.map(e => e.email).includes(profile.email)

  const isLeader = trip_data.leader.email == profile.email

  return (
    <Link to={`/trips/${id}`}>
      <div css={styles.wrapper}>
        <Card
          css={styles.tripInfoCard}
          title={
            <span>
              {trip_data.title}
              <span css={styles.subtitle}>{isSignedUp && ' – SIGNED UP'}</span>
              <span css={styles.subtitle}>{isLeader && ' – LEADING'}</span>
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
          <div
            css={css`
              overflow: hidden;
              height: 100%;
            `}
          >
            <span
              css={css`
                font-weight: 'bold';
                margin-bottom: -0.5rem;
              `}
            >
              {trip_data.destination + ' '}
            </span>
            - {trip_data.description}
          </div>
        </Card>
        {/* TODO Add loading state for image */}
        <img css={styles.tripImage} src={trip_data.image} alt="trip image" />
      </div>
    </Link>
  )
}

const styles = {
  wrapper: css`
    width: 100%;
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

  tripInfoCard: css`
    display: inline-block;
    height: 10rem;
    width: 70%;
    border-radius: 0px;
    border-style: none;

    @media (max-width: 700px) {
      width: 100%;
    }
  `,

  tripImage: css`
    display: inline-block;
    height: 10rem;
    width: 30%;

    @media (max-width: 700px) {
      display: none;
    }
  `,

  subtitle: css`
    color: gray;
    font-size: 0.8rem;
    font-weight: lighter;
  `
}
