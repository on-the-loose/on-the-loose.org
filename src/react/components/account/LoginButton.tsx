import { Button, Modal } from 'antd'

import LoginForm from './LoginForm'
import React, { useState } from 'react'
import styled from 'styled-components'
import SignUpForm from './SignUpForm'

export interface State {
  visible: boolean
  loading: boolean
}

let email = ''

export default function LoginButton(props) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Button type="primary" onClick={() => setShowModal(true)}>
        Log in
      </Button>
      <Modal
        bodyStyle={{
          minHeight: 200,
          minWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem'
        }}
        style={{
          textAlign: 'center'
        }}
        closable={false}
        centered
        visible={showModal}
        footer={null}
        onCancel={() => setShowModal(false)}
      >
        {isSignUp ? (
          <SignUpForm email={email} />
        ) : (
          <LoginForm setIsSignUp={setIsSignUp} setEmail={e => (email = e)} />
        )}
      </Modal>
    </div>
  )
}
