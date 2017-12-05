// @flow
import React from 'react'
import {List} from 'semantic-ui-react'

import type {LinkItem as LinkItemType} from 'types'
type Props = {
	item: LinkItemType
}

const LinkItem = ({item}: Props) => {
	const {header, icon, desc, link} = item
	return (
		<List.Item>
			<List.Icon name={icon} size="large" verticalAlign="middle" />
			<List.Content>
				<List.Header as="a" href={link}>{header}</List.Header>
				<List.Description as="a" href={link}>{desc}</List.Description>
			</List.Content>
		</List.Item>
	)
}

export default LinkItem
