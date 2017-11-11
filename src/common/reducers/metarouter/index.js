import {matchPath} from 'react-router'
import {LOCATION_CHANGE} from 'react-router-redux'

export const initialState = {}

export const metaRouting = allRoutes => (state = initialState, action) => {
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
