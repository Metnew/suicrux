import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, matchPath} from 'react-router'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
// Import main views
import Sidebar from 'components/views/Sidebar'
import Footer from 'components/views/Footer'
import Header from 'components/views/Header'
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

class App extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		// Routes of app passed as props in `Root`
		routes: PropTypes.array.isRequired,
		// React-router `withRouter` props
		location: PropTypes.object,
		history: PropTypes.object,

		// SidebarOpened can force component to re-render
		sidebarOpened: PropTypes.bool,
		closeSidebar: PropTypes.func,
		// IsLoggedIn can force component to re-render
		isLoggedIn: PropTypes.bool,
		handleWindowResize: PropTypes.func,
		logout: PropTypes.func,
		checkAuthLogic: PropTypes.func,
		toggleSidebar: PropTypes.func,
		// IsMobile can force component to re-render
		isMobile: PropTypes.bool,
		isMobileXS: PropTypes.bool,
		isMobileSM: PropTypes.bool
	}

	// XXX: will be fixed one day.
	// shouldComponentUpdate(nextProps) {
	//     let {match, isMobile, isLoggedIn, sidebarOpened} = this.props
	//     let matchSame = _.isEqual(nextProps.match, match)
	//     let isMobileSame = _.isEqual(nextProps.isMobile, isMobile)
	//     let isLoggedInSame = _.isEqual(nextProps.isLoggedIn, isLoggedIn)
	//     let sidebarOpenedSame = _.isEqual(nextProps.sidebarOpened, sidebarOpened)
	//     // return props that can force us aren't the same
	//     return !(matchSame && isMobileSame && isLoggedInSame && sidebarOpenedSame)
	// }

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
		if (process.env.SENTRY_PUBLIC_DSN) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.crossorigin = 'anonymous'
			script.async = true
			script.onload = () => {
				Raven.config(process.env.SENTRY_PUBLIC_DSN).install()
			}
			script.src = 'https://cdn.ravenjs.com/3.16.1/raven.min.js'
			document.body.appendChild(script)
		}

		if (process.env.GA_ID) {
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.async = true
			script.crossorigin = 'anonymous'
			script.onload = () => {
				window.ga =
					window.ga ||
					function () {
						(ga.q = ga.q || []).push(arguments)
					}
				ga.l = Number(new Date())
				ga('create', process.env.GA_ID, 'auto')
				ga('send', 'pageview')
			}
			script.src = 'https://www.google-analytics.com/analytics.js'
			document.body.appendChild(script)
		}
	}

	/**
     * Check that user is allowed to visit route
     * @param  {Bool} isLoggedIn state.auth.me.isLoggedIn, current prop
     * @return {Undefined} Nothing
     */
	checkAppAuthLogic (isLoggedIn) {
		const {location, checkAuthLogic} = this.props
		const path = location.pathname
		checkAuthLogic(path, isLoggedIn)
	}

	/**
   * Returns routing for sidebar menu
   * @return {Array} array of routes that will be rendered in sidebar menu
   */
	getSidebarRouting () {
		const sidebarRouting = this.props.routes.filter(a => a.sidebarVisible).map(a => {
			const {path, name, icon, external, strict, exact} = a
			const b = {path, name, icon, external, strict, exact}
			return b
		})
		return sidebarRouting
	}

	/**
  * Returns title for header
  * @param  {String} pathname - location.pathname
  * @return {String} page title
  */
	getPageTitle (pathname) {
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
		const title = this.getPageTitle(location.pathname)

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
					{isLoggedIn && <Sidebar {...sidebarProps}/>}
					<SidebarSemanticPusherStyledPatch>
						<StyledDimmer {...dimmerProps}/>
						<Header {...headerProps}/>
						<MainLayout>
							<MainContent>
								<MainContainer id="main-container">
									{children}
								</MainContainer>
							</MainContent>
							<Footer/>
						</MainLayout>
						{/* </Dimmer.Dimmable> */}
					</SidebarSemanticPusherStyledPatch>
				</SidebarSemanticPushableStyled>
			</PageLayout>
		)
	}
}

function mapStateToProps (state) {
	const {sidebarOpened, isMobile, isMobileXS, isMobileSM} = state.layout
	const {isLoggedIn} = state.me.auth
	return {
		sidebarOpened,
		isMobile,
		isMobileXS,
		isMobileSM,
		isLoggedIn
	}
}

function mapDispatchToProps (dispatch) {
	let resizer
	return {
		closeSidebar: () => {
			dispatch(CLOSE_SIDEBAR())
		},
		logout: () => {
			dispatch(LOGOUT_AUTH())
		},
		toggleSidebar: () => {
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
		checkAuthLogic: (path, isLoggedIn) => {
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
