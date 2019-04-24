import React, { useState } from 'react'
import { Popover, Button } from 'antd'
import css from '@emotion/css'
import { Link } from 'react-router-dom'
import firebase from 'src/firebase'
import { Profile } from 'src/utils/hooks/useCurrentProfile'

export interface Props {
  isSignedUp: boolean
  profile: Profile
  tripId: string
  disabled?: boolean
}

export default (props: Props) => {
  const db = firebase.firestore()

  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmVisible, setisConfirmVisible] = useState(false)

  const toggleSignUp = () => {
    setisConfirmVisible(false)

    const operation = props.isSignedUp
      ? firebase.firestore.FieldValue.arrayRemove
      : firebase.firestore.FieldValue.arrayUnion

    db.doc(`trips/${props.tripId}`)
      .update({
        signUps: operation({
          email: props.profile.email,
          name: props.profile.name,
          confirmed: false
        })
      })
      .then(res => {
        setIsLoading(false)
      })
      .catch(() => console.log('failed'))
  }

  return props.isSignedUp ? (
    <Button onClick={toggleSignUp} loading={isLoading} type={'danger'} disabled={props.disabled}>
      Withdraw
    </Button>
  ) : (
    <Popover
      content={
        <div
          css={css`
            text-align: center;
          `}
        >
          <p>
            By signing up to this trip I agree to the OTL{' '}
            <Link to="/info/liability" target="_blank">
              liability waiver
            </Link>
            .
          </p>
          <Button onClick={toggleSignUp}>Confirm</Button>
        </div>
      }
      placement="right"
      visible={isConfirmVisible}
    >
      <Button
        loading={isLoading}
        onClick={() => setisConfirmVisible(!isConfirmVisible)}
        type={'primary'}
        disabled={props.disabled}
      >
        Sign up
      </Button>
    </Popover>
  )
}
