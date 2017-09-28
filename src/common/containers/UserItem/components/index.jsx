// @flow
import React from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import type {UserItem} from 'types'

type Props = {
	user: UserItem
}

const UserItemComponent = ({user}: Props) => {
	return (
		<Card>
			<Image alt={`${user.name}`} src={require('images/Logo.svg')} />
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
				{/* This anchor was requested by eslint-a11y. */}
				<a href={`#${user.name}-${user.email}`}>
					<Icon name="user" />
					{user.username}
				</a>
			</Card.Content>
		</Card>
	)
}

export default UserItemComponent
