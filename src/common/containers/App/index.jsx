/**
 * @flow
 */

import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter, matchPath} from 'react-router'
import {push} from 'react-router-redux'
// Import main views
import Sidebar from 'components/parts/Sidebar'
import Footer from 'components/parts/Footer'
import Header from 'components/parts/Header'
// Import actions
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {LOGOUT_AUTH} from 'actions/auth'
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

type DefaultProps = any
type State = any
type Props = {
	children: React.Node,
	// Routes of app passed as props in `Root`
	routes: any,
	// React-router `withRouter` props
	location: any,
	history: any,
	// SidebarOpened can force component to re-render
	sidebarOpened: boolean,
	closeSidebar: Function,
	// IsLoggedIn can force component to re-render
	isLoggedIn: boolean,
	handleWindowResize: Function,
	logout: Function,
	checkAuthLogic: Function,
	toggleSidebar: Function,
	// IsMobile can force component to re-render
	isMobile: string,
	isMobileXS: boolean,
	isMobileSM: boolean
}

class App extends React.Component<DefaultProps, Props, State> {
	componentWillMount () {
		const {isLoggedIn} = this.props
		if (process.env.BROWSER) {
			const {handleWindowResize} = this.props
			window.addEventListener('resize', handleWindowResize)
		}
		this.checkAppAuthLogic(isLoggedIn)
	}

	/**
   * Checks that user is still allowed to visit path after props changed
   * @param  {Object} nextProps
   */
	componentWillReceiveProps (nextProps) {
		this.checkAppAuthLogic(nextProps.isLoggedIn)
	}

	componentDidMount () {
		// NOTE: uncomment if you use Sentry
		// if (process.env.SENTRY_PUBLIC_DSN) {
		// 	const script = document.createElement('script')
		// 	script.type = 'text/javascript'
		// 	script.crossorigin = 'anonymous'
		// 	script.async = true
		// 	script.onload = () => {
		// 		Raven.config(process.env.SENTRY_PUBLIC_DSN).install()
		// 	}
		// 	script.src = 'https://cdn.ravenjs.com/3.16.1/raven.min.js'
		// 	document.body.appendChild(script)
		// }
		// NOTE: uncomment if you use Google Analytics
		// if (process.env.GA_ID) {
		// 	const script = document.createElement('script')
		// 	script.type = 'text/javascript'
		// 	script.async = true
		// 	script.crossorigin = 'anonymous'
		// 	script.onload = () => {
		// 		window.ga =
		// 			window.ga ||
		// 			function () {
		// 				;(ga.q = ga.q || []).push(arguments)
		// 			}
		// 		ga.l = Number(new Date())
		// 		ga('create', process.env.GA_ID, 'auto')
		// 		ga('send', 'pageview')
		// 	}
		// 	script.src = 'https://www.google-analytics.com/analytics.js'
		// 	document.body.appendChild(script)
		// }
	}

	/**
     * Check that user is allowed to visit route
     * @param  {Boolean} isLoggedIn state.auth.me.isLoggedIn, current prop
     * @return {Void}
     */
	checkAppAuthLogic (isLoggedIn: boolean) {
		const path: string = this.props.location.pathname
		this.props.checkAuthLogic(path, isLoggedIn)
	}

	/**
   * Returns routing for sidebar menu
   * @return {Array} array of routes that will be rendered in sidebar menu
   */
	getSidebarRouting () {
		type Route = {
			path: string,
			name: string,
			icon: string,
			external: boolean,
			strict: boolean,
			exact: boolean
		}

		const sidebarRouting = this.props.routes
			.filter(a => a.sidebarVisible)
			.map((a: Object): Route => {
				const {path, name, icon, external, strict, exact} = a
				const b: Route = {path, name, icon, external, strict, exact}
				return b
			})
		return sidebarRouting
	}

	/**
  * Returns title for header
  * @param  {String} pathname - location.pathname
  * @return {String} page title
  */
	getPageTitle (pathname: string) {
		const matchedRoutes = this.props.routes.filter(a => matchPath(pathname, a))
		const currentRoute = matchedRoutes[0] || {}
		const title = currentRoute.name || '404'
		return title
	}

	render () {
		const {
			children,
			sidebarOpened,
			closeSidebar,
			isLoggedIn,
			logout,
			toggleSidebar,
			location,
			isMobile
		} = this.props

		// Routing for sidebar menu
		const sidebarRouting = this.getSidebarRouting()
		const title: string = this.getPageTitle(location.pathname)

		const sidebarProps = {
			isMobile,
			logout,
			open: sidebarOpened,
			routing: sidebarRouting
		}

		const headerProps = {
			toggleSidebar,
			title,
			isLoggedIn,
			isMobile
		}

		const dimmerProps = {
			//  Dimmed: true,
			active: isLoggedIn && sidebarOpened,
			page: true,
			//  Blurring: true,
			//  page: true,
			onClick: closeSidebar
		}

		// {/* XXX: There is an issue with props and styled-components, so we use .extend and re-render the component when isMobile/isLoggedIn change triggered. Using `style` attribute isn't a good solution.
		//   Please, check: https://github.com/styled-components/styled-components/issues/439 */}
		//   {/* <SidebarSemanticPusherStyled style={SidebarSemanticPusherStyleProps}> */}
		const SidebarSemanticPusherStyledPatch =
			!isMobile && isLoggedIn
				? SidebarSemanticPusherStyled.extend`
						max-width: calc(100% - 150px);
					`
				: SidebarSemanticPusherStyled

		return (
			<PageLayout>
				<SidebarSemanticPushableStyled>
					{isLoggedIn && <Sidebar {...sidebarProps} />}
					<SidebarSemanticPusherStyledPatch>
						<StyledDimmer {...dimmerProps} />
						<Header {...headerProps} />
						<MainLayout>
							<MainContent>
								<MainContainer id="main-container">
									{children}
								</MainContainer>
							</MainContent>
							<Footer />
						</MainLayout>
						{/* </Dimmer.Dimmable> */}
					</SidebarSemanticPusherStyledPatch>
				</SidebarSemanticPushableStyled>
			</PageLayout>
		)
	}
}

type StateToProps = {
	sidebarOpened: boolean,
	isMobile: boolean,
	isMobileXS: boolean,
	isMobileSM: boolean,
	isLoggedIn: boolean
}

function mapStateToProps (state: any): StateToProps {
	const {sidebarOpened, isMobile, isMobileXS, isMobileSM}: any = state.layout
	const {isLoggedIn}: any = state.me.auth
	return {
		sidebarOpened,
		isMobile,
		isMobileXS,
		isMobileSM,
		isLoggedIn
	}
}

function mapDispatchToProps (dispatch: (action: Object) => void) {
	let resizer
	return {
		closeSidebar: (): void => {
			dispatch(CLOSE_SIDEBAR())
		},
		logout: (): void => {
			dispatch(LOGOUT_AUTH())
		},
		toggleSidebar: (): void => {
			dispatch(OPEN_SIDEBAR())
		},
		/**
         * Immediately push to homePath('/'), if user is logged.
         * Can be used for other auth logic checks.
         * Useful, because we don't need to dispatch `push(homePath)` action
         * from `Login` container after LOGIN_AUTH_SUCCESS action
         * @param  {String}  path       [current location path]
         * @param  {Boolean} isLoggedIn [is user logged in?]
         */
		checkAuthLogic: (path: string, isLoggedIn: boolean) => {
			const authPath = '/auth'
			const homePath = '/'
			if (isLoggedIn && path === authPath) {
				dispatch(push(homePath))
			}
		},
		handleWindowResize: () => {
			clearTimeout(resizer)
			resizer = setTimeout(() => dispatch(WINDOW_RESIZE()), 150)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
