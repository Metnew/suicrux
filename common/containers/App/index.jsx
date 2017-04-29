import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
// Accessing PropTypes via the main React package is deprecated.
// Use the prop-types package from npm instead.
import PropTypes from 'prop-types'
import {push} from 'react-router-redux'
import {Dimmer, Sidebar as SidebarSemantic, Container} from 'semantic-ui-react'
import {Header, Sidebar, Footer} from 'components'
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
    // match can force component to re-render
    match: PropTypes.object,

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

  // XXX: fix it, I'm tired of this.
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
    window.addEventListener('resize', handleWindowResize)
    this.checkAppAuthLogic(isLoggedIn)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     return !_.isEqual(this.props, nextProps) && !_.isEqual(nextState, this.state)
  // }

  /**
     * Call checkAuthLogic
     * @param  {Bool} loggedIn state.auth.loggedIn, current prop
     * @return {Bool} Nothing
     */
  checkAppAuthLogic (loggedIn) {
    let {location, checkAuthLogic} = this.props
    let path = location.pathname
    checkAuthLogic(path, loggedIn)
  }

  componentWillReceiveProps (nextProps) {
    this.checkAppAuthLogic(nextProps.isLoggedIn)
  }

  render () {
    let {
      children,
      sidebarOpened,
      closeSidebar,
      isLoggedIn,
      logout,
      toggleSidebar,
      location,
      isMobile
    } = this.props

    // must be refactored, if one of your route looks like `/api/users/:id`
    // get currentRoute
    const matchedRoutes = appRouting.filter(a => a.path === location.pathname)
    const currentRoute = matchedRoutes[0] || {}
    // title for Header
    const title = currentRoute.name || '404'
    // routing for sidebar menu
    const sidebarRouting = appRouting.filter(a => a.sidebarVisible).map(a => {
      let {path, name, icon, external, strict, exact} = a
      let b = {path, name, icon, external, strict, exact}
      return b
    })

    let sidebarProps = {
      isMobile,
      logout,
      open: sidebarOpened,
      routing: sidebarRouting
    }

    let headerProps = {
      toggleSidebar,
      title,
      isLoggedIn
    }

    let dimmerProps = {
      active: true,
      onClick: closeSidebar
    }

    return (
      <div className="page-layout">
        <SidebarSemantic.Pushable>
          {isLoggedIn && <Sidebar {...sidebarProps} />}
          <SidebarSemantic.Pusher>
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
          </SidebarSemantic.Pusher>
        </SidebarSemantic.Pushable>
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
      dispatch(push('/auth'))
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
         * @return {[type]}             [description]
         */
    checkAuthLogic: (path, isLoggedIn) => {
      let authPath = '/auth'
      let homePath = '/'
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
