import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'

/**
 * Component that protects route from unauthorized users.
 */
class RouteAuth extends Component {
	static propTypes = {
		canAccess: PropTypes.func,
		path: PropTypes.string
	}

	render () {
		const {canAccess, path} = this.props

		console.log(
			`User has access to "${path}" path: ${canAccess(path) ? 'YES' : 'NO'}`
		)

		return canAccess(path) ? <Route {...this.props} /> : <Redirect to="/auth" />
	}
}

export default RouteAuth
