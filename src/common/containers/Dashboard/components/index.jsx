// @flow
import React, {Component} from 'react'
import {Card, Grid} from 'semantic-ui-react'
import _ from 'lodash'
import DashboardCardComponent from './DashboardCardComponent'
import type {PostItem} from 'types'

type Props = {
	posts: Object,
	postsLoaded: boolean,
	postsLoading: boolean,
	count: number
}

export default class DashboardComponent extends Component {
	props: Props

	shouldComponentUpdate (nextProps: Props) {
		const {posts} = this.props
		const nextPosts = nextProps.posts
		return !_.isEqual(posts, nextPosts)
	}

	render () {
		const {posts, postsLoaded} = this.props

		return (
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						{postsLoaded &&
							<Card.Group itemsPerRow={3} doubling stackable>
								{_.map(posts, (post: PostItem, i) =>
									<DashboardCardComponent {...post} key={i} />
								)}
							</Card.Group>}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}
