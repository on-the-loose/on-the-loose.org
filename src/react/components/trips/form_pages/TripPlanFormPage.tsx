import React from 'react'
import Form, { FormProps } from 'antd/lib/form'
import { Input, Select } from 'antd'

export interface Props {
  initialData?: any
  parentForm: FormProps['form']
  isDisplayed: boolean
}

export default function TripPlanFormPage(props: Props) {
  const { getFieldDecorator } = props.parentForm

  return (
    <div style={{ display: !props.isDisplayed && 'none' }}>
      <Form.Item label="What is the location and/or trailhead name of your destination?">
        {getFieldDecorator('planning.location', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Do you need a special permit to visit this location? How will you obtain it?">
        {getFieldDecorator('planning.permit', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="What activities will you be doing? (Hiking, kayaking, surfing, climbing, etc.)">
        {getFieldDecorator('planning.activities', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="What are the potential risks associated with this activity?">
        {getFieldDecorator('planning.risks', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="How do you plan to manage or eliminate these risks?">
        {getFieldDecorator('planning.risk_management', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Will this be a backcountry trip? (2 hours or more away from definitive medical care)">
        {getFieldDecorator('planning.backcountry', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="If Yes, who is (are) the leader or participant with Wilderness First Aid training?">
        {getFieldDecorator('planning.wfa_wfr', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="If No, who is (are) the leader or participant with CPR/FirstAid from American Red Cross, American Heart Association, or equivalent?">
        {getFieldDecorator('planning.first_aid', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Have any of the leaders been in this location before?">
        {getFieldDecorator('planning.been_before', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Do you have a planned evacuation route for emergencies?">
        {getFieldDecorator('planning.evacuation', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Approximately how much is your trip going to request reimbursement through OTL? (Reimbursements include gas ($0.15/mile to 300 miles), campsites, permits, park entrance fees) ">
        {getFieldDecorator('planning.reimbursement', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="How much is your trip going to cost per participant? ">
        {getFieldDecorator('planning.cost_per_person', {
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>

      <p>If hiking, please complete the following questions:</p>
      <Form.Item label="Are you bringing a SPOT device GPS locator?">
        {getFieldDecorator('planning.spot_gps', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="How many total miles are you planning to complete during your hike?">
        {getFieldDecorator('planning.miles', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Do you have a reliable water source along the way?">
        {getFieldDecorator('planning.water', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Do you have a turnaround time for your hike? When?">
        {getFieldDecorator('planning.turnaround_time', {
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
    </div>
  )
}
