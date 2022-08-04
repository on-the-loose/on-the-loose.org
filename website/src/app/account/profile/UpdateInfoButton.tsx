import { Button, Modal } from 'antd'
import { useState } from 'react'
import UpdateInfo from './UpdateInfo'

export interface State {
  visible: boolean
  loading: boolean
}

export default () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Update Information</Button>
      {showModal && (
        <Modal
          bodyStyle={{
            minHeight: 200,
            minWidth: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem',
          }}
          style={{
            textAlign: 'center',
          }}
          closable={false}
          centered
          visible={showModal}
          footer={null}
          onCancel={() => setShowModal(false)}
        >
          <UpdateInfo />
        </Modal>
      )}
    </div>
  )
}
