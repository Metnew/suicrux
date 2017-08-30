import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {APPLICATION_INIT} from 'actions'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import App from 'containers/App'
import RoutingWrapper from 'components/addons/RoutingWrapper'

const Router =
	process.env.BROWSER === true
		? require('react-router-redux').ConnectedRouter
		: require('react-router').StaticRouter

export default class Root extends Component {
	static propTypes = {
		store: PropTypes.object,
		SSR: PropTypes.object,
		history: PropTypes.object,
		routes: PropTypes.array
	}

	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store} = this.props
		store.dispatch({type: APPLICATION_INIT})
	}

	render () {
		const {SSR, store, history, routes} = this.props
		const routerProps =
			process.env.BROWSER === true
				? {history}
				: {location: SSR.location, context: SSR.context}
		// key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
		return (
			<Provider store={store} key={Math.random()}>
				<ThemeProvider theme={theme}>
					<Router {...routerProps} key={Math.random()}>
						<App routes={routes}>
							<RoutingWrapper store={store} routes={routes} />
						</App>
					</Router>
				</ThemeProvider>
			</Provider>
		)
	}
}
