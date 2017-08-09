import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Switch, Redirect} from 'react-router-dom'
import LazyLoad from 'components/addons/LazyLoad'

/**
 * Returns application routing with protected by AuthCheck func routes
 * @desc This function returns JSX, so we can think about it as "stateless component"
 * @param {Function} authCheck checks is user logged in
 */
export default class RoutingWrapper extends Component {
	static propTypes = {
		routes: PropTypes.array,
		store: PropTypes.object
	}

	/**
    * Checks Auth logic. Is user allowed to visit certain path?
    * @param  {String} path next path to visit
    * @return {Bool} is user allowed to visit next location?
    * check RouteAuth component.
    */
	authCheck (path) {
		const {store} = this.props
		const {isLoggedIn} = store.getState().me.auth
		const authPath = '/auth'
		const allowedToVisitPath = [authPath]

		if (isLoggedIn && path === authPath) {
			return false
		} else if (!isLoggedIn && !allowedToVisitPath.includes(path)) {
			return false
		}
		return true
	}

	render () {
		const {routes} = this.props
		const onlyRoutes = routes.filter(
			a => a.tag || a.component || a.lazy || !a.external
		)
		// render components that are inside Switch (main view)
		const routesRendered = onlyRoutes.map((a, i) => {
			// get tag for Route.
			// is it "RouteAuth" `protected route` or "Route"?
			const Tag = a.tag
			const {path, exact, strict, component, lazy} = a
			// can visitor access this route?
			// this function determinates is user allowed to visit route
			const canAccess = ::this.authCheck
			// select only props that we need
			const b = {path, exact, strict, canAccess}

			if (lazy) {
				const routeToRenderLazy = (
					<Tag {...b} key={i}>
						<LazyLoad component={component} />
					</Tag>
				)
				return routeToRenderLazy
			}

			// it can be Route or RouteAuth
			return <Tag key={i} {...b} component={component} />
		})

		return (
			<Switch>
				{routesRendered}
				<Redirect to="/" />
			</Switch>
		)
	}
}
