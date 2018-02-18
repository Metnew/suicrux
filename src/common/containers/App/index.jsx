/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// Import main views
import Sidebar from 'components/Sidebar'
import Footer from 'components/Footer'
import Header from 'components/Header'
// Import actions
import {TOGGLE_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {getLayoutState, getWindowInnerWidth, getLayoutMobileStatuses} from 'selectors'
import ReactGA from 'react-ga'
// Import styled components
import {PageLayout, SidebarSemanticPusherStyled, SidebarSemanticPushable, StyledDimmer} from './style'
import {Container} from 'semantic-ui-react'
import _ from 'lodash'

type Props = {
	children: React$Node,
	location: any,
	history: any,
	sidebarOpened: boolean,
	toggleSidebar: Function,
	handleWindowResize: Function,
	isMobile: boolean
}

class App extends Component<Props> {
	componentDidMount () {
		if (process.env.SENTRY_PUBLIC_DSN) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.crossorigin = 'anonymous'
			script.async = true
			script.onload = () => {
				Raven.config(process.env.SENTRY_PUBLIC_DSN).install()
			}
			script.src = 'https://cdn.ravenjs.com/3.22.1/raven.min.js'
			document.body.appendChild(script)
		}

		if (process.env.GA_ID) {
			const {location: {search, pathname}} = this.props
			ReactGA.initialize(process.env.GA_ID)
			ReactGA.pageview(pathname + search)
		}
	}

	componentWillReceiveProps ({location: nextLocation}) {
		const {location} = this.props
		if (process.env.GA_ID && !_.isEqual(nextLocation, location)) {
			const {search, pathname} = nextLocation
			ReactGA.pageview(pathname + search)
		}
	}

	componentWillMount () {
		if (process.env.BROWSER) {
			const {handleWindowResize} = this.props
			handleWindowResize()
			window.addEventListener('resize', handleWindowResize)
		}
	}

	render () {
		const {children, sidebarOpened, toggleSidebar, isMobile} = this.props
		const dimmerProps = {
			active: sidebarOpened && isMobile,
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		return (
			<PageLayout>
				<SidebarSemanticPushable>
					<Sidebar />
					<SidebarSemanticPusherStyled sidebar_opened={sidebarOpened ? '1' : ''}>
						<StyledDimmer {...dimmerProps} />
						<Header />
						<div className="main-layout">
							<main className="main-content">
								<Container className="main-container">{children}</Container>
								<Footer />
							</main>
						</div>
					</SidebarSemanticPusherStyled>
				</SidebarSemanticPushable>
			</PageLayout>
		)
	}
}

const mapStateToProps = (state) => {
	const {sidebarOpened} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		sidebarOpened,
		isMobile
	}
}

const mapDispatchToProps = (dispatch) => {
	let resizer
	return {
		toggleSidebar () {
			dispatch(TOGGLE_SIDEBAR)
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = getWindowInnerWidth(window)
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 100)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
