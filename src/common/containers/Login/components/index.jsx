// @flow
import React, {Component} from 'react'
import {Helmet} from 'react-helmet'
import _ from 'lodash'
import {
	Form,
	Grid,
	StyledGrid,
	GridColumn,
	ErrorMessage,
	FormInput,
	LoginButton,
	LoginButtonDiv
} from './styles.js'

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

	handleSubmit = (e: Event) => {
		e.preventDefault()
		const {username, password} = this.state
		this.props.login({username, password})
	}

	handleChange = (e: Event, {name, value}) => {
		this.setState({
			[name]: value
		})
	}

	render () {
		const {username, password} = this.state
		// Error from server
		const {errors} = this.props
		const loginFormProps = {error: !_.isEmpty(errors)}

		return (
			<StyledGrid>
				<Helmet>
					<title>Suicrux:Login</title>
				</Helmet>
				<Grid.Row>
					<GridColumn>
						{/* Consider using Redux-Form */}
						<Form onSubmit={this.handleSubmit} {...loginFormProps}>
							{errors && <ErrorMessage />}
							<FormInput
								value={username}
								onChange={this.handleChange}
							/>
							<FormInput
								type="password"
								value={password}
								onChange={this.handleChange}
							/>
							<LoginButtonDiv>
								<LoginButton />
							</LoginButtonDiv>
						</Form>
					</GridColumn>
				</Grid.Row>
			</StyledGrid>
		)
	}
}

export default LoginComponent
