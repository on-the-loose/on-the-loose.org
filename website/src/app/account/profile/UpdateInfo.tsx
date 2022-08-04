import { Button } from 'antd'
import { useState } from 'react'
import ProfileForm from './ProfileForm'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import _ from 'lodash'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from 'src/firebase'

// TODO: handle errors
// TODO: add cancel button

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const profile = useCurrentProfile()

  const handleFormFinish = (values) => {
    setIsLoading(true)
    setIsDisabled(true)

    values.bday = new Date(values.bday)

    updateDoc(doc(db, 'users', profile.email), _.omitBy(values, _.isUndefined)).then(() => {
      setIsLoading(false)
      setIsDisabled(false)
    })

    window.localStorage.setItem('emailForSignIn', values.email)
  }

  return (
    <div>
      <ProfileForm
        onFinish={handleFormFinish}
        isDisabled={isDisabled}
        initialValues={profile}
        submitButton={
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLoading}
          >
            Update Information
          </Button>
        }
      />
    </div>
  )
}
