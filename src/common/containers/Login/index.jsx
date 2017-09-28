// @flow
import React from 'react'
import {connect} from 'react-redux'
import {LOGIN_AUTH} from 'actions/auth'
import LoginComponent from './components'
import {getAuthState} from 'selectors'
import type {GlobalState} from 'reducers'

type Props = {
	login: (data: Object) => void,
	errors: Object
}

const Login = ({login, errors}: Props) => {
	return <LoginComponent login={login} errors={errors} />
}

const mapStateToProps = (state: GlobalState) => {
	const authState = getAuthState(state)
	const {errors} = authState
	return {
		errors
	}
}

const mapDispatchToProps = dispatch => ({
	login (payload) {
		dispatch(LOGIN_AUTH(payload))
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
