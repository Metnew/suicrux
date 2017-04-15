import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router'

/**
 * Component that protects route from unauthorized users.
 * @type {Object}
 */
class RouteAuth extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        canAccess: PropTypes.bool,
        component: PropTypes.func,
        path: PropTypes.string,
        name: PropTypes.string,
        exact: PropTypes.bool,
        strict: PropTypes.bool
    }

    render() {
        let {canAccess, component, path, name, exact, strict} = this.props
        let routeProps = {
            path,
            component,
            name,
            exact,
            strict
        }

        return canAccess ? <Route {...routeProps} /> : <Redirect to="/auth" />
    }
}

export default RouteAuth
