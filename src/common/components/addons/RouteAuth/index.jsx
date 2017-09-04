/**
 * @flow
 */
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

/**
 * Component that protects route from unauthorized users.
 */

type Props = {
	canAccess: string => boolean,
	path: string
}

const RouteAuth = (props: Props) => {
	const {canAccess, path} = props
	return canAccess(path) ? <Route {...props} /> : <Redirect to="/auth" />
}

export default RouteAuth
