import React from 'react'
import styled from 'styled-components'

export default class Home extends React.Component {
  public render() {
    return (
      <div>
        <s.ClubTitle>On The Loose</s.ClubTitle>
        <s.ClubSubTitle>The outdoors club of the Claremont Colleges</s.ClubSubTitle>

        <s.ClubDescription>
          <p>
            Welcome! OTL helps students organize trips to destinations across California and the
            Southwestern states.
          </p>
          <p>
            We make it easy for students to backpack, climb, car-camp, surf, bike, and enjoy the
            outdoors in any fashion. To these ends, we offer a wide-ranging assortment of gear to
            all students for free in partnership with the Pomona College Outdoors Education Center.
            We also provide extensive subsidies for our adventures.
          </p>
          <p>
            We welcome students of all ability levels. We host talks, classes and training to hone
            our skills. Every week On the Loose is sure to have something to excite you, on campus
            and off. Whatever your level of experience, we hope to see you soon on trail, in the
            surf, on the rocks, or in a big comfy couch at one of our Shindigs! Happy trails!
          </p>
        </s.ClubDescription>
      </div>
    )
  }
}

const s = {
  ClubTitle: styled.div`
    margin-top: 1rem;
    font-size: 3rem;
    text-align: center;
    font-weight: bold;
    font-family: 'Josefin Sans', sans-serif;

    @media (max-width: 750px) {
      margin-top: 0rem;
    }
  `,

  ClubSubTitle: styled.div`
    text-align: center;
    font-size: 1.2rem;
  `,

  ClubDescription: styled.div`
    margin: 4rem auto;
    max-width: 40rem;
    font-size: 1.1rem;
    background-color: rgba(247, 242, 237, 0.8);
    box-shadow: 0px 0px 100px 50px rgba(247, 242, 237, 0.8);

    @media (max-width: 750px) {
      margin-top: 2rem;
    }
  `
}
