import React, {Component} from 'react';
import {connect} from 'react-redux';
import {LOGIN_AUTH, RECOVER_PASSWORD_AUTH, REGISTER_AUTH} from 'actions/auth'
import LoginComponent from './components/LoginComponent'
@connect(mapStateToProps, mapDispatchToProps)
export default class Login extends Component {
    constructor(props){
        super(props)
    }

    static propTypes = {
        login: React.PropTypes.func,
        register: React.PropTypes.func,
        forgetPassword: React.PropTypes.func,
        componentState: React.PropTypes.object // login component state
    }

    componentWillMount() {}

    render() {
        let {login, forgetPassword, register, componentState} = this.props;

        return (
            <LoginComponent login={login} componentState={componentState}  forgetPassword={forgetPassword} register={register}/>
        )
    }
}


function mapStateToProps(state) {
    return {
        // state.login_component
        componentState: state.loginCR
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: async (data) => {
            let result = await dispatch(LOGIN_AUTH(data))
            return dispatch(result)
        },
        forgetPassword: async (data) => {
            let result = await dispatch(RECOVER_PASSWORD_AUTH(data))
            return dispatch(result)
        },
        register: async(data) => {
            let result = await dispatch(REGISTER_AUTH(data))
            return dispatch(result)
        }
    }
}
