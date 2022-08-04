import { Button, Popover } from 'antd'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import { auth } from 'src/firebase'

export default () => {
  const [showPopover, setShowPopover] = useState(false)

  const handleSignOut = () => {
    auth.signOut()
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
