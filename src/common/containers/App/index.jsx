import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, matchPath} from 'react-router'
// import {Helmet} from 'react-helmet'
// Accessing PropTypes via the main React package is deprecated.
// Use the prop-types package from npm instead.
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {Dimmer, Sidebar, Container} from 'semantic-ui-react'
import {Header, SidebarComponent, Footer} from 'components'
import {CLOSE_SIDEBAR, OPEN_SIDEBAR, WINDOW_RESIZE} from 'actions/layout'
import {LOGOUT_AUTH} from 'actions/auth'
import {appRouting} from 'routing'
import './App.scss'

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
    isMobile: PropTypes.bool
  }

  // XXX: must be fixed.
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
    let {handleWindowResize, isLoggedIn} = this.props
    if (process.env.BROWSER) {
      window.addEventListener('resize', handleWindowResize)
    }
    this.checkAppAuthLogic(isLoggedIn)
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

  componentWillReceiveProps (nextProps) {
    this.checkAppAuthLogic(nextProps.isLoggedIn)
  }

  getSidebarRouting () {
    // routing for sidebar menu
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
      isLoggedIn
    }

    const dimmerProps = {
      active: true,
      onClick: closeSidebar
    }

    return (
      <div className="page-layout">
        <Sidebar.Pushable>
          {isLoggedIn && <SidebarComponent {...sidebarProps} />}
          <Sidebar.Pusher>
            {/* Semantic ui currently(16.04.16) doesn't have closeDimmerOnClick or smth else
            So, instead of it, we can use simple <Dimmer> component */}
            {/* <SidebarSemantic.Pusher dimmed={sidebarOpened}> */}
            <Header {...headerProps} />
            <main>
              <div className="main-content">
                <Container>
                  {children}
                </Container>
              </div>
              <Footer />
            </main>
            {/* show dimmer only if:
              1. isLoggedIn, elsewhere sidebar isn't visible
            2. if sidebar is opened  */}
            {isLoggedIn && sidebarOpened && <Dimmer {...dimmerProps} />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    sidebarOpened: state.layout.sidebarOpened,
    isMobile: state.layout.isMobile,
    isLoggedIn: state.auth.loggedIn
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
      resizer = setTimeout(() => dispatch(WINDOW_RESIZE()), 100)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
