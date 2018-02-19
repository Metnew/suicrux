// @flow
import React from 'react'
import {Header, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {NotFoundLayout} from './style'

const NotFound = () => {
	return (
		<NotFoundLayout>
			<Header as="h2" icon textAlign="center">
				<Icon name="warning sign" circular />
				<Header.Content>Thank you Mario!</Header.Content>
				<Header.Subheader>
					<Link to="/">But our princess is in another castle.</Link>
				</Header.Subheader>
			</Header>
		</NotFoundLayout>
	)
}

export default NotFound
