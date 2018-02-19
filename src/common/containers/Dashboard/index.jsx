// @flow
import React from 'react'
import {Helmet} from 'react-helmet'
import {Grid, Header} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'

const Dashboard = () => {
	return (
		<div>
			<Helmet>
				<title>Suicrux:Dashboard</title>
			</Helmet>
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						<Header as="h1">Suicrux</Header>
						<Header as="h2">Ultimate universal starter with lazy-loading, SSR and i18n</Header>
						<p>
							<FormattedMessage id="Dashboard.p" />
						</p>
						<p>
							<FormattedMessage id="Dashboard.p1" />
						</p>
						<p>
							<FormattedMessage id="Dashboard.p2" />
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}

export default Dashboard
