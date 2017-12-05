// @flow
import React, {Component} from 'react'
import {
	Form,
	Message,
	Button,
	Label,
	Input as InputComponent
} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'
import {LOGIN_AUTH} from 'actions/auth'
import type {FormProps} from 'redux-form'

type Props = {
	login: (data: Object) => void
} & FormProps

class LoginComponent extends Component<Props, State> {
	render () {
		/* By default we use https://github.com/erikras/redux-form
			Probably, you'll need: https://github.com/ckshekhar73/react-semantic-redux-form/blob/master/src/index.js
			(don't install, better copy sources to the project)
		*/
		const InputField = ({
			input,
			label,
			labelText = null,
			required,
			meta: {touched, error},
			...rest
		}: any) => (
			<Form.Field error={!!(touched && error)} required={required}>
				<label htmlFor={rest.id || rest.name || ''}>{label}</label>
				<InputComponent
					label={labelText}
					required={required}
					{...input}
					{...rest}
				/>
				{touched && error ? (
					<Label basic color="red" pointing>
						{error}
					</Label>
				) : null}
			</Form.Field>
		)

		const fields = [
			{
				name: 'non_field_errors',
				component ({meta: {error}}) {
					return error ? (
						<Message error>
							<Message.Header>{'Login failed :('}</Message.Header>
							<p>{error}</p>
						</Message>
					) : null
				}
			},
			{
				placeholder: 'Username',
				name: 'username',
				label: 'Username',
				component: InputField
			},
			{
				autoComplete: 'current-password',
				placeholder: 'Password',
				type: 'password',
				name: 'password',
				label: 'Password',
				component: InputField
			}
		]
		const {handleSubmit, login, invalid, submitting} = this.props
		return (
			<Form onSubmit={handleSubmit(login)} error={invalid}>
				{fields.map((a, i) => <Field key={i} {...a} />)}
				<div style={{textAlign: 'center'}}>
					<Button content="Login" icon="sign in" loading={submitting} />
				</div>
			</Form>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	async login (data) {
		return dispatch(LOGIN_AUTH(data))
	}
})

export default reduxForm({form: 'LOGIN_FORM'})(
	connect(mapStateToProps, mapDispatchToProps)(LoginComponent)
)
