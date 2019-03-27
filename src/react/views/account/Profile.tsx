import React from 'react'

import UpdateInfoButton from '../../components/account/UpdateInfoButton'

import useCurrentProfile from '../../hooks/useCurrentProfile'
import css from '@emotion/css'
import ProfileForm from '@/react/components/account/ProfileForm'
import UpdateInfo from '@/react/components/account/UpdateInfo'

export default function Profile() {
  const profile = useCurrentProfile()

  return (
    <div
      css={css`
        text-align: center;
        margin: 0 30% 0 30%;
      `}
    >
      {!profile ? (
        <div>
          <h1> Welcome to On The Loose! </h1>
          <h2>Enter your profile information to get started</h2>
        </div>
      ) : (
        <h1>Your Profile</h1>
      )}
      <UpdateInfo />
    </div>
  )
}
