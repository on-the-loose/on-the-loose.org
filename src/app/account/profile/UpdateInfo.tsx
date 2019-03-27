import { Button } from 'antd'

import React, { useState } from 'react'
import firebase from 'src/firebase'
import ProfileForm from './ProfileForm'
import useCurrentProfile from 'src/utils/hooks/useCurrentProfile'
import _ from 'lodash'

// TODO: handle errors
// TODO: add cancel button

export default () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const profile = useCurrentProfile()

  const handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (err) return

      setIsLoading(true)
      setIsDisabled(true)

      values.bday = new Date(values.bday)

      firebase
        .firestore()
        .doc(`users/${profile.email}`)
        .update(_.omitBy(values, _.isUndefined))
        .then(res => {
          setIsLoading(false)
          setIsDisabled(false)
        })

      window.localStorage.setItem('emailForSignIn', values.email)
    })
  }

  return (
    <div>
      <ProfileForm
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
        onSubmit={handleSubmit}
        isDisabled={isDisabled}
        initialValues={profile}
      />
    </div>
  )
}
