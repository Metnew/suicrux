import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {Loader} from 'semantic-ui-react'
import {GET_USERS} from 'actions/users'
import UsersComponent from './components'

class Users extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		getUsers: PropTypes.func.isRequired,
		isUsersLoaded: PropTypes.bool.isRequired,
		isUsersLoading: PropTypes.bool.isRequired,
		usersCount: PropTypes.number.isRequired
	}

	componentWillMount () {
		this.props.getUsers()
	}

	render () {
		const {users, isUsersLoaded, isUsersLoading, usersCount} = this.props
		const props = {users, isUsersLoaded, isUsersLoading, usersCount}
		return (
			<div>
				<Helmet>
					<title>React-Semantic.UI-Starter: Users</title>
				</Helmet>
				{isUsersLoaded
					? <UsersComponent {...props} />
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state) {
	const users = state.entities.users.entities
	const isUsersLoaded = state.entities.users.isLoaded
	const isUsersLoading = state.entities.users.isLoading
	const usersCount = state.entities.users.count

	return {users, isUsersLoaded, isUsersLoading, usersCount}
}

function mapDispatchToProps (dispatch) {
	return {
		getUsers: async () => {
			const result = await GET_USERS()
			return dispatch(result)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
