import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {APPLICATION_INIT} from 'actions'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'
import App from 'containers/App'
import RoutingWrapper from 'components/addons/RoutingWrapper'

const Router = process.env.BROWSER === true
  ? require('react-router-redux').ConnectedRouter
  : require('react-router').StaticRouter

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    SSR: PropTypes.object,
    history: PropTypes.object,
    routes: PropTypes.array
  }

  static defaultProps = {
    SSR: {}
  }

  componentWillMount () {
    const {store} = this.props
    store.dispatch({type: APPLICATION_INIT})
  }
  /**
     * Checks Auth logic. Is user allowed to visit certain path?
     * @param  {String} path next path to visit
     * @return {Bool} is user allowed to visit next location?
     * check RouteAuth component.
     */
  authCheck (path) {
    const {store} = this.props
    const {loggedIn} = store.getState().me.auth
    const authPath = '/auth'
    const allowedToVisitPath = [authPath]
    if (loggedIn && path === authPath) {
      return false
    } else if (!loggedIn && !allowedToVisitPath.includes(path)) {
      return false
    }
    return true
  }

  render () {
    const {SSR, store, history, routes} = this.props
    const routerProps = process.env.BROWSER === true
      ? {history}
      : {location: SSR.location, context: SSR.context}
    // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
    return (
      <Provider store={store} key={Math.random()}>
        <Router {...routerProps} key={Math.random()}>
          <ThemeProvider theme={theme}>
            <App>
              <RoutingWrapper routes={routes} authCheck={::this.authCheck}/>
            </App>
          </ThemeProvider>
        </Router>
      </Provider>
    )
  }
}
