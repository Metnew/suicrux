// @flow
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {getRouterRoutes} from 'routing'

// separate component for Routing is required by react-hot-loader
// + it's a good practice
const RoutingWrapper = () => {
	const routes = getRouterRoutes()
	return (
		<Switch>
			{routes.map((a, i) => <Route {...a} key={i} />)}
		</Switch>
	)
}

export default RoutingWrapper
