import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Item, Grid} from 'semantic-ui-react'
import _ from 'lodash'
import UsersItemComponent from './UsersItemComponent'

export default class UsersComponent extends PureComponent {
	static propTypes = {
		users: PropTypes.object.isRequired,
		isUsersLoading: PropTypes.bool.isRequired,
		isUsersLoaded: PropTypes.bool.isRequired,
		usersCount: PropTypes.number.isRequired
	}

	// ShouldComponentUpdate (nextProps) {
	//   const {users} = this.props
	//   const nextUsers = nextProps.users
	//   return !_.isEqual(users, nextUsers)
	// }

	render () {
		// IsUsersLoading
		const {users, isUsersLoaded, usersCount} = this.props
		const noUsers = isUsersLoaded && usersCount === 0

		return (
			<Grid stackable>
				<Grid.Column width={16}>
					{noUsers
						? 'Hm, it looks like there are no items to show you :('
						: <Item.Group divided link>
							{_.map(users, (obj, i) => {
								return <UsersItemComponent key={i} {...obj} />
							})}
						</Item.Group>}
				</Grid.Column>
			</Grid>
		)
	}
}
