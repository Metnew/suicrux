import React, {Component} from 'react'
import PropTypes from 'prop-types'
// Item, Label, Divider,
import {Card, Icon, Image} from 'semantic-ui-react'

class UsersItemComponent extends Component {
	static propTypes = {
		user: PropTypes.object
	}

	render () {
		const {user} = this.props
		return (
			<Card>
				<Image alt={`${user.name}`} src={require('images/daniel.jpg')}/>
				<Card.Content>
					<Card.Header>
						{user.name}
					</Card.Header>
					<Card.Meta>
						{user.email}
					</Card.Meta>
					<Card.Description>
						{user.company.catchPhrase}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<a>
						<Icon name="user"/>
						{user.username}
					</a>
				</Card.Content>
			</Card>
		)
	}
}

export default UsersItemComponent
