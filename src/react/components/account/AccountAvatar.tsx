import { Avatar, Button, Popover } from 'antd'

import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import firebase from 'src/firebase'
import useCurrentProfile from 'src/react/hooks/useCurrentProfile'

export default function AccountAvatar(props) {
  const [showPopover, setShowPopover] = useState(false)

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      })
  }

  const profile = useCurrentProfile()

  return (
    <Popover
      placement="bottomLeft"
      content={
        <div style={{ textAlign: 'center' }}>
          <a onClick={handleSignOut}>Sign out</a> |{' '}
          <Link to={'/profile'} onClick={() => setShowPopover(false)}>
            Profile
          </Link>
        </div>
      }
      title={
        <div style={{ textAlign: 'center' }}>{profile ? profile.name : 'Loading profile...'}</div>
      }
      trigger="click"
      visible={showPopover}
      onVisibleChange={setShowPopover}
    >
      <Button shape="circle" size="large" icon="user" />
    </Popover>
  )
}
