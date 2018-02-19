// @flow
import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as reduxFormReducer} from 'redux-form'

import {layout} from './layout'
import {links} from './links'

// Root reducer
export default combineReducers({
	layout,
<<<<<<< HEAD
	auth,
=======
>>>>>>> feat/3.0-release
	entities: combineReducers({
		links
	}),
	routing: routerReducer,
	form: reduxFormReducer
})
<<<<<<< HEAD

export type GlobalState = {layout: LayoutState} & {auth: AuthState} & {
		entities: {links: EntitiesLinksState}
	}
=======
>>>>>>> feat/3.0-release
