/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {push} from 'react-router-redux'
// Import main views
import Sidebar from 'components/parts/Sidebar'
import Footer from 'components/parts/Footer'
import Header from 'components/parts/Header'
// Import actions
import {TOGGLE_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {getAuthState, getLayoutState, getWindowInnerWidth, getLayoutMobileStatuses} from 'selectors'
import ReactGA from 'react-ga'
// Import styled components
import {
	PageLayout,
	MainLayout,
	MainContent,
	SidebarSemanticPusherStyled,
	SidebarSemanticPushableStyled,
	MainContainer,
	StyledDimmer
} from './style'
import type {RouteItem} from 'types'
import type {GlobalState} from 'reducers'

type Props = {
	children: React$Node,
	// Routes of app passed as props in `Root`
	routes: Array<RouteItem>,
	// React-router `withRouter` props
	location: any,
	history: any,
	// SidebarOpened can force component to re-render
	sidebarOpened: boolean,
	toggleSidebar: Function,
	// IsLoggedIn can force component to re-render
	isLoggedIn: boolean,
	handleWindowResize: Function,
	checkAuthLogic: Function,
	// IsMobile can force component to re-render
	isMobile: boolean
}

class App extends Component <Props> {
	componentWillMount () {
		const {isLoggedIn} = this.props
		if (process.env.BROWSER) {
			const {handleWindowResize} = this.props
			handleWindowResize()
			window.addEventListener('resize', handleWindowResize)
		}
		this.checkAppAuthLogic(isLoggedIn)
	}

	/**
   * Check that user is still allowed to visit path after props changed
   */
	componentWillReceiveProps ({isLoggedIn}: Props) {
		this.checkAppAuthLogic(isLoggedIn)
	}

	componentDidMount () {
		if (process.env.BROWSER && process.env.SENTRY_PUBLIC_DSN) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.crossorigin = 'anonymous'
			script.async = true
			script.onload = () => {
				Raven.config(process.env.SENTRY_PUBLIC_DSN).install()
			}
			script.src = 'https://cdn.ravenjs.com/3.19.1/raven.min.js'
			document.body.appendChild(script)
		}

		if (process.env.BROWSER && process.env.GA_ID) {
			ReactGA.initialize(process.env.GA_ID)
		}
	}

	/**
     * Check that user is allowed to visit route
     * @param  {Boolean} isLoggedIn state.auth.me.isLoggedIn, current prop
     * @return {Void}
     */
	checkAppAuthLogic (isLoggedIn: boolean) {
		const {pathname} = this.props.location
		this.props.checkAuthLogic(pathname, isLoggedIn)
	}

	render () {
		const {
			children,
			sidebarOpened,
			toggleSidebar,
			isLoggedIn,
			isMobile
		} = this.props

		const dimmerProps = {
			active: isLoggedIn && sidebarOpened,
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		return (
			<PageLayout>
				<SidebarSemanticPushableStyled>
					{isLoggedIn && <Sidebar />}
					<SidebarSemanticPusherStyled
						isloggedin={isLoggedIn ? '1' : ''}
						ismobile={isMobile ? '1' : ''}
					>
						<StyledDimmer {...dimmerProps} />
						<Header />
						<MainLayout>
							<MainContent>
								<MainContainer>{children}</MainContainer>
								<Footer />
							</MainContent>
						</MainLayout>
					</SidebarSemanticPusherStyled>
				</SidebarSemanticPushableStyled>
			</PageLayout>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const {sidebarOpened} = getLayoutState(state)
	const {isLoggedIn} = getAuthState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		sidebarOpened,
		isMobile,
		isLoggedIn
	}
}

function mapDispatchToProps (dispatch) {
	let resizer
	return {
		toggleSidebar () {
			dispatch(TOGGLE_SIDEBAR())
		},
		/**
         * Immediately push to homePath('/'), if user is logged.
         * Can be used for other auth logic checks.
         * Useful, because we don't need to dispatch `push(homePath)` action
         * from `Login` container after LOGIN_AUTH_SUCCESS action
         * @param  {String}  path       [current location path]
         * @param  {Boolean} isLoggedIn [is user logged in?]
         */
		checkAuthLogic (path: string, isLoggedIn: boolean) {
			const authPath = '/auth'
			const homePath = '/'
			if (isLoggedIn && path === authPath) {
				dispatch(push(homePath))
			}
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = getWindowInnerWidth(window)
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 100)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
