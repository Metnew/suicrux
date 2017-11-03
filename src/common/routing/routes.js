// @flow
import React from 'react'
import {Route} from 'react-router-dom'
import RouteAuth from 'components/addons/RouteAuth'
import {asyncComponent} from 'react-async-component'
import {Loader} from 'semantic-ui-react'
import type {RouteItem} from 'types'

const importCreator = (url: string) => async () => {
	// NOTE: there isn't any duplication here
	// Read Webpack docs about code-splitting for more info.
	if (process.env.BROWSER) {
		const resolve = import(/* webpackMode: "lazy", webpackChunkName: "[request].lazy" */ `containers/${url}/index.jsx`)
		return resolve
	}
	const resolve = import(/* webpackMode: "eager" */ `containers/${url}/index.jsx`)
	return resolve
}

const asyncComponentCreator = url => {
	const resolve = importCreator(url)
	return asyncComponent({
		resolve,
		LoadingComponent () {
			return <Loader>Loading...</Loader>
		}
	})
}

// FIXME: sidebar routes and app routes should be separated!
const routes: Array<RouteItem> = [
	{
		path: '/',
		exact: true,
		icon: 'newspaper',
		name: 'Dashboard',
		sidebarVisible: true,
		tag: RouteAuth,
		component: asyncComponentCreator('Dashboard')
	},
	{
		path: '/links',
		name: 'Links',
		exact: true,
		icon: 'bookmark',
		sidebarVisible: true,
		tag: RouteAuth,
		component: asyncComponentCreator('Links')
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
		tag: Route,
		component: asyncComponentCreator('Login')
	}
]

export default routes
