/**
 * @flow
 */
import React from 'react'
import {Route} from 'react-router-dom'
import RouteAuth from 'components/addons/RouteAuth'
import {createBrowserHistory, createMemoryHistory} from 'history'
import type {RouteItem} from 'types'

const getHistory = () => {
	if (process.env.BROWSER) {
		return createMemoryHistory()
	}
	return createBrowserHistory()
}

export const history = getHistory()

const loadLazyComponent = (url: string) => async () => {
	// NOTE: there isn't any duplication here
	// Read Webpack docs about code-splitting for more info.
	if (process.env.BROWSER) {
		const loadComponent = await import(/* webpackMode: "lazy-once", webpackChunkName: "lazy-containers" */ `containers/${url}/index.jsx`)
		return loadComponent
	}
	const loadComponent = await import(/* webpackMode: "eager", webpackChunkName: "lazy-containers" */ `containers/${url}/index.jsx`)
	return loadComponent
}

export const routes: Array<RouteItem> = [
	{
		path: '/',
		exact: true,
		lazy: true,
		icon: 'newspaper',
		name: 'Dashboard',
		sidebarVisible: true,
		tag: RouteAuth,
		component: loadLazyComponent('Dashboard')
	},
	{
		path: '/users',
		name: 'Users',
		exact: true,
		lazy: true,
		icon: 'users',
		sidebarVisible: true,
		tag: RouteAuth,
		component: loadLazyComponent('Users')
	},
	{
		external: true,
		path: 'https://github.com/Metnew/react-semantic.ui-starter',
		icon: 'github',
		name: 'Github',
		sidebarVisible: true
	},
	{
		path: '/auth',
		name: 'Auth',
		lazy: true,
		tag: Route,
		component: loadLazyComponent('Login')
	},
	{
		path: '/users/:id',
		name: 'User',
		lazy: true,
		exact: true,
		tag: RouteAuth,
		component: loadLazyComponent('UserItem')
	}
]
