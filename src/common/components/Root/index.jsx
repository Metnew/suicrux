// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {IntlProvider, defineMessages, addLocaleData} from 'react-intl'
import {APPLICATION_INIT} from 'actions/common'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import RoutingWrapper from 'components/RoutingWrapper'
import App from 'containers/App'

type Props = {
	store: Object,
	i18n: Object,
	SSR: {
		location?: Object,
		context?: Object
	},
	history: any
}

const Router = process.env.BROWSER
	? require('react-router-redux').ConnectedRouter
	: require('react-router').StaticRouter

let initAlready = false
// react-async-bootstrapper renders <Root /> twice, because it's based on react-tree-walker
// react-tree-walker walks in React node tree and resolves promises.
// This behaviour allow apps to make server-side data fetching.
// But this approach has 2 drawbacks:
// Root rendered twice + APPLICATION_INIT dispatched twice
// `initAlready` ensures that `APPLICATION_INIT` was dispatched only once.
class Root extends Component<Props> {
	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store, i18n} = this.props
		if (!initAlready) {
			store.dispatch({type: APPLICATION_INIT})
			addLocaleData(i18n.localeData)
		}
		initAlready = true
	}

	render () {
		if (!initAlready) {
			return null
		}
		const {SSR, store, history, i18n} = this.props
		const routerProps = process.env.BROWSER
			? {history}
			: {location: SSR.location, context: SSR.context}

		return (
			<IntlProvider
				locale={i18n.locale}
				messages={defineMessages(i18n.messages)}>
				{/* key={Math.random()} = hack for HMR
					From https://github.com/webpack/webpack-dev-server/issues/395
				*/}
				<Provider store={store} key={Date.now()}>
					<ThemeProvider theme={theme}>
						<Router {...routerProps}>
							<App>
								<RoutingWrapper />
							</App>
						</Router>
					</ThemeProvider>
				</Provider>
			</IntlProvider>
		)
	}
}

export default Root
