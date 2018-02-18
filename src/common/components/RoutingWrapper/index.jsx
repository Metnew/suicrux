// @flow
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {getRouterRoutes} from 'routing'

// separate component for Routing is required for react-hot-loader
// + it's a good practice
class RoutingWrapper extends Component<Props> {
	render () {
		const routes = getRouterRoutes()
		return (
			<Switch>
				{routes.map((a, i) => <Route {...a} key={i} />)}
			</Switch>
		)
	}
}

export default RoutingWrapper
