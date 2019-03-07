import React from 'react'
import YouTube from 'react-youtube'
import css from '@emotion/css'

export default function SkillsInfo(props) {
  return (
    <div
      css={css`
        & > h2 {
          margin-top: 4rem;
          transform: translateY(100%);
          width: 15%;
          text-align: left;
        }
        & > div {
          margin: auto;
          margin-bottom: 1rem;
          width: 70%;
        }
      `}
    >
      <h2>Tent set up</h2>
      <YouTube videoId="ha43JNTtus4" />
      <h2>Camp stoves</h2>
      <YouTube videoId="TXXaIU0VNx0" />
      <YouTube videoId="xzmY6HsX6Gc" />
      <YouTube videoId="bY5Q4o5KLfo" />
      <h2>Water purification methods</h2>
      <YouTube videoId="spxFrBaRjWU" />
      <YouTube videoId="26ItLaOA0cE" />
      <YouTube videoId="FkvDrzPe_vk" />
      <h2>Fitting a backpack</h2>
      <YouTube videoId="0SGiGZlppMM" />
      <h2>Leave No Trace</h2>
      <YouTube videoId="eWfh5LMTBig" />
    </div>
  )
}
