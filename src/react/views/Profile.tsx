import React from 'react'

import UpdateInfoButton from '../components/account/UpdateInfoButton'

import styled from 'styled-components'
import useCurrentProfile from '../hooks/useCurrentProfile'

export default function Profile() {
  const profile = useCurrentProfile()

  return (
    <s.Center>
      {!profile ? (
        <div>
          <h1> Welcome to On The Loose! </h1>
          <h2>Enter your profile information to get started</h2>
        </div>
      ) : (
        <h1>{profile.name}</h1>
      )}
      <UpdateInfoButton />
    </s.Center>
  )
}

const s = {
  Center: styled.div`
    text-align: center;
  `
}
