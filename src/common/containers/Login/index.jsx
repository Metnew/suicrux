// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {LOGIN_AUTH, LOGIN_AUTH_PENDING} from 'actions/auth'
import LoginComponent from './components'
import {getAuthState} from 'selectors'
import type {GlobalState} from 'reducers'

type Props = {
	login: () => void,
	errors: Object
}
class Login extends Component {
	props: Props

	render () {
		const {login, errors} = this.props
		const props = {login, errors}
		return <LoginComponent {...props} />
	}
}

function mapStateToProps (state: GlobalState) {
	const authState = getAuthState(state)
	const {errors} = authState
	return {
		errors
	}
}

const mapDispatchToProps = dispatch => ({
	login (data) {
		dispatch(LOGIN_AUTH(data))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
