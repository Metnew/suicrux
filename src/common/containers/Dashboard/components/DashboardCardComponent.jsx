// @flow
import React, {Component} from 'react'
import {Card, Image, Button} from 'semantic-ui-react'
import type {PostItem} from 'types'

const DashboardCardComponent = ({title, body, id, userId}: PostItem) => {
	return (
		<Card raised>
			<Image alt="Hm, is it an img?" src={require('images/dummy.png')} />
			<Card.Content>
				<Card.Header>
					{title}
				</Card.Header>
				<Card.Meta>
					<span className="date">
						{`Post #${id}`}
					</span>
				</Card.Meta>
				<Card.Description>
					{body}
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<div className="ui two buttons">
					<Button basic color="green" role="button" disabled>
						{`Approve #${id}`}
					</Button>
					<Button basic color="red" role="button" disabled>
						{`Decline`}
					</Button>
				</div>
			</Card.Content>
		</Card>
	)
}

export default DashboardCardComponent
