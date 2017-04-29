import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {LOGIN_AUTH, RECOVER_PASSWORD_AUTH, REGISTER_AUTH} from 'actions/auth'
import LoginComponent from './components/LoginComponent'

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    componentState: PropTypes.object.isRequired // login component state
  }

  render () {
    let props = this.props
    return <LoginComponent {...props} />
  }
}

function mapStateToProps (state) {
  return {
    // state.login_component_reducer
    componentState: state.loginCR
  }
}

function mapDispatchToProps (dispatch) {
  return {
    login: async data => {
      let result = await dispatch(LOGIN_AUTH(data))
      return dispatch(result)
    },
    forgetPassword: async data => {
      let result = await dispatch(RECOVER_PASSWORD_AUTH(data))
      return dispatch(result)
    },
    register: async data => {
      let result = await dispatch(REGISTER_AUTH(data))
      return dispatch(result)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
