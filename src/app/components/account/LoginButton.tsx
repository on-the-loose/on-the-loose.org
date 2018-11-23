import 'antd/lib/modal/style/css'
import 'antd/lib/button/style/css'

import { Button, Modal } from 'antd'

import LoginForm from './LoginForm'
import React from 'react'
import styled from 'styled-components'

export interface State {
  visible: boolean
  loading: boolean
}

export default class LoginButton extends React.Component<any, State> {
  state = { visible: false, loading: false }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  handleCancel = e => {
    console.log(e)
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Log in
        </Button>
        <Modal
          bodyStyle={{
            minHeight: 300,
            minWidth: 400,
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
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <LoginForm />
        </Modal>
      </div>
    )
  }
}
