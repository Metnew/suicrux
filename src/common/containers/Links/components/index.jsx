// @flow
import React from 'react'
import {Grid, List} from 'semantic-ui-react'
import _ from 'lodash'
import LinksItemComponent from './LinksItemComponent'
import type {LinkItem} from 'types'

type Props = {
	links: Object
}

const LinksComponent = ({links}: Props) => {
	return (
		<Grid stackable>
			<Grid.Column width={16}>
				<List relaxed divided animated>
					{_.map(links, (link: LinkItem, i) => {
						return <LinksItemComponent key={i} item={link} />
					})}
				</List>
			</Grid.Column>
		</Grid>
	)
}

export default LinksComponent
