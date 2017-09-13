// @flow
import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import {Loader} from 'semantic-ui-react'
//
import UserItemComponent from './components'
import {GET_USERS} from 'actions/users'
import {getEntitiesUsersState} from 'selectors'
import type {UserItem as UserItemType} from 'types'
import type {GlobalState} from 'reducers'

type Props = {
	user: UserItemType,
	userId: string,
	getUsers: (id: string) => void,
	isLoaded: boolean,
	isLoading: boolean
}

class UserItem extends Component {
	props: Props

	componentDidMount () {
		const {isLoaded, userId} = this.props
		if (!isLoaded) {
			this.getUsers(userId)
		}
	}

	getUsers (id: string) {
		this.props.getUsers(id)
	}

	render () {
		const {user, isLoaded} = this.props
		return (
			<div>
				<Helmet>
					<title>
						{`Noir:${isLoaded ? `${user.name}` : 'User'}`}
					</title>
				</Helmet>
				{isLoaded
					? <UserItemComponent user={user} />
					: <Loader active>Loading...</Loader>}
			</div>
		)
	}
}

function mapStateToProps (state: GlobalState, props) {
	const users = getEntitiesUsersState(state)
	const userId: string = props.match.params.id
	const {entities, isLoaded, isLoading} = users
	const user = entities ? entities[userId] : {}
	return {
		user,
		userId,
		isLoading,
		isLoaded
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getUsers (id: string) {
		dispatch(GET_USERS(id))
	}
})

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(UserItem)
)
