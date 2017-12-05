// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {IntlProvider, defineMessages, addLocaleData} from 'react-intl'
import {APPLICATION_INIT} from 'actions/common'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import App from 'containers/App'
import RoutingWrapper from 'components/addons/RoutingWrapper'
import {getRouterRoutes} from 'routing'
import type {RouteItem, i18nConfigObject} from 'types'

const Router = process.env.BROWSER
	? require('react-router-redux').ConnectedRouter
	: require('react-router').StaticRouter

type Props = {
	store: Object,
	i18n: i18nConfigObject,
	SSR: {
		location?: Object,
		context?: Object
	},
	history: any,
	routes: Array<RouteItem>
}

export default class Root extends Component<Props> {
	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store, i18n} = this.props
		store.dispatch({type: APPLICATION_INIT})
		addLocaleData(i18n.localeData)
	}

	render () {
		const {SSR, store, history, routes, i18n} = this.props
		const routerProps = process.env.BROWSER
			? {history}
			: {location: SSR.location, context: SSR.context}
		// key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395

		return (
			<IntlProvider
				key={i18n.locale}
				locale={i18n.locale}
				messages={defineMessages(i18n.messages)}
			>
				<Provider store={store} key={Date.now()}>
					<ThemeProvider theme={theme}>
						<Router {...routerProps}>
							<App routes={routes}>
								<RoutingWrapper routes={getRouterRoutes(routes)} />
							</App>
						</Router>
					</ThemeProvider>
				</Provider>
			</IntlProvider>
		)
	}
}
