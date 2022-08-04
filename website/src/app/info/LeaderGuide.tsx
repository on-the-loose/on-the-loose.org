import { Collapse } from 'antd'
import ReactMarkdown from 'react-markdown'
import { css } from '@emotion/react'

export default () => {
  return (
    <div
      css={css`
        max-width: 40rem;
        margin: auto;
        margin-top: -2rem;
      `}
    >
      <h1 style={{ textAlign: 'center' }}>Leader Guide</h1>
      <p style={{ fontSize: '1.05rem' }}>
        OTL Leaders are the backbone, sidebone, and tailbone of this club, the bread, peanut butter,
        and the jelly. (OTL Staff is like a foot bone or a toaster for the bread maybe). Our
        volunteer leaders make this club exist and we love each and every one of you! Leading a trip
        can be daunting, so this guide is here to walk you through the process -- and remember OTL
        staff is always available <a href="mailto:otlstaff@gmail.com">otlstaff@gmail.com</a> to
        answer any questions!
      </p>

      <Collapse accordion>
        <Collapse.Panel
          header={
            <b>
              <i>How to become a leader</i>
            </b>
          }
          key="leader"
        >
          <ReactMarkdown>{becomingALeaderInfo}</ReactMarkdown>
        </Collapse.Panel>
        <Collapse.Panel header={<b>How to organize a trip</b>} key="pre-trip">
          <ReactMarkdown>{preTripInfo}</ReactMarkdown>
        </Collapse.Panel>
        <Collapse.Panel header={<b>What to do during a trip</b>} key="on-trip">
          <ReactMarkdown>{onTripInfo}</ReactMarkdown>
        </Collapse.Panel>
        <Collapse.Panel header={<b>What to do after a trip</b>} key="post-trip">
          <ReactMarkdown>{postTripInfo}</ReactMarkdown>
        </Collapse.Panel>
      </Collapse>
    </div>
  )
}

// TODO: Save these as markdown files and load them in here
const becomingALeaderInfo = `How to become a leader:

Obtain a medical training and certification appropriate for the type of trips you want to lead:
  - Front Country trips (less than 2 hours from advanced medical care) that don’t involve any high risk activities, need a leader with a first aid certification or higher.
  - Backcountry trips (more than 2 hours from advanced medical care) need a leader with a Wilderness First Aid (WFA) or Wilderness First Responder (WFR) certification.
  - Attend one of OTL’s Leader Trainings, and then lead a trip. OTL Leaders are the backbone of the club and are in charge of all OTL trips. They pick where to go, what to do, and make trips happen.`

const preTripInfo = `- Where do ya want to go? 
  - First, take a look at all the info collected from past OTL trips using this link: [bit.ly/OECmaps]Bit.ly/OECmaps You will find things like ranger station contact info, nearest hospitals, trailheads, etc.
  - Some planning links (also Google!): [trails.com](https://www.trails.com/trailfinder/browsebymap/?statecode=CS), [alltrails.com](https://alltrails.com/us/california), [hikespeak.com](http://www.hikespeak.com/), [everytrail.com](http://www.everytrail.com/best/hiking-california), [localhikes.com](http://www.localhikes.com/MSA/MSA_4472.asp), [modernhiker.com](http://www.modernhiker.com/)
- What kind of trip do you want to lead and have the appropriate training to lead?
  - Day trip
    - Day hike: e.g. Ice House Canyon, Claremont Wilderness Park, Rancho Santa Ana Botanic Gardens
    - Beach day: e.g. Crystal Cove State Park, Leo Carrillo State Park (both great for beach camping too)
    - Sunrise/sunset hike: e.g. Potato Mountain
  - Weekend car camping (1-2 nights): e.g. Joshua Tree, Crystal Cove, Big Bear, Angeles National Forest, Bishop/Eastern Sierra
  - Weekend backpacking (1-2 nights)
  - Longer car camping (3+ nights)
  - Longer backpacking (3+ nights)
  - Check out the OTL guide and past trips for ideas about where to go (or just nose around on Google)!
- Do you need a permit/campsite reservations?
  - Permit info can be found on the website of wherever you&#39;re going, or by calling the park ranger (permits mostly needed for backpacking)
  - Campsite reservations for state parks [reservecalifornia.com](http://www.reservecalifornia.com), national parks [recreation.gov](http://www.recreation.gov) or call (877) 444-6777 to reserve National Parks campsites
  - Some campsites are first-come, first-serve so make sure you bring cash for fees and get there early!
- What do you need to bring?
  - Park/campsite website, or calling ranger, will give you info on:
    - Water availability
    - Bathroom situation
    - Capacity of campsites
    - Fires
    - Cell service
  - Check weather, plan accordingly for clothes and plan of each day
- Trip planning necessities:
  - Where you&#39;re sleeping each night
  - What you&#39;re doing each day (or some options for the group, especially If you&#39;ll have cell service and can be flexible)
  - What you&#39;re eating for each meal
    - PACKOUTS available from Frary 1 week in advance (meal card numbers on participants&#39; OTL profiles)
    - Remember allergies, dietary restrictions
- Posting trip and sign-ups:
  - Post your trip ~1 week before departure!
  - Have a clear trip description describing difficulty of trip, what you&#39;ll be doing, be clear about what people should expect
  - Try to avoid using lots of unclear outdoor lingo (i.e. &quot;bowl, cup &amp; spoon&quot;, not &quot;mess kit,&quot; &quot;sleeping bag and sleeping pad,&quot; not &quot;camping gear&quot;)
  - Be clear about what required gear can be checked out from the OEC!
  - Check out dietary restrictions, potential medical issues of participants
  - Send out email specifying difficulty level of a trip, asking about cars (OTL policy is anyone driving a car gets automatically confirmed!)
  - You can randomly confirm people or confirm by signup order
- Week of trip (mostly for an overnight/longer trip):
  - Email participants and get a final number on cars, how many you can take - remember that people will cancel last minute so this will be a rolling count, you can have people show up at the OEC and see if there is room if they aren&#39;t confirmed
  - Go food shopping or order packouts from Frary (remember that people eat A LOT camping)
  - Check out group gear from OEC (do this ASAP esp. For fall break/spring break)! Gear needs vary but usually:
    - Tents (OEC has 2 and 4 person, but 4 person can fit 5)
    - Stoves and fuel (frontcountry or backcountry)
    - Cooking gear (pots and lids, pans, kitchen kit)
    - Water droms/jugs
    - Backcountry specific:
      - Water purification (pump or gravity bag)
      - Poopy kit(s), period bags
  - Meet with co-leaders to go over plan, figure out driving directions, print out confirmation info on campsites`

const onTripInfo = `- Leaders should be at meeting place on time!
  - build in an hour ish for overnight trips between meeting time and when you leave campus for packing cars, bathroom, etc
  - Make sure everyone has full water bottles before you leave
  - Establish driving directions with all drivers, make sure everyone knows where you&#39;re meeting up (especially if you won&#39;t have cell service)
- Set the tone immediately for group: be friendly and confident, chat with people, learn names
  - Establish that everyone is equally on the trip, everyone is working working together to make this trip happen- you&#39;re not the camp counselor, everyone is responsible for cooking, cleaning, setting up and packing up camp, timing, etc. And if participants have questions about how to do any of this, they should ask a leader!
  - WOOHOO lets go!!! You rock
- Make sure you&#39;re remaining aware of inherent risk in activities, avoid SUMMIT FEVER by setting clear boundaries, turnaround times, etc
- Talk to everyone, check in on how people are doing, don&#39;t be cliquey with your co-leaders
- Skill share! Show how to use stoves, how to set up tents, how to build fires, etc
- Make group decisions but also know that you get final say and trust your judgment, not every choice needs to be made by the entire group -- but consult with your co-leaders!
- Leave No Trace! Pack out your trash, put your fires dead out, camp and hike only on durable designated surfaces, don&#39;t take anything you didn&#39;t bring!
- SAVE YOUR RECEIPTS!`

const postTripInfo = `- Make sure people know how to return gear to OEC, how to get reimbursed (bring your receipts into the OEC during business hours Mon-Fri and fill out forms)
- Fill out the [near miss/incident report form](https://pomona.formstack.com/forms/outdoor_incident_report_form)
- Grab a meal on campus with your group! (awwww \&lt;3)
- Clean group gear before you return it to the OEC
- Take a shower ya filthy animal
- And a nap u earned it
- Xoxo, OTL`
