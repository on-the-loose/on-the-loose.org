import { useState } from 'react'
import { Popover, Button } from 'antd'
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import { Profile } from 'src/utils/hooks/useCurrentProfile'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from 'src/firebase'

export interface Props {
  isSignedUp: boolean
  profile: Profile
  tripId: string
  disabled?: boolean
}

export default (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmVisible, setisConfirmVisible] = useState(false)

  const toggleSignUp = () => {
    setisConfirmVisible(false)

    const operation = props.isSignedUp ? arrayRemove : arrayUnion

    updateDoc(doc(db, `trips/${props.tripId}`), {
      signUps: operation({
        email: props.profile.email,
        name: props.profile.name,
        confirmed: false,
      }),
    })
      .then((res) => {
        setIsLoading(false)
      })
      .catch(() => console.log('failed'))
  }

  return props.isSignedUp ? (
    <Button
      onClick={toggleSignUp}
      loading={isLoading}
      type={'primary'}
      danger
      disabled={props.disabled}
    >
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
            By signing up to this trip I agree to the terms and conditions of{' '}
            <Link to="/info/liability" target="_blank">
              this release and waiver of liability.
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
