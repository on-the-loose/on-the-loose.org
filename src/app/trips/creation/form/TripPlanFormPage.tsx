import React from 'react'
import css from '@emotion/css'

export interface Props {
  initialData?: any
  isDisplayed: boolean
}

export default (props: Props) => {
  return (
    <div
      style={{ display: !props.isDisplayed && 'none' }}
      id="fsScript"
      css={css`
        iframe {
          display: ${props.isDisplayed ? 'block' : 'none'};
          width: 100%;
          height: 550px;
        }
      `}
    >
      <iframe src="https://pomona.formstack.com/forms/outdoor_trip_planning_form" frameBorder="0" />
    </div>
  )
}
