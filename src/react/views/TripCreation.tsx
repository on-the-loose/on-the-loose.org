import React, { useState } from 'react'
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Icon, InputNumber } from 'antd'

import { FormComponentProps } from 'antd/lib/form'
import _ from 'lodash'
import firebase from '@/firebase'
import moment from 'moment'
import imageValidator from '@/utils/imageValidator'
import styled from 'styled-components'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import useCurrentProfile from '../hooks/useCurrentProfile'
import TripForm from '../components/trips/TripForm'

export interface Props extends RouteComponentProps, FormComponentProps {}

function TripCreation(props: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const profile = useCurrentProfile()

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (err) return

      const data = _.omitBy(values, _.isUndefined)

      data.dates = { start: data.dates[0].toDate(), end: data.dates[1].toDate() }
      data.leader = { name: profile.name, email: profile.email }

      setIsLoading(true)

      firebase
        .firestore()
        .collection('trips')
        .add(data)
        .then(res => {
          setIsLoading(false)
          props.history.replace(`/trips/${res.id}`)
        })
        .catch(() => console.log('failed'))

      // TODO: add error indicator
    })
  }

  const { getFieldDecorator } = props.form

  return <TripForm onSubmit={handleSubmit} loading={isLoading} />
}

const s = {
  Container: styled.div`
    position: absolute;

    top: 8rem;
    bottom: 4rem;
    left: 10rem;
    right: 10rem;

    @media (max-width: 750px) {
      top: 8rem;
      bottom: 4rem;
      left: 1rem;
      right: 1rem;
    }

    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
    min-height: min-content;
    max-width: 50rem;
    margin: auto;
  `,

  ImageWrap: styled.div`
    width: 100%;
    height: 10rem;
    overflow: hidden;
    vertical-align: middle;
  `,

  Image: styled.img`
    width: 100%;

    transform: translateY(-25%);
  `,

  LoadingIcon: styled(Icon)`
    font-size: 50px;
    margin: auto;
    display: block;
  `,

  Content: styled.div`
    padding: 1rem 2rem;
    @media (min-width: 700px) {
      margin-top: 20%;
    }
  `
}

export default withRouter(Form.create()(TripCreation))
