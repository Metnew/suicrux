// @flow
import React, {Component} from 'react'
import {Form, Message, Grid} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
import _ from 'lodash'
import {LoginButton} from './style'
import {TextCenter} from 'styles/base'

type Props = {
	login: (data: Object) => void,
	errors: Object
}

type State = {
	username: string,
	password: string
}

class LoginComponent extends Component {
	props: Props
	state: State = {
		username: '',
		password: ''
	}

	handleSubmit (e: Event) {
		e.preventDefault()
		const {username, password} = this.state
		this.props.login({username, password})
	}

	handleChange (e: Event, {name, value}) {
		this.setState({
			[name]: value
		})
	}

	render () {
		const {username, password} = this.state
		// Error from server
		const {errors} = this.props
		const loginFormProps = {error: !_.isEmpty(errors)}
		// Login btn props
		const loginBtnProps = {
			content: 'Login',
			icon: 'sign in'
		}

		return (
			<Grid
				verticalAlign="middle"
				centered
				columns={1}
				textAlign="center"
				relaxed
			>
				<Helmet>
					<title>Noir:Login</title>
				</Helmet>
				<Grid.Row>
					<Grid.Column tablet={10} mobile={16} computer={6}>
						<Form onSubmit={this.handleSubmit.bind(this)} {...loginFormProps}>
							{errors &&
								<Message
									error
									header={'Invalid credentials'}
									content={'Your credentials are invalid.'}
								/>}
							<Form.Input
								placeholder="Username"
								name="username"
								label="Username"
								value={username}
								onChange={this.handleChange}
							/>
							<Form.Input
								placeholder="Password"
								type="password"
								name="password"
								label="Password"
								value={password}
								onChange={this.handleChange}
							/>
							<TextCenter>
								<LoginButton {...loginBtnProps} />
							</TextCenter>
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default LoginComponent
