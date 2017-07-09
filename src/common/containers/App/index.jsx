import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, matchPath} from 'react-router'
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {Header, Sidebar, Footer} from 'components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {LOGOUT_AUTH} from 'actions/auth'
import {appRouting} from 'routing'
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
    // react-router `withRouter` props
    location: PropTypes.object,
    history: PropTypes.object,

    // sidebarOpened can force component to re-render
    sidebarOpened: PropTypes.bool,
    closeSidebar: PropTypes.func,
    // isLoggedIn can force component to re-render
    isLoggedIn: PropTypes.bool,
    handleWindowResize: PropTypes.func,
    logout: PropTypes.func,
    checkAuthLogic: PropTypes.func,
    toggleSidebar: PropTypes.func,
    // isMobile can force component to re-render
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
    const {handleWindowResize, isLoggedIn} = this.props
    window.addEventListener('resize', handleWindowResize)
    this.checkAppAuthLogic(isLoggedIn)
  }

  /**
   * Checks that user is still allowed to visit path after props changed
   * @param  {Object} nextProps
   */
  componentWillReceiveProps (nextProps) {
    this.checkAppAuthLogic(nextProps.isLoggedIn)
  }

  /**
     * Check that user is allowed to visit route
     * @param  {Bool} loggedIn state.auth.loggedIn, current prop
     * @return {Null} Nothing
     */
  checkAppAuthLogic (loggedIn) {
    const {location, checkAuthLogic} = this.props
    const path = location.pathname
    checkAuthLogic(path, loggedIn)
  }

  /**
   * returns routing for sidebar menu
   * @return {Array} array of routes that will be rendered in sidebar menu
   */
  getSidebarRouting () {
    const sidebarRouting = appRouting.filter(a => a.sidebarVisible).map(a => {
      const {path, name, icon, external, strict, exact} = a
      const b = {path, name, icon, external, strict, exact}
      return b
    })
    return sidebarRouting
  }

  /**
  * returns title for header
  * @param  {String} pathname - location.pathname
  * @return {String} page title
  */
  getPageTitle (pathname) {
    const matchedRoutes = appRouting.filter(a => matchPath(pathname, a))
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

    // routing for sidebar menu
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
      active: true,
      onClick: closeSidebar
    }

    // FIXME: ASAP: remove !isLoggedIn, replace it with variable from state.layout
    // {/* XXX: There is an issue with props and styled-components, so we're using .extend and re-render the component when isMobile/isLoggedIn change triggered. Using `style` attribute isn't a good solution.
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
            <Header {...headerProps} />
            <MainLayout>
              <MainContent>
                <MainContainer id="main-container">
                  {children}
                </MainContainer>
              </MainContent>
              <Footer />
            </MainLayout>
          </SidebarSemanticPusherStyledPatch>
          {/* NOTE:  show dimmer only if:
						//1. isLoggedIn, elsewhere sidebar isn't visible
					// 2. if sidebar is opened  */}
          {isLoggedIn && sidebarOpened && <StyledDimmer {...dimmerProps} />}
        </SidebarSemanticPushableStyled>
      </PageLayout>
    )
  }
}

function mapStateToProps (state) {
  const {sidebarOpened, isMobile, isMobileXS, isMobileSM} = state.layout
  return {
    sidebarOpened,
    isMobile,
    isMobileXS,
    isMobileSM,
    isLoggedIn: state.me.auth.loggedIn
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
