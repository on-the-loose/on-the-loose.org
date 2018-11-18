import * as React from 'react'
import styled from 'styled-components'

const ClubTitle = styled.div`
  margin-top: 3rem;
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
  font-family: 'Josefin Sans', sans-serif;
`

const ClubDescription = styled.div`
  text-align: center;
`

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <ClubTitle>On The Loose</ClubTitle>
        <ClubDescription>The outdoors club of the Claremont Colleges</ClubDescription>
      </div>
    )
  }
}
