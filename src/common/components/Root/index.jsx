// @flow
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {IntlProvider, defineMessages, addLocaleData} from 'react-intl'
import Helmet from 'react-helmet'
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

class Root extends Component<Props> {
	static defaultProps = {
		SSR: {}
	}

	componentWillMount () {
		const {store, i18n} = this.props
		const {asyncBootstrapPhase} = this.context
		if (!asyncBootstrapPhase) {
			store.dispatch({type: APPLICATION_INIT})
			addLocaleData(i18n.localeData)
		}
	}

	render () {
		if (this.context.asyncBootstrapPhase) {
			return null
		}
		const {SSR, store, history, i18n} = this.props
		const routerProps = process.env.BROWSER ? {history} : {location: SSR.location, context: SSR.context}

		return (
			<IntlProvider locale={i18n.locale} messages={defineMessages(i18n.messages)}>
				{/* key={Math.random()} = hack for HMR
					From https://github.com/webpack/webpack-dev-server/issues/395
				*/}
				<Provider store={store} key={Date.now()}>
					<ThemeProvider theme={theme}>
						<Router {...routerProps}>
							<App>
								<Helmet>
									<html lang={i18n.lang} />
									<meta charSet="utf-8" />
									<title>Suicrux</title>
									<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
									<meta
										name="description"
										content="Ultimate universal starter with lazy-loading, SSR and i18n"
									/>
									<meta name="theme-color" content="#1b1e2f" />
									<meta name="viewport" content="width=device-width, initial-scale=1.0" />
									<base href="/" />

									<meta name="msapplication-tap-highlight" content="no" />
									<link rel="manifest" href="manifest.json" />
									<noscript
										dangerouslySetInnerHTML={{
											__html: `You are using outdated browser. You can install modern browser here:
										<a href="http://outdatedbrowser.com/">http://outdatedbrowser.com</a>.`
										}}
									/>
								</Helmet>
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
