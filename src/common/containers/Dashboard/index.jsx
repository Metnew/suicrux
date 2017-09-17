// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Loader} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import DashboardComponent from './components'
import {GET_POSTS} from 'actions/posts'
import {getEntitiesPostsState} from 'selectors'
import type {GlobalState} from 'reducers'

type Props = {
	posts: Object,
	postsLoaded: boolean,
	postsLoading: boolean,
	count: number,
	getPosts: () => void
}

class Dashboard extends Component {
	props: Props
	componentDidMount () {
		this.props.getPosts()
	}

	render () {
		const {posts, postsLoaded, postsLoading, count} = this.props
		return (
			<div>
				<Helmet>
					<title>Noir:Dashboard</title>
				</Helmet>
				{postsLoaded
					? <DashboardComponent
						{...{posts, postsLoaded, postsLoading, count}}
					/>
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const postsState = getEntitiesPostsState(state)
	const postsLoaded = postsState.isLoaded
	const postsLoading = postsState.isLoading
	const posts = postsState.entities
	const {count} = postsState
	return {
		posts,
		postsLoading,
		postsLoaded,
		count
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts () {
			dispatch(GET_POSTS())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
