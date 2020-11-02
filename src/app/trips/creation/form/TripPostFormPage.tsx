import React, { useState } from 'react'
import { Row, Col, Form, Input, DatePicker, InputNumber, AutoComplete } from 'antd'
import usePlacesAutoComplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import imageValidator from 'src/utils/imageValidator'
import moment from 'moment'
import { FormProps } from 'antd/lib/form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const { Option } = AutoComplete

export interface Props {
	initialData?: any
	parentForm: FormProps['form']
	isDisplayed: boolean
}

export default (props: Props) => {
	const { getFieldDecorator } = props.parentForm

	const dates = props.initialData && [
		moment(props.initialData.dates.start.toDate()),
		moment(props.initialData.dates.end.toDate())
	]

	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions
	} = usePlacesAutoComplete({
		requestOptions: {
			componentRestrictions: { country: 'us' }
		},
		debounce: 200
	})
	const handleInput = (value: any) => {
		// @Charlie @Simon Type declaration "any" might need to be updated
		// Update the keyword of the input element
		setValue(value)
	}
	const handleSelect = (description: any) => {
		// @Charlie @Simon Type declaration "any" might need to be updated
		// When user selects a place, we can replace the keyword without request data from API
		// by setting the second parameter as "false"
		setValue(description, false)
		clearSuggestions()

		// Get latitude and longitude via utility functions
		getGeocode({ address: description })
			.then(results => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				console.log('📍 Coordinates: ', { lat, lng })
			})
			.catch(error => {
				console.log('😰 Error: ', error)
			})
	}

	return (
		<div style={{ display: !props.isDisplayed && 'none' }}>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item label='Title'>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: 'Enter a trip title' }],
							initialValue: props.initialData && props.initialData.title
						})(<Input placeholder='Give your trip a fun title' />)}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Destination'>
						{/* @Charlie @Simon 
                NOTE! I had to get rid of the 'getFieldDecorator' 
                because it would always through the following warning and no options would display
  
                https://ant.design/components/form/#Form.Item 
                Warning: `getFieldDecorator` will override `value`, 
                so please don't set `value` directly and use `setFieldsValue` to set it. */}
						<AutoComplete
							value={value}
							onSelect={handleSelect}
							onChange={handleInput}
							disabled={!ready}
							placeholder='Where would you like to go?'>
							{status === 'OK' &&
								data.map(({ description }) => (
									<Option key={description} value={description}>
										{description}
									</Option>
								))}
						</AutoComplete>
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Image'>
						{getFieldDecorator('image', {
							initialValue: props.initialData && props.initialData.image,
							rules: [
								{ required: true, message: 'An image is required.' },
								{
									validator: (rule, value, cb) => {
										imageValidator({ url: value })
											.then(() => cb()) // TODO: preview image
											.catch(() => cb(true))
									},
									message: 'Enter a valid image url.'
								}
							]
						})(<Input placeholder="A link to an image that shows where you're going" />)}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label='Dates'>
						{getFieldDecorator('dates', {
							initialValue: dates,
							rules: [{ required: true, message: 'Choose the trip dates' }]
						})(
							<DatePicker.RangePicker
								style={{ width: '100%' }}
								showTime={{
									format: 'h:mm a',
									minuteStep: 15,
									use12Hours: true,
									defaultValue: [moment('10:00', 'HH:mm'), moment('16:00', 'HH:mm')]
								}}
								format='ddd MM/DD h:mm a'
								disabledDate={current => current && current < moment().endOf('day')}
							/>
						)}
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label='Maximum participants'>
						{getFieldDecorator('max_participants', {
							initialValue: props.initialData && props.initialData.max_participants,
							rules: [{ required: true, message: 'Enter a number' }]
						})(<InputNumber style={{ width: '100%' }} />)}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item required label={<span>Description</span>}>
						{getFieldDecorator('description', {
							initialValue: props.initialData ? props.initialData.description : ''
						})(
							<ReactQuill
								modules={{
									toolbar: [
										['bold', 'italic', 'underline'],
										[{ list: 'ordered' }, { list: 'bullet' }],
										['link']
									]
								}}
							/>
						)}
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={16}>
				<Col span={24}>
					<Form.Item label={<span>Packing List</span>}>
						{getFieldDecorator('packing_list', {
							initialValue: props.initialData ? props.initialData.description : ''
						})(
							<ReactQuill
								modules={{
									toolbar: [
										['bold', 'italic', 'underline'],
										[{ list: 'ordered' }, { list: 'bullet' }],
										['link']
									]
								}}
							/>
						)}
					</Form.Item>
				</Col>
			</Row>
		</div>
	)
}
