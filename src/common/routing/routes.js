// @flow
import {Route} from 'react-router-dom'
import RouteAuth from 'components/addons/RouteAuth'
import type {RouteItem} from 'types'

const loadLazyComponentFnConstructor = (url: string) => async () => {
	// NOTE: there isn't any duplication here
	// Read Webpack docs about code-splitting for more info.
	if (process.env.BROWSER) {
		const loadComponent = await import(/* webpackMode: "lazy", webpackChunkName: "[request].lazy" */ `containers/${url}/index.jsx`)
		return loadComponent
	}
	const loadComponent = await import(/* webpackMode: "eager" */ `containers/${url}/index.jsx`)
	return loadComponent
}

const routes: Array<RouteItem> = [
	{
		path: '/',
		exact: true,
		lazy: true,
		icon: 'newspaper',
		name: 'Dashboard',
		sidebarVisible: true,
		tag: RouteAuth,
		component: loadLazyComponentFnConstructor('Dashboard')
	},
	{
		path: '/users',
		name: 'Users',
		exact: true,
		lazy: true,
		icon: 'users',
		sidebarVisible: true,
		tag: RouteAuth,
		component: loadLazyComponentFnConstructor('Users')
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
		component: loadLazyComponentFnConstructor('Login')
	},
	{
		path: '/users/:id',
		name: 'User',
		lazy: true,
		exact: true,
		tag: RouteAuth,
		component: loadLazyComponentFnConstructor('UserItem')
	}
]

export default routes
