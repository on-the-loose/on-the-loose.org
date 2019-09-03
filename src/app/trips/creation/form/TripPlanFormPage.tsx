import React from 'react'
import Form, { FormProps } from 'antd/lib/form'
import { Input, Select } from 'antd'

export interface Props {
  initialData?: any
  parentForm: FormProps['form']
  isDisplayed: boolean
}

export default (props: Props) => {
  const { getFieldDecorator } = props.parentForm

  return (
    <div style={{ display: !props.isDisplayed && 'none' }}>
      <Form.Item label="1. What is the location and/or trailhead name of your destination?">
        {getFieldDecorator('planning_info.location', {
          initialValue: props.initialData && props.initialData.planning_info.location,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="2. Do you need a special permit to visit this location? How will you obtain it?">
        {getFieldDecorator('planning_info.permit', {
          initialValue: props.initialData && props.initialData.planning_info.permit,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="3. What activities will you be doing? (Hiking, kayaking, surfing, climbing, etc.)">
        {getFieldDecorator('planning_info.activities', {
          initialValue: props.initialData && props.initialData.planning_info.activities,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="4. What are the potential risks associated with this activity?">
        {getFieldDecorator('planning_info.risks', {
          initialValue: props.initialData && props.initialData.planning_info.risks,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="5. How do you plan to manage or eliminate these risks?">
        {getFieldDecorator('planning_info.risk_management', {
          initialValue: props.initialData && props.initialData.planning_info.risk_management,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="6. Will this be a backcountry trip? (2 hours or more away from definitive medical care)">
        {getFieldDecorator('planning_info.backcountry', {
          initialValue: props.initialData && props.initialData.planning_info.backcountry,
          rules: [{ required: true, message: 'This field is required.' }]
        })(
          <Select>
            <Select.Option value="Yes">Yes</Select.Option>
            <Select.Option value="No">No</Select.Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item label="7. If Yes, which leaders have Wilderness First Aid certification or above?">
        {getFieldDecorator('planning_info.wfa_wfr', {
          initialValue: props.initialData && props.initialData.planning_info.wfa_wfr,
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="8. If this is not a backcountry trip, which leaders have a current CPR/FirstAid cert from American Red Cross, American Heart Association, or equivalent?">
        {getFieldDecorator('planning_info.first_aid', {
          initialValue: props.initialData && props.initialData.planning_info.first_aid,
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="9. Have any of the leaders been in this location before?">
        {getFieldDecorator('planning_info.been_before', {
          initialValue: props.initialData && props.initialData.planning_info.been_before,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="10. Do you have a planned evacuation route for emergencies?">
        {getFieldDecorator('planning_info.evacuation', {
          initialValue: props.initialData && props.initialData.planning_info.evacuation,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="11. Approximately how much is your trip going to request reimbursement through OTL? (Reimbursements include gas ($0.15/mile up to 300 miles), campsites, permits, park entrance fees) ">
        {getFieldDecorator('planning_info.reimbursement', {
          initialValue: props.initialData && props.initialData.planning_info.reimbursement,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="12. How much is your trip going to cost per participant? ">
        {getFieldDecorator('planning_info.cost_per_person', {
          initialValue: props.initialData && props.initialData.planning_info.cost_per_person,
          rules: [{ required: true, message: 'This field is required.' }]
        })(<Input />)}
      </Form.Item>
      <p>If hiking, please complete the following questions:</p>
      <Form.Item label="13. How many total miles are you planning_info to complete during your hike?">
        {getFieldDecorator('planning_info.miles', {
          initialValue: props.initialData && props.initialData.planning_info.miles,
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="14. Do you have a reliable water source along the way?">
        {getFieldDecorator('planning_info.water', {
          initialValue: props.initialData && props.initialData.planning_info.water,
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="15. Do you have a turnaround time for your hike? When?">
        {getFieldDecorator('planning_info.turnaround_time', {
          initialValue: props.initialData && props.initialData.planning_info.turnaround_time,
          rules: [{ required: false }]
        })(<Input />)}
      </Form.Item>
    </div>
  )
}
