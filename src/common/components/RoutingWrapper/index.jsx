// @flow
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

type Props = {
	routes: any[]
}

// separate component for Routing is required for react-hot-loader
// + it's a good practice
class RoutingWrapper extends Component {
	props: Props
	render () {
		return <Switch>{this.props.routes.map((a, i) => <Route {...a} key={i} />)}</Switch>
	}
}

export default RoutingWrapper
