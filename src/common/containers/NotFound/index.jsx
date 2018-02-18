// @flow
import React from 'react'
import {Header, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {NotFoundLayout} from './style'

const NotFound = () => {
	return (
		<NotFoundLayout>
			<Header as="h2" icon textAlign="center">
				<Icon name="users" circular />
				<Header.Content>404</Header.Content>
				<Header.Subheader>
					<Link to="/">Dashboard lives here</Link>
				</Header.Subheader>
			</Header>
		</NotFoundLayout>
	)
}

export default NotFound
