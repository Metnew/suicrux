import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {ConnectedRouter as Router} from 'react-router-redux'
import {APPLICATION_INIT} from 'actions'
import {ThemeProvider} from 'styled-components'
import theme from 'styles/theme'

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    history: PropTypes.object,
    routes: PropTypes.func
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
    const {store, history, routes} = this.props
    // key={Math.random()} = hack for HMR from https://github.com/webpack/webpack-dev-server/issues/395
    return (
      <Provider store={store} key={Math.random()}>
        <Router history={history} key={Math.random()}>
          <ThemeProvider theme={theme}>
            {routes(::this.authCheck)}
          </ThemeProvider>
        </Router>
      </Provider>
    )
  }
}
