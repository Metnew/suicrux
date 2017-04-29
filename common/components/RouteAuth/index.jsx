import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router'

/**
 * Component that protects route from unauthorized users.
 * @type {Object}
 */
class RouteAuth extends Component {
  static propTypes = {
    canAccess: PropTypes.func,
    component: PropTypes.func,
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool
  }

  render () {
    let {canAccess, component, path, exact, strict} = this.props
    let routeProps = {
      path,
      component,
      exact,
      strict
    }

    return canAccess(path) ? <Route {...routeProps} /> : <Redirect to="/auth" />
  }
}

export default RouteAuth
