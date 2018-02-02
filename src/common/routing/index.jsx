// @flow
import React from 'react'
import {createBrowserHistory, createMemoryHistory} from 'history'
import {asyncComponent} from 'react-async-component'
import {Loader, Dimmer, Header, Icon} from 'semantic-ui-react'
import _ from 'lodash'

function asyncComponentCreator (url) {
	return asyncComponent({
		// flow-disable-next-line: The parameter passed to import() must be a literal string
		resolve: () =>
			import(/* webpackChunkName:"[index].[request]" */ `containers/${url}/index.jsx`),
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
	const [AsyncDashoard, AsyncLinks, AsyncNotFound] = [
		'Dashboard',
		'Links',
		'NotFound'
	].map(asyncComponentCreator)

	const routes: Array<RouteItem> = [
		{
			path: '/',
			exact: true,
			component: AsyncDashoard,
			name: 'Dashboard'
		},
		{
			path: '/links',
			exact: true,
			component: AsyncLinks,
			name: 'Links'
		},
		{
			component: AsyncNotFound,
			name: '404'
		}
	]

	const fns = {

		// Returns routing for React-Router
		routing (x = routes) {
			return x
				.map(a =>
					_.pick(a, ['path', 'strict', 'exact', 'component'])
				)
		},
		// Returns `meta` + path. used in Header
		meta (x = routes) {
			return x
				.map(a => _.pick(a, ['path', 'name']))
		}
	}

	return fns[useFor]
}

const createRequiredHistory = process.env.BROWSER
	? createBrowserHistory
	: createMemoryHistory

export const getMetaRoutes = routingFnCreator('meta')
export const getRouterRoutes = routingFnCreator('routing')
export const history = createRequiredHistory()
