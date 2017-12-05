/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {Switch} from 'react-router-dom'
import {getAuthState} from 'selectors'
import _ from 'lodash'
import type {RouteItem} from 'types'

type Props = {
	routesToRender: RouteItem[],
	routes: RouteItem[]
}

const RoutingWrapper = (props: Props) => {
	const {routesToRender} = props
	// render components that are inside Switch (main view)
	const routesRendered = routesToRender.map((a: RouteItem, i) => {
		// Get tag for Route.
		const Tag = a.tag
		return (
			<Tag
				key={i}
				{..._.pick(a, 'component', 'path', 'exact', 'strict', 'to')}
			/>
		)
	})

	return <Switch>{routesRendered}</Switch>
}

function mapStateToProps (state, props) {
	const {routes} = props
	const {isLoggedIn} = getAuthState(state)

	/**
	 * Checks Auth logic. Is user allowed to visit certain path?
	 * @param  {String} path next path to visit
	 * @return {Bool} is user allowed to visit next location?
	 */
	const authCheck = ({path}): boolean => {
		const authPath = '/auth'
		const allowedToVisitPath = [authPath]

		if (isLoggedIn && path === authPath) {
			return false
		} else if (!isLoggedIn && !allowedToVisitPath.includes(path)) {
			return false
		}
		return true
	}

	const onlyRealRoutes = routes.filter(a => a.component)
	const onlyAllowedRealRoutes = onlyRealRoutes.filter(authCheck)
	const onlyRedirects = routes.filter(a => a.to)
	const routesToRender = onlyAllowedRealRoutes.concat(onlyRedirects)

	return {
		routesToRender
	}
}

export default connect(mapStateToProps)(withRouter(RoutingWrapper))
