// @flow
import {Route} from 'react-router-dom'
import RouteAuth from 'components/addons/RouteAuth'
// import Dashboard from 'containers/Dashboard'
// import Login from 'containers/Login'
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

// FIXME: sidebar routes and app routes should be separated!
const routes: Array<RouteItem> = [
	{
		path: '/',
		exact: true,
		icon: 'newspaper',
		name: 'Dashboard',
		sidebarVisible: true,
		lazy: true,
		tag: RouteAuth,
		component: loadLazyComponentFnConstructor('Dashboard')
	},
	{
		path: '/links',
		name: 'Links',
		exact: true,
		lazy: true,
		icon: 'bookmark',
		sidebarVisible: true,
		tag: RouteAuth,
		component: loadLazyComponentFnConstructor('Links')
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
	}
]

export default routes
