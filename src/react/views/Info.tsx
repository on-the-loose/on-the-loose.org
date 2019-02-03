import React from 'react'
import { Collapse } from 'antd'
import css from '@emotion/css'

export default function Info() {
  return (
    <div
      css={css`
        max-width: 40rem;
        margin: auto;
      `}
    >
      <Collapse accordion>
        <Collapse.Panel header={<b>What is OTL?</b>} key="1">
          On the Loose (OTL) is the outdoors club of the 5C’s! It is our mission to get as many
          students into the outdoors as possible. This can be anywhere from Griffith Park to the
          tippy top of Mt. Whitney! This club is MEMBER LED. This is to say that all trips are
          student led and planned! Join the Facebook group titled OTL and like the OTL page for more
          info. Our club’s name is based on the book On the Loose by Renny and Terry Russell!
          <a href="https://www.goodreads.com/book/show/1142380.On_the_Loose"> Check it out.</a>
        </Collapse.Panel>
        <Collapse.Panel header={<b>Trip Leaders</b>} key="7">
          <p>
            OTL Leaders are the backbone of the club and are in charge of all OTL trips. They pick
            where to go, what to do, and get the gear and funding (to be reimbursed) that they need
            to make it happen. To become a leader: Attend one of OTL’s Leader Training Session
            trips, and lead a trip!
          </p>
          <p>
            Front Country trips: (less than 3 hours from advanced medical care) that don’t involve
            any high risk activities, need a leader or participant with a first aid certification or
            higher.
          </p>
          <p>
            Backcountry trips: (more than 3 hours from advanced medical care) Though OTL leaders do
            not need Wilderness First Aid/Responder, there must be a trip participant that with one
            of these certifications or higher.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header={<b>OTL Staff</b>} key="2">
          Hello! We are a small team of 5C students that volunteer our time to run OTL. If you have
          any questions or suggestions for us to improve the club, we’d love to hear them. You can
          email us at <a href="mailto:otl.staff@gmail.com">otl.staff@gmail.com</a>
        </Collapse.Panel>
        <Collapse.Panel header={<b>Difference between OTL and the OEC</b>} key="3">
          OTL is a student club created to help students plan, lead, and enjoy trips. The OEC (
          <a href="https://www.pomona.edu/administration/outdoor-education-center">
            Outdoor Education Center
          </a>
          ) is a 7C staff and student run center for outdoor education! Think of OTL as the trip
          leaders and the OEC as the educators, and risk management oversight. Besides running OA
          for Pomona College, the OEC teaches courses on outdoor leadership, offers Wilderness First
          Aid/Responder trainings, hosts workshops, rent gear, books, and guidebooks for free
          (!!!!!), leads beginner trips, and MUCH MUCH MORE! Give them a visit to learn about all
          the amazing stuff going on. The OEC is located on the first floor of Dialynas hall at
          Pomona, just east of Frary.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Gear We Lend</b>} key="5">
          OTL and the OEC (Pomona) have a partnership that allows OTL members and any 5C students to
          check out gear at no cost. Pitzer: POA gear closet. Scripps: OWL gear closet. Harvey Mudd:
          Delta H.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Places we go</b>} key="6">
          On the Loose sends trips all over Southern California and Southwestern States, from
          Anza-Borrego to Zion. OTL maintains an extensive guide that describes many of our favorite
          destinations. OTL-ers enjoy all types and intensities of outdoor activities including rock
          climbing, day hiking, car camping, surfing, beaching, backpacking, biking,
          skiing/snowboarding, watercoloring, and taking photos. If you have an inkling of interest
          in the outdoors regardless of your experience, we can keep you busy.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Cars and Transportation</b>} key="8">
          Cars:
          <p>
            Plan ahead! Reach out to trip participants to see how many cars you have available. If
            you are in need of extra cars there are resources at the 5Cs.
          </p>
          <p>
            <i>Pomona:</i> The Outdoor Education Center has a 7 passenger vehicle available to
            borrow. ASPC has 2 vehicles available to borrow. <i>Scripps: </i> (SCR only) Borrow a
            Scripps Vehicle. Go to{' '}
            <a href="https://emsweb.claremont.edu/Scripps/BrowseEvents.aspx">SARLO office</a>.
            <i> Pitzer:</i> Borrow Scripps Vans
          </p>
          <p>
            Zipcar: Contact OTL Staff if you are in a pinch, we may be willing to reimburse a
            zipcar. Please get permission before making a reservation.
          </p>
          <p>
            How to become an approved driver: Fill Out an approved driver form at OEC/ASPC/SARLO/
            etc depending on campus
          </p>
        </Collapse.Panel>
        <Collapse.Panel header={<b>Contact Info</b>} key="4">
          Contact OTL Staff via email at
          <a href="mailto:otl.staff@gmail.com"> otl.staff@gmail.com</a>. Or stop by the OEC from 1pm
          to 8pm to catch OEC Staff on shift.
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}
