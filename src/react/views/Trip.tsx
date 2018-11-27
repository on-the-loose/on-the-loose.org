import React from 'react'

export interface Props {
  id: string
}

export default function Trip(props: Props) {
  return <div>{props.id}</div>
}
