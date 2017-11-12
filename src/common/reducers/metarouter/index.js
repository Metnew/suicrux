/** @flow
	@file Check `src/common/reducers/index.js` for more info about metaRouting
*/
import {matchPath} from 'react-router'
import {LOCATION_CHANGE} from 'react-router-redux'
import type {RouteItem} from 'types'

type State = {
	currentRoute: RouteItem | Object
}

export const initialState = {
	currentRoute: {}
}

export const metaRouting = (allRoutes: RouteItem[]) => (state: State = initialState, action) => {
	switch (action.type) {
	case LOCATION_CHANGE: {
		const {pathname} = action.payload
		const currentRoute =
				allRoutes.filter(a => matchPath(pathname, a))[0] || {}
		return {
			currentRoute
		}
	}
	default:
		return state
	}
}
