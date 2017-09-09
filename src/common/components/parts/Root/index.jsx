// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {IntlProvider} from 'react-intl' // as we build ourself via webpack
import {APPLICATION_INIT} from 'actions/common'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import App from 'containers/App'
import RoutingWrapper from 'components/addons/RoutingWrapper'
import {getWindowInnerWidth} from 'const'
import type {RouteItem} from 'types'

const Router = process.env.BROWSER
	? require('react-router-redux').ConnectedRouter
	: require('react-router').StaticRouter

type Props = {
	store: Object,
	SSR: {
		location?: Object,
		context?: Object
	},
	history: any,
	routes: Array<RouteItem>
}

export default class Root extends Component {
	props: Props

	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store} = this.props
		const innerWidth: number = getWindowInnerWidth(window)
		store.dispatch({type: APPLICATION_INIT, payload: {innerWidth}})
	}

	render () {
		const {SSR, store, history, routes} = this.props
		const routerProps = process.env.BROWSER
			? {history}
			: {location: SSR.location, context: SSR.context}
		// key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395

		return (
			<IntlProvider locale="en-US" messages={{}}>
				<Provider store={store} key={Math.random()}>
					<ThemeProvider theme={theme}>
						<Router {...routerProps} key={Math.random()}>
							<App routes={routes}>
								<RoutingWrapper store={store} routes={routes} />
							</App>
						</Router>
					</ThemeProvider>
				</Provider>
			</IntlProvider>
		)
	}
}
