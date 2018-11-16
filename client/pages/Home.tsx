import * as React from 'react'
import styled from 'styled-components'

const ClubTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <ClubTitle>On The Loose</ClubTitle>
        Home
      </div>
    )
  }
}
