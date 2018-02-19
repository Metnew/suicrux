// @flow
import React from 'react'
import {createBrowserHistory, createMemoryHistory} from 'history'
import {asyncComponent} from 'react-async-component'
import {Loader, Dimmer, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'
import Dashboard from 'containers/Dashboard'
import Links from 'containers/Links'

function asyncComponentCreator (url) {
	return asyncComponent({
		resolve: () => {
			if (!process.env.BROWSER) {
				// flow-disable-next-line
				return require(`containers/${url}/index.jsx`).default
			}
			// flow-disable-next-line: The parameter passed to import() must be a literal string
			return import(/* webpackChunkName:"[index].[request]" */ `containers/${url}/index.jsx`)
		},
		LoadingComponent () {
			return (
				<Dimmer active>
					<Loader size="large" active>
						Loading page...
					</Loader>
				</Dimmer>
			)
		},
		ErrorComponent () {
			return (
				<Dimmer active>
					<Header inverted as="h2" icon textAlign="center">
						<Icon name="refresh" />
						Refresh
						<Header.Subheader>Got error while loading page.</Header.Subheader>
					</Header>
				</Dimmer>
			)
		},
		autoResolveES2015Default: true,
		env: process.env.BROWSER ? 'browser' : 'node',
		serverMode: 'resolve'
	})
}

function routingFnCreator (useFor) {
	// const AsyncNotFound = asyncComponentCreator('NotFound')
	// Dashboard and Links included in build
	// NotFound(404) is lazy
	const routes: any[] = [
		{
			path: '/',
			exact: true,
			component: Dashboard,
			name: 'Dashboard'
		},
		{
			path: '/links',
			exact: true,
			component: Links,
			name: 'Links'
		},
		{
			component: asyncComponentCreator('NotFound'),
			name: '404'
		}
	]

	const fns = {
		// Returns routing for React-Router
		routing () {
			return routes.map(a => _.pick(a, ['path', 'strict', 'exact', 'component', 'lazy']))
		},
		// Returns `name` + `path`. used in Header
		meta () {
			return routes.map(a => _.pick(a, ['path', 'name', 'exact', 'strict']))
		}
	}

	return fns[useFor]
}

const createRequiredHistory = process.env.BROWSER ? createBrowserHistory : createMemoryHistory

export const getMetaRoutes = routingFnCreator('meta')
export const getRouterRoutes = routingFnCreator('routing')
export const history = createRequiredHistory()
