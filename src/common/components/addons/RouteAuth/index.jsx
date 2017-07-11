import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {Loader} from 'semantic-ui-react'

/**
 * Component that protects route from unauthorized users.
 */
class RouteAuth extends Component {
  static propTypes = {
    canAccess: PropTypes.func,
    component: PropTypes.any,
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    lazy: PropTypes.bool
  }

  state = {
    componentLoaded: false,
    componentToRender: null
  }

  componentWillMount () {
    const {lazy, component} = this.props
    if (lazy) {
      this.load()
    } else {
      this.setState({componentLoaded: true, componentToRender: component})
    }
  }

  async load () {
    const {component} = this.props
    const componentToRender = await component()
    this.setState({
      componentLoaded: true,
      componentToRender: componentToRender.default
    })
  }

  render () {
    const {canAccess, path, exact, strict} = this.props
    const {componentLoaded, componentToRender} = this.state
    const routeProps = {
      path,
      exact,
      strict,
      component: componentToRender || null
    }

    if (componentLoaded) {
      return canAccess(path)
        ? <Route {...routeProps} />
        : <Redirect to="/auth" />
    } else {
      return <Loader active>Loading...</Loader>
    }
  }
}

export default RouteAuth
