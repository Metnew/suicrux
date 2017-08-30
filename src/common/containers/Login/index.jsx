import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {LOGIN_AUTH, LOGIN_AUTH_PENDING} from 'actions'
import LoginComponent from './components'

class Login extends Component {
	static propTypes = {
		login: PropTypes.func.isRequired,
		errors: PropTypes.object.isRequired
	}

	render () {
		const {login, errors} = this.props
		const props = {login, errors}
		return <LoginComponent {...props} />
	}
}

function mapStateToProps (state) {
	const {errors} = state.me.auth
	return {
		errors
	}
}

function mapDispatchToProps (dispatch) {
	return {
		login: async data => {
			dispatch({type: LOGIN_AUTH_PENDING})
			const result = await LOGIN_AUTH(data)
			return dispatch(result)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
