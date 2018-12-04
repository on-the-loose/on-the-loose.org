import { Avatar, Alert } from 'antd'
import FbConnectButton from '../components/account/FbConnectButton'
import React, { useState } from 'react'
import firebase from '@/firebase'
import { useDocument } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'

export interface Props {
  user: firebase.User
}

export default function Profile({ user }: Props) {
  if (!user) return <div />

  const db = firebase.firestore()
  const userDoc = db.collection('users').doc(user.uid)
  const { error, loading, value } = useDocument(userDoc)

  const isNewUser = !(value && value.exists)
  const isFbConnected = user.providerData[0].providerId == 'facebook.com'
  const fbData = user.providerData[0]

  console.log(value)

  return isNewUser ? (
    <s.Center>
      <h1> Welcome to On The Loose! </h1> <h2>Enter your profile information to get started</h2>
      {!isFbConnected && <ConnectToFacebookPrompt />}
    </s.Center>
  ) : (
    <div>
      Hello!{' '}
      {isFbConnected && (
        <div style={{ textAlign: 'center' }}>
          <Avatar size={200} src={fbData.photoURL + '?type=large'} />
          <h1>{fbData.displayName}</h1>
        </div>
      )}
    </div>
  )
}

function ConnectToFacebookPrompt() {
  return (
    <Alert
      style={{ margin: 'auto', maxWidth: '40rem' }}
      message={<FbConnectButton />}
      description={
        <div>
          You can connect to Facebook to automatically import your name, birth date and profile
          photo if you want.
        </div>
      }
      type="info"
      closable
    />
  )
}

const s = {
  Center: styled.div`
    text-align: center;
  `
}
