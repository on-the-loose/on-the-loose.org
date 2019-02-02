import React from 'react'
import { Collapse } from 'antd'

export default class Info extends React.Component {
  public render() {
    return (
      <Collapse accordion>
        <Collapse.Panel header="What is OTL?" key="1">
          On the Loose (OTL) is the outdoors club of the 5C’s! It is our mission to get as many
          students into the outdoors as possible. This can be anywhere from Griffith Park to the
          tippy top of Mt. Whitney! This club is MEMBER LED. This is to say that all trips are
          student led and planned! Join the Facebook group entitled OTL and like the OTL page for
          more info. Our club’s name is based on the book On the Loose by Renny and Terry Russell
          which is our bible! Check it out
          (https://www.goodreads.com/book/show/1142380.On_the_Loose)
        </Collapse.Panel>
      </Collapse>
    )
  }
}
