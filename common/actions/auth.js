import {
    login_API,
    register_API,
    recoverPassword_API,
    setLocalToken,
    resetLocalToken
} from 'api/AuthSvc';
import {resultOK} from 'api/utils';

export const LOGIN_AUTH_SUCCESS = 'LOGIN_AUTH_SUCCESS'
export const LOGIN_AUTH_FAIL = 'LOGIN_AUTH_FAIL'

export const LOGOUT_AUTH_SUCCESS = 'LOGOUT_AUTH_SUCCESS'

export const RECOVER_PASSWORD_AUTH_SUCCESS = 'RECOVER_PASSWORD_AUTH_SUCCESS'
export const RECOVER_PASSWORD_AUTH_FAIL = 'RECOVER_PASSWORD_AUTH_FAIL'

export const REGISTER_AUTH_SUCCESS = 'REGISTER_AUTH_SUCCESS'
export const REGISTER_AUTH_FAIL = 'REGISTER_AUTH_FAIL'

export function LOGIN_AUTH(data) {
    return async() => {
        let result = await login_API(data)
        if (!resultOK(result)) {
            return {type: LOGIN_AUTH_FAIL, error: result}
        }
        setLocalToken(result.token)
        return {type: LOGIN_AUTH_SUCCESS, result: result}
    }
}

export function LOGOUT_AUTH(data) {
    resetLocalToken();
    return {type: LOGOUT_AUTH_SUCCESS}
}

export function RECOVER_PASSWORD(data) {
    return async() => {
        let result = await recoverPassword_API(data)
        if (!resultOK(result)) {
            return {type: RECOVER_PASSWORD_AUTH_FAIL, error: result}
        }
        return {type: RECOVER_PASSWORD_AUTH_SUCCESS, result: result}
    }
}

export function REGISTER_AUTH(data) {
    return async() => {
        let result = await register_API(data)
        if (!resultOK(result)) {
            return {type: REGISTER_AUTH_FAIL, error: result}
        }
        return {type: REGISTER_AUTH_SUCCESS, result: result}
    }
}
