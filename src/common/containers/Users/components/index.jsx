// @flow
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Item, Grid} from 'semantic-ui-react'
import _ from 'lodash'
import UsersItemComponent from './UsersItemComponent'

import type {UserItem} from 'types'
type Props = {
	users: Object,
	isUsersLoading: boolean,
	isUsersLoaded: boolean,
	usersCount: number
}
// <FormattedMessage
const UsersComponent = ({users, isUsersLoaded, usersCount}: Props) => {
	// IsUsersLoading
	const noUsers = isUsersLoaded && usersCount === 0

	return (
		<Grid stackable>
			<Grid.Column width={16}>
				{noUsers
					? 'Hm, it looks like there are no items to show :('
					: <Item.Group divided link>
						{_.map(users, (user: UserItem, i) => {
							return <UsersItemComponent key={i} user={user} />
						})}
					</Item.Group>}
			</Grid.Column>
		</Grid>
	)
}

export default UsersComponent
