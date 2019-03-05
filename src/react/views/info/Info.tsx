import React from 'react'
import { Collapse } from 'antd'
import css from '@emotion/css'

import leader_icon from '@/assets/noun_leader.svg'
import camping_icon from '@/assets/noun_camping.svg'

import { Link } from 'react-router-dom'

export default function Info() {
  return (
    <div
      css={css`
        max-width: 40rem;
        margin: auto;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: center;
          text-align: center;
          margin-bottom: 2rem;
        `}
      >
        <div css={styles.linkBox}>
          <Link to="info/leader">
            <img css={styles.linkIcon} src={leader_icon} alt="Leader Icon" />
          </Link>
          <div>Leader info</div>
        </div>

        <div css={styles.linkBox}>
          <Link to="info/skills">
            <img css={styles.linkIcon} src={camping_icon} alt="Camping Icon" />
          </Link>
          <div>Skill Tutorials</div>
        </div>
      </div>

      <Collapse accordion>
        <Collapse.Panel header={<b>What is OTL?</b>} key="otl">
          On the Loose (OTL) is the outdoors club of the 5C’s! It is our mission to get as many
          students into the outdoors as possible. This can be anywhere from Griffith Park to the
          tippy top of Mt. Whitney. Join the Facebook group titled OTL and like the OTL page for
          more info. Our club’s name is based on the book On the Loose by Renny and Terry Russell,
          <a href="https://www.goodreads.com/book/show/1142380.On_the_Loose"> check it out.</a>
        </Collapse.Panel>
        <Collapse.Panel header={<b>Trip Leaders</b>} key="trip_leaders">
          <p>
            OTL Leaders are the backbone of the club and are in charge of all OTL trips. They pick
            where to go, what to do, and make trips happen. To become a leader you just gotta attend
            one of OTL’s Leader Trainings, and then lead a trip.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header={<b>First Aid Certifications</b>} key="safety">
          <p>
            Front Country trips (less than 3 hours from advanced medical care) that don’t involve
            any high risk activities, need a leader or participant with a first aid certification or
            higher.
          </p>
          <p>
            Backcountry trips (more than 3 hours from advanced medical care) need a leader or
            participant with a Wilderness First Aid (WFA) or Wilderness First Responder (WFR)
            certication.
          </p>
        </Collapse.Panel>
        <Collapse.Panel header={<b>OTL Staff</b>} key="staff">
          Hello! We are a small team of 5C students that volunteer our time to run OTL. If you have
          any questions or suggestions for us to improve the club, we’d love to hear them. You can
          email us at <a href="mailto:otl.staff@gmail.com">otl.staff@gmail.com</a>
        </Collapse.Panel>
        <Collapse.Panel header={<b>Difference between OTL and the OEC</b>} key="otl_oec">
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
        <Collapse.Panel header={<b>Gear We Lend</b>} key="gear">
          OTL and the OEC (Pomona) have a partnership that allows OTL members and any 5C students to
          check out gear at no cost. Pitzer: POA gear closet. Scripps: OWL gear closet. Harvey Mudd:
          Delta H.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Places we go</b>} key="places">
          On the Loose sends trips all over Southern California and Southwestern States, from
          Anza-Borrego to Zion. OTL maintains an extensive guide that describes many of our favorite
          destinations. OTL-ers enjoy all types and intensities of outdoor activities including rock
          climbing, day hiking, car camping, surfing, beaching, backpacking, biking,
          skiing/snowboarding, watercoloring, and taking photos. If you have an inkling of interest
          in the outdoors regardless of your experience, we can keep you busy.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Cars and Transportation</b>} key="cars">
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
        <Collapse.Panel header={<b>Liability Waiver</b>} key="liability_waiver">
          For legal reasons, by signing up to a trip through the OTL website you agree to the
          liability waiver <Link to="info/liability">available here</Link>.
        </Collapse.Panel>
        <Collapse.Panel header={<b>Contact Info</b>} key="contact_info">
          Contact OTL Staff via email at
          <a href="mailto:otl.staff@gmail.com"> otl.staff@gmail.com</a>. Or stop by the OEC from 1pm
          to 8pm to catch OEC Staff on shift.
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

const styles = {
  linkIcon: css`
    width: 8rem;
    height: 8rem;
    filter: invert(0.4);

    @media (max-width: 700px) {
      width: 5rem;
      height: 5rem;
    }
  `,
  linkBox: css`
    display: inline-block;
    padding: 0.5rem;
    border-bottom: 2px solid transparent;
    margin: 0 2.5rem;
    &:hover {
      transition: border-bottom 0.5s;
      border-bottom: 2px solid #1890ff;
    }

    @media (max-width: 700px) {
      margin: 0 1rem;
    }
  `
}
