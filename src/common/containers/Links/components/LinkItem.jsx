// @flow
import React from 'react'
import {List} from 'semantic-ui-react'

type Props = {
	link: string,
	header: string,
	desc: string,
	icon: string
}

const LinkItem = ({header, icon, desc, link}: Props) => {
	return (
		<List.Item>
			<List.Icon name={icon} size="large" verticalAlign="middle" />
			<List.Content>
				<List.Header as="a" href={link}>
					{header}
				</List.Header>
				<List.Description as="a" href={link}>
					{desc}
				</List.Description>
			</List.Content>
		</List.Item>
	)
}

export default LinkItem
