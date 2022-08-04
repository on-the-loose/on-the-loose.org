import YouTube from 'react-youtube'
import { css } from '@emotion/react'

export default () => {
  const videoOpts = {
    height: Math.min(390, (window.innerWidth / 20) * 9),
    width: Math.min(640, (window.innerWidth / 20) * 16),
  }

  return (
    <div
      css={css`
        & > h2 {
          margin-top: 4rem;

          @media (min-width: 900px) {
            transform: translateY(100%);
            width: 15%;
            margin-left: -2.5rem;
          }
        }
        & > div {
          margin: auto;
          margin-bottom: 1rem;
          width: ${videoOpts.width}px;
        }
      `}
    >
      <h2>Tent set up</h2>
      <YouTube videoId="ha43JNTtus4" opts={videoOpts} />
      <h2>Camp stoves</h2>
      <YouTube videoId="TXXaIU0VNx0" opts={videoOpts} />
      <YouTube videoId="xzmY6HsX6Gc" opts={videoOpts} />
      <YouTube videoId="bY5Q4o5KLfo" opts={videoOpts} />
      <h2>Water purification methods</h2>
      <YouTube videoId="spxFrBaRjWU" opts={videoOpts} />
      <YouTube videoId="26ItLaOA0cE" opts={videoOpts} />
      <YouTube videoId="FkvDrzPe_vk" opts={videoOpts} />
      <h2>Fitting a backpack</h2>
      <YouTube videoId="0SGiGZlppMM" opts={videoOpts} />
      <h2>Leave No Trace</h2>
      <YouTube videoId="eWfh5LMTBig" opts={videoOpts} />
    </div>
  )
}
