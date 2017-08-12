import React, {Component} from 'react'
import {Card, Grid} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import DashboardCardComponent from './DashboardCardComponent'

export default class DashboardComponent extends Component {
	static propTypes = {
		posts: PropTypes.object,
		postsLoaded: PropTypes.bool,
		postsLoading: PropTypes.bool,
		count: PropTypes.number
	}

	shouldComponentUpdate (nextProps) {
		const {posts} = this.props
		const nextPosts = nextProps.posts
		return !_.isEqual(posts, nextPosts)
	}

	render () {
		// {count, postsLoading}
		const {posts, postsLoaded} = this.props

		return (
			<Grid columns={1}>
				<Grid.Row centered>
					<Grid.Column width={16}>
						{postsLoaded &&
							<Card.Group itemsPerRow={3} doubling stackable>
								{_.map(posts, (post, i) =>
									<DashboardCardComponent {...post} key={i} />
								)}
							</Card.Group>}
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}
