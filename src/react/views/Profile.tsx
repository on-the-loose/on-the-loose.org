import { Avatar, Alert } from 'antd'
import FbConnectButton from '../components/account/FbConnectButton'
import React, { useState } from 'react'
import firebase from '@/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import useCurrentProfile from '../hooks/useCurrentProfile'

export default function Profile() {
  const profile = useCurrentProfile()

  return !profile ? (
    <s.Center>
      <h1> Welcome to On The Loose! </h1> <h2>Enter your profile information to get started</h2>
    </s.Center>
  ) : (
    <s.Center>
      <h1>{profile.name}</h1>
    </s.Center>
  )
}

const s = {
  Center: styled.div`
    text-align: center;
  `
}
