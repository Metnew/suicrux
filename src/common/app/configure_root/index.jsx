/**
 * @flow
 * @desc
 */
import React from 'react'
import Root from 'components/Root'
// global styles
import 'styles/global'

type Props = {
	i18n: Object,
	store: Object, // unconfigured store
	SSR?: {
		// SSR options, see `/server` for more info
		context: Object,
		location: string
	},
	history: Object, // Root node with routing, synced history, store
}

/**
 * Configure Root component.
 */

const configureRootComponent = (props: Props) => {
	if (module.hot) {
		const {store} = props
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('reducers', () => {
			const nextRootReducer = require('reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}
	return <Root {...props} />
}

export default configureRootComponent
