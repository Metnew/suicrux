import React, {Component} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Helmet} from 'react-helmet'
import {Loader} from 'semantic-ui-react'
//
import UserItemComponent from './components'
import {GET_USERS, GET_USERS_PENDING} from 'actions'

class UserItem extends Component {
 static propTypes = {
   user: PropTypes.object,
   userId: PropTypes.string,
   getUsers: PropTypes.func,
   isLoaded: PropTypes.bool,
   isLoading: PropTypes.bool
 }

 componentWillMount () {
   const {isLoaded, userId} = this.props
   if (!isLoaded) {
     this.props.getUsers(userId)
   }
 }

 render () {
   const {user, isLoaded} = this.props
   const props = {user, isLoaded}
   return (
     <div>
       <Helmet>
         <title>
           {`React-Semantic-UI-Starter: ${isLoaded ? `${user.name}` : 'User'}`}
         </title>
       </Helmet>
       {isLoaded
         ? <UserItemComponent {...props} />
         : <Loader active>Loading...</Loader>}
     </div>
   )
 }
}

function mapStateToProps (state, props) {
  const {users} = state.entities
  const {id} = props.match.params
  const {entities, isLoaded, isLoading} = users
  const user = entities ? entities[id] : {}
  return {
    user,
    userId: id,
    isLoading,
    isLoaded
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUsers: async id => {
      dispatch({type: GET_USERS_PENDING})
      const result = await GET_USERS(id)
      return dispatch(result)
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserItem)
)
