import React from 'react'
import styled from 'styled-components'

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <s.ClubTitle>On The Loose</s.ClubTitle>
        <s.ClubDescription>The outdoors club of the Claremont Colleges</s.ClubDescription>
      </div>
    )
  }
}

const s = {
  ClubTitle: styled.div`
    margin-top: 3rem;
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    font-family: 'Josefin Sans', sans-serif;
  `,

  ClubDescription: styled.div`
    text-align: center;
  `
}
