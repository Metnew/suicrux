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
	store: Object,
	SSR: {
		context: Object,
		location: string
	},
	history: Object,
	routes: mixed // RouteItem[]
}

const configureRootComponent = ({store, SSR, history, routes}: Props) => {
	const props = {store, SSR, history, routes}
	return <Root {...props} />
}

export default configureRootComponent
