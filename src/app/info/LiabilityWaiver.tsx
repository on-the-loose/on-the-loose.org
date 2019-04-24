import React from 'react'
import ReactMarkdown from 'react-markdown'
import css from '@emotion/css'

export default () => {
  const waiver = `_All trip participants, confirmed and not confirmed, have electronically signed the Release and Waiver of Liability:_

  ## RELEASE AND WAIVER OF LIABILITY, ASSUMPTION OF RISK AND INDEMNITY AGREEMENT 
  In consideration for being permitted by the Pomona College ("Pomona") to participate in the Activity, I hereby acknowledge and agree to the following: 
  
  **ELECTIVE PARTICIPATION:** I acknowledge that my participation is elective and voluntary and that my participation is not required by Pomona. As a condition of my participation, I hereby grant Pomona the right to use, for promotional purposes only, any photographs of me taken by Pomona, its employees or agents, during my participation in the Activity. I further understand and agree that Pomona may use (for marketing purposes) any statements or quotes attributed to me in my evaluation of the Activity. 
  
  **RULES AND REQUIREMENTS:** I agree to conduct myself in accordance with Pomona's policies and procedures. I further agree to abide by all the rules and requirements of the Activity. I acknowledge that Pomona has the right to terminate my participation in the Activity if it is determined that my conduct is detrimental to the best interests of the group, my conduct violates any rule of the Activity, or for any other reason in Pomona's discretion. 
  
  **INFORMED CONSENT:** I have been informed of and I understand the various aspects of the Activity. I understand that that there are risks involved in participation in the Activity which include, but are not limited to: travel to and from Activity site via private vehicle, common carrier, and/or Pomona owned vehicle, conditions of facilities, injuries due to condition of equipment, weather conditions, facility conditions, wildlife, negligent first aid operations and there may be other risks not known to me or not reasonably foreseeable to me at this time. In addition, I understand that as a Participant in the Activity, I will engage in physical activities, during which I could sustain serious personal injuries, illness, property damage, or even death. I understand that as a Participant in the Activity I could sustain serious personal injuries, illness, property damage, or even death as a consequence of not only Pomona's actions or inactions, but also the actions, inactions, negligence or fault of others, and that there may be other risks not known to me or not reasonably foreseeable at this time. I further understand and agree that any injury, illness, property damage, disability, or death that I may sustain by any means is my sole responsibility, except for those occurrences due to Pomona's gross negligence or intentional misconduct. 
  
  **RELEASE AND WAIVER OF LIABILITY:** I, on behalf of myself, my personal representatives, heirs, executors, administrators, agents, and assigns, HEREBY RELEASE, WAIVE, DISCHARGE, AND COVENANT NOT TO SUE The Claremont Colleges (Pomona College, Harvey-Mudd College, Claremont McKenna College, Scripps College, Pitzer College, Claremont Graduate University, and the Keck Graduate Institute), its governing board, directors, officers, employees, agents, volunteers, and any students (hereinafter referred to as "Releasees") for any and all liability, including any and all claims, demands, causes of action (known or unknown), suits, or judgments of any and every kind (including attorneys' fees), arising from any injury, property damage or death that I may suffer as a result of my participation in the Activity, REGARDLESS OF WHETHER THE INJURY, DAMAGE OR DEATH IS CAUSED BY THE RELEASEES, UNLESS THE INJURY DAMAGE OR DEATH IS CAUSED BY THE RELEASEES' GROSS NEGLIGENCE OR INTENTIONAL MISCONDUCT, AND REGARDLESS OF WHETHER THE INJURY DAMAGE OR DEATH OCCURS WHILE IN, ON, UPON, OR IN TRANSIT TO OR FROM THE PREMISES WHERE THE ACTIVITY, OR ANY ADJUNCT TO THE ACTIVITY, OCCURS OR IS BEING CONDUCTED. I further agree that the Releasees are not in any way responsible for any injury or damage that I sustain as a result of my own negligent acts. 
  
  **ASSUMPTION OF RISK:** I understand that there are potential dangers incidental to my participation in the Activity, some of which may be dangerous and which may expose me to the risk of personal injuries, property damage, or even death. I understand that these potential risks include, but are not limited to: travel to and from Activity site via private vehicle, common carrier, and/or Pomona owned vehicle, injuries due to condition of equipment, weather conditions, facility conditions, wildlife, negligent first aid operations of Releasees, and other risks that are unknown at this time. In addition, I understand that as a Participant in the Activity, I will engage in physical activities during which I could sustain serious personal injuries, illness, property damage, or even death. I KNOWINGLY AND VOLUNTARILY ASSUME ALL SUCH RISKS, BOTH KNOWN AND UNKNOWN, EVEN IF ARISING FROM THE ACTS OF THE RELEASEES, UNLESS THEY ARISE FROM THE RELEASEES' INTENTIONAL MISCONDUCT OR GROSSLY NEGLIGENCE, and assume full responsibility for my participation in the Activity. 
  
  **INDEMNITY:** I, on behalf of myself, my personal representatives, heirs, executors, administrators, agents, and assigns, agree to hold harmless, defend and indemnify the Releasees from any and all liability, including any and all claims, demands, causes of action (known or unknown), suits, or judgments of any and every kind (including attorneys' fees), arising from any injury, property damage or death that I may suffer as a result of my participation in the Activity, REGARDLESS OF WHETHER THE INJURY, DAMAGE OR DEATH IS CAUSED BY THE RELEASEES OR OTHERWISE, UNLESS THE INJURY DAMAGE OR DEATH IS CAUSED BY THE RELEASEES' GROSS NEGLIGENCE OR INTENTIONAL MISCONDUCT. 
  
  **PERSONAL MEDICAL INSURANCE:** I agree to purchase and maintain during the term of the Activity personal medical insurance. I further acknowledge that I am responsible for the cost of any and all medical and health services I may require as a result of participating in the Activity. 
  
  **CERTIFICATION OF FITNESS TO PARTICIPATE:** I attest that I am physically and mentally fit to participate in the Activity and that I do not have any medical record of history that could be aggravated by my participation in this particular Activity. 
  
  **MEDICAL CONSENT:** I understand and agree that Releasees may not have medical personnel available at the location of the Activity. In the event of any medical emergency, I do authorize and consent to any x-ray examination, anesthetic, medical, dental or surgical diagnosis or treatment, and hospital care that Pomona personnel deem necessary for my safety and protection. I understand and agree that Releasees assume no responsibility for any injury or damage which might arise out of or in connection with such authorized emergency medical treatment. 
  
  **CHOICE OF LAW:** I hereby agree that this Agreement shall be construed in accordance with the laws of the State of California. 
  
  **SEVERABILITY:** If any term or provision of this Agreement shall be held illegal, unenforceable, or in conflict with any law governing this Agreement the validity of the remaining portions shall not be affected thereby. 
  
  By electronically logging in on the OTL website and signing up for this trip, I hereby acknowledge that I have read, understand and will abide by each of the terms and conditions of this Agreement.
`
  return (
    <ReactMarkdown
      source={waiver}
      css={css`
        margin: 2rem auto;
        max-width: 40rem;
        background-color: rgba(247, 242, 237, 0.8);
        box-shadow: 0px 0px 100px 50px rgba(247, 242, 237, 0.8);

        @media (max-width: 750px) {
          margin-top: 2rem;
        }
      `}
    />
  )
}
