import React from 'react'

import UpdateInfoButton from 'src/app/account/profile/UpdateInfoButton'

import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import css from '@emotion/css'

export default () => {
  const profile = useCurrentProfile()

  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      {!profile ? (
        <div>
          <h1> Welcome to On The Loose! </h1>
          <h2>Enter your profile information to get started</h2>
        </div>
      ) : (
        <h1>{profile.name}</h1>
      )}
      <UpdateInfoButton />
    </div>
  )
}
