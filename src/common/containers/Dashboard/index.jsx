// @flow
import React from 'react'
import {Helmet} from 'react-helmet'
import DashboardComponent from './components'

const Dashboard = () => {
	return (
		<div>
			<Helmet>
				<title>Suicrux:Dashboard</title>
			</Helmet>
			<DashboardComponent />
		</div>
	)
}

export default Dashboard
