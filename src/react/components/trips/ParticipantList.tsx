import React from 'react'
import css from '@emotion/css'
import { Popover, Icon } from 'antd'

export default ({ isLeader, tripData, onToggleConfirm }) => {
  return (
    <div>
      <h3>
        Participants{' '}
        <Popover content="Confirmed participants" placement="right">
          <span
            css={css`
              color: gray;
            `}
          >
            ({tripData.confirmedParticipants ? tripData.confirmedParticipants.length + 1 : 1}/
            {tripData.max_participants})
          </span>
        </Popover>
      </h3>

      <table css={styles.table}>
        <tbody>
          <tr>
            <td>1. {tripData.leader.name}</td>
            <td css={styles.cell}>
              <i> Confirmed</i>
            </td>
          </tr>
          {tripData.signUps &&
            tripData.signUps.map((user, index) => {
              const isConfirmed =
                tripData.confirmedParticipants &&
                tripData.confirmedParticipants.includes(user.email)
              return (
                <tr
                  key={user.email}
                  css={css`
                    font-weight: ${isConfirmed ? 400 : 100};
                  `}
                >
                  <td>
                    {index + 2}. {user.name}
                  </td>
                  <td css={styles.cell}>
                    {isConfirmed && <i> Confirmed </i>}
                    {isLeader && (
                      <a onClick={() => onToggleConfirm(user, isConfirmed)}>
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
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  table: css`
    margin-left: 1rem;
    margin-bottom: 1rem;
  `,
  cell: css`
    padding-left: 1rem;
  `
}
