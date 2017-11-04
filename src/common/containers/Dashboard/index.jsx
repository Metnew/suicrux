// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import DashboardComponent from './components'
import type {GlobalState} from 'reducers'

type Props = any

class Dashboard extends Component {
	props: Props
	render () {
		return (
			<div>
				<Helmet>
					<title>Suicrux:Dashboard</title>
				</Helmet>
				<DashboardComponent />
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	return {}
}

function mapDispatchToProps (dispatch) {
	return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
