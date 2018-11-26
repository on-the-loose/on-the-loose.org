import React from 'react'
import background from '@/assets/background.jpg'
import styled from 'styled-components'

const BackgroundImage = styled.img`
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  filter: grayscale(100%);
`

export default () => <BackgroundImage src={background} />
