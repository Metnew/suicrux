import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Item, Label, Divider, Statistic} from 'semantic-ui-react'
import {StyledUserItem} from './style'

export default class UsersItemComponent extends Component {
	static propTypes = {
		name: PropTypes.string,
		username: PropTypes.string,
		address: PropTypes.object,
		email: PropTypes.string,
		website: PropTypes.string,
		phone: PropTypes.string,
		id: PropTypes.number,
		item: PropTypes.object
	}

	render () {
		const {name, username, address, email, website, phone, id} = this.props

		return (
			<StyledUserItem as={Link} to={`/users/${id}`}>
				<Statistic floated="left" value={id} label={'User ID'} />
				<Item.Content>
					<Item.Header>
						{`${name} "${username}"`}
					</Item.Header>
					<Item.Meta>
						<span>
							{phone}
						</span>
					</Item.Meta>
					<Item.Description>
						{address.city} {address.street}
					</Item.Description>
					<Item.Extra>
						<Label>
							{email}
						</Label>
						<Label>
							{website}
						</Label>
					</Item.Extra>
				</Item.Content>
				<Divider horizontal />
			</StyledUserItem>
		)
	}
}
