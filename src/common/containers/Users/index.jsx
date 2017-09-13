/**
 * @flow
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import {Loader} from 'semantic-ui-react'
import {GET_USERS} from 'actions/users'
import UsersComponent from './components'
import {getEntitiesUsersState} from 'selectors'
import type {GlobalState} from 'reducers'

type Props = {
	users: Object,
	getUsers: () => void,
	isUsersLoaded: boolean,
	isUsersLoading: boolean,
	usersCount: number
}

class Users extends Component {
	props: Props
	componentDidMount () {
		this.getUsers()
	}

	getUsers () {
		this.props.getUsers()
	}

	render () {
		const {users, isUsersLoaded, isUsersLoading, usersCount} = this.props
		const props = {users, isUsersLoaded, isUsersLoading, usersCount}
		return (
			<div>
				<Helmet>
					<title>Noir:Users</title>
				</Helmet>
				{isUsersLoaded
					? <UsersComponent {...props} />
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState) {
	const usersState = getEntitiesUsersState(state)
	const users = usersState.entities
	const isUsersLoaded = usersState.isLoaded
	const isUsersLoading = usersState.isLoading
	const usersCount = usersState.count

	return {users, isUsersLoaded, isUsersLoading, usersCount}
}

const mapDispatchToProps = dispatch => ({
	getUsers () {
		dispatch(GET_USERS())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
