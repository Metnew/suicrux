import styled from 'styled-components'
import {Form, Grid, Message, Button} from 'semantic-ui-react'

export { Form, Grid }

export const StyledGrid = styled(Grid).attrs({
	centered: true,
	relaxed: true,
	stretched: true,
	columns: 1
})`
	text-align: center !important;
	flex-grow: 1 !important;
	align-items: center !important;
`

export const GridColumn = styled(Grid.Column).attrs({
	tablet: 10,
	mobile: 16,
	computer: 6
})``

export const ErrorMessage = styled(Message).attrs({
	error: true,
	header: 'Invalid credentials',
	content: 'Your credentials are invalid.'
})``

function isPass (type) {
	return type === 'password'
}

export const FormInput = styled(Form.Input).attrs({
	label: ({type}) => isPass(type) ? 'Password' : 'Username',
	placeholder: ({type}) => isPass(type) ? 'Password' : 'Username',
	name: ({type}) => isPass(type) ? 'password' : 'username',
	autoComplete: ({type}) => isPass(type) ? 'current-password' : 'off'
})``

export const LoginButton = styled(Button).attrs({
	content: 'Login',
	icon: 'sign in'
})``

export const LoginButtonDiv = styled.div`
	text-align: center !important;
`
