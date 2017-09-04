/**
 * @flow
 * @desc
 */
import React from 'react'
import type {RouteItem} from 'routing'
// Redux stuff
import Root from 'components/parts/Root'
// Styled-components's injectGlobal styles
import 'styles/global'

type Props = {
	store: Object, // unconfigured store
	SSR: {
		// SSR options, see `/server` for more info
		context: Object,
		location: string
	},
	history: Object, // Root node with routing, synced history, store
	routes: RouteItem[] // app routing
}

/**
 * Configure Root component.
 */

const configureRootComponent = ({store, SSR, history, routes}: Props) => {
	const props = {store, SSR, history, routes}
	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('reducers', () => {
			const nextRootReducer = require('reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}
	return <Root {...props} />
}

export default configureRootComponent
