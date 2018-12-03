import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import firebase from '@/firebase'
import { Icon } from 'antd'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

export interface Props extends RouteComponentProps {
  id: string
}

function Trip(props: Props) {
  const trip_doc = firebase.firestore().doc(`trips/${props.id}`)
  const { error, loading, value } = useDocument(trip_doc)

  if (value && !value.exists) props.history.replace('/trips')

  return (
    <s.Container>
      {' '}
      {loading ? <s.LoadingIcon type="loading" /> : !error && <TripInfo trip_data={value.data()} />}
    </s.Container>
  )
}

function TripInfo({ trip_data }) {
  console.log('​TripInfo -> trip_data', trip_data)

  return (
    <div>
      <s.ImageWrap>
        <s.Image src={trip_data.image} alt="trip image" />
      </s.ImageWrap>
      <s.Content>
        <h2>{trip_data.title}</h2>
        <ReactMarkdown source={trip_data.description} />
      </s.Content>
    </div>
  )
}

const s = {
  Container: styled.div`
    position: absolute;
    left: 10rem;
    right: 10rem;
    bottom: 4rem;
    top: 8rem;

    background-color: white;
    border-radius: 0.5rem;
    overflow: hidden;
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
  `
}

export default withRouter(Trip)
