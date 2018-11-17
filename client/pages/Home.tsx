import * as React from 'react'
import styled from 'styled-components'

import background from '../assets/background.jpg'

const ClubTitle = styled.div`
  font-size: 3rem;
  text-align: center;
`

const ClubDescription = styled.div`
  text-align: center;
`

const BackgroundImage = styled.img`
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  filter: grayscale(100%);
`

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <BackgroundImage src={background} />
        <ClubTitle>On The Loose</ClubTitle>
        <ClubDescription>The outdoors club of the Claremont Colleges</ClubDescription>
      </div>
    )
  }
}
