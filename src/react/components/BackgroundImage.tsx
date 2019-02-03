import React from 'react'
import background from '@/assets/background.jpg'
import css from '@emotion/css'

export default () => (
  <img
    css={css`
      width: 100%;
      bottom: 0;
      left: 0;
      position: fixed;
      mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
      filter: grayscale(100%);
      z-index: -1;
    `}
    src={background}
  />
)
