/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
<<<<<<< HEAD
import {push} from 'react-router-redux'
=======
>>>>>>> feat/3.0-release
// Import main views
import Sidebar from 'components/Sidebar'
import Footer from 'components/Footer'
import Header from 'components/Header'
// Import actions
import {TOGGLE_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
<<<<<<< HEAD
import {getAuthState, getLayoutState, getWindowInnerWidth, getLayoutMobileStatuses} from 'selectors'
=======
import {getLayoutState, getLayoutMobileStatuses} from 'selectors'
>>>>>>> feat/3.0-release
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
<<<<<<< HEAD
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

=======
	handleWindowResize: Function,
	isMobile: boolean
}

class App extends Component<Props> {
>>>>>>> feat/3.0-release
	componentDidMount () {
		if (process.env.BROWSER && process.env.SENTRY_PUBLIC_DSN) {
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

<<<<<<< HEAD
		if (process.env.BROWSER && process.env.GA_ID) {
=======
		if (process.env.GA_ID) {
			const {location: {search, pathname}} = this.props
>>>>>>> feat/3.0-release
			ReactGA.initialize(process.env.GA_ID)
			ReactGA.pageview(pathname + search)
		}
	}

<<<<<<< HEAD
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
=======
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
>>>>>>> feat/3.0-release
			page: true,
			onClick: toggleSidebar
		}
		/** NOTE: There is an issue with props and styled-components,
			So we use custom attributes and handle them inside styled component
			{@link: https://github.com/styled-components/styled-components/issues/439}
		*/

		return (
			<PageLayout>
<<<<<<< HEAD
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
=======
				<SidebarSemanticPushable>
					<Sidebar />
					<SidebarSemanticPusherStyled sidebar_opened={sidebarOpened ? '1' : ''}>
						{/* React throws warnings about no "key" prop in this <div> */}
						<StyledDimmer key={1} {...dimmerProps} />
						<Header />
						<div className="main-layout">
							<main className="main-content">
								<Container className="main-container">{children}</Container>
>>>>>>> feat/3.0-release
								<Footer />
							</main>
						</div>
					</SidebarSemanticPusherStyled>
				</SidebarSemanticPushable>
			</PageLayout>
		)
	}
}

<<<<<<< HEAD
function mapStateToProps (state: GlobalState) {
	const {sidebarOpened} = getLayoutState(state)
	const {isLoggedIn} = getAuthState(state)
=======
const mapStateToProps = (state) => {
	const {sidebarOpened} = getLayoutState(state)
>>>>>>> feat/3.0-release
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		sidebarOpened,
<<<<<<< HEAD
		isMobile,
		isLoggedIn
=======
		isMobile
>>>>>>> feat/3.0-release
	}
}

const mapDispatchToProps = (dispatch) => {
	let resizer
	return {
		toggleSidebar () {
<<<<<<< HEAD
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
=======
			dispatch(TOGGLE_SIDEBAR)
>>>>>>> feat/3.0-release
		},
		handleWindowResize () {
			clearTimeout(resizer)
			const innerWidth: number = window.innerWidth
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE(innerWidth)), 85)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
