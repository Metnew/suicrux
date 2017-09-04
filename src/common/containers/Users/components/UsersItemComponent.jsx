// @flow
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Item, Label, Divider, Statistic} from 'semantic-ui-react'
import {StyledUserItem} from './style'

import type {UserItem} from 'types'
type Props = {
	user: UserItem
}

const UsersItemComponent = ({user}: Props) => {
	const {name, username, address, email, website, phone, id} = user
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

export default UsersItemComponent
