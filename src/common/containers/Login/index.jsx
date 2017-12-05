// @flow
import React from 'react'
import LoginForm from './components/LoginForm'
import {Helmet} from 'react-helmet'
import {Grid} from 'semantic-ui-react'

const Login = ({login, errors}: Props) => {
	return (
		<Grid
			verticalAlign="middle"
			centered
			columns={1}
			textAlign="center"
			relaxed
			stretched
			style={{flexGrow: 1}}
		>
			<Helmet>
				<title>Suicrux:Login</title>
			</Helmet>
			<Grid.Row>
				<Grid.Column tablet={10} mobile={16} computer={6}>
					<LoginForm />
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default Login
