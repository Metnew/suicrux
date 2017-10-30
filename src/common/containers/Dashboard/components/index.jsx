// @flow
import React, {Component} from 'react'
import {Grid, Header} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'

class DashboardComponent extends Component {
	render () {
		return (
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						<Header as="h1">
							<FormattedMessage id="Dashboard.h1" />
						</Header>
						<Header as="h2">
							<FormattedMessage id="Dashboard.h2-1" />
						</Header>
						<p>
							<FormattedMessage id="Dashboard.p-1" />
						</p>
						<Header as="h2">
							<FormattedMessage id="Dashboard.h2-2" />
						</Header>
						<p>
							<FormattedMessage id="Dashboard.p-2" />
						</p>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}

export default DashboardComponent
