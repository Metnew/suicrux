import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Loader} from 'semantic-ui-react'
import {Helmet} from 'react-helmet'
//
import DashboardComponent from './components'
import {GET_POSTS} from 'actions/posts'

class Dashboard extends Component {
	static propTypes = {
		posts: PropTypes.object,
		postsLoaded: PropTypes.bool,
		postsLoading: PropTypes.bool,
		count: PropTypes.number,
		getPosts: PropTypes.func.isRequired
	}

	componentWillMount () {
		this.props.getPosts()
	}

	render () {
		const {posts, postsLoaded, postsLoading, count} = this.props

		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
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

function mapStateToProps (state) {
	const {posts} = state.entities
	const postsLoaded = posts.isLoaded
	const postsLoading = posts.isLoading
	const items = posts.entities
	const {count} = posts

	return {
		posts: items,
		postsLoading,
		postsLoaded,
		count
	}
}

function mapDispatchToProps (dispatch) {
	return {
		getPosts: async () => {
			const result = await GET_POSTS()
			return dispatch(result)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
