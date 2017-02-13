import {LOCATION_CHANGE} from 'actions/common';
import {isLoggedIn} from 'api/AuthSvc';
import {
    LOGIN_AUTH_FAIL,
    LOGIN_AUTH_SUCCESS,
    LOGOUT_AUTH_SUCCESS,
    REGISTER_AUTH_FAIL,
    REGISTER_AUTH_SUCCESS,
    RECOVER_PASSWORD_AUTH_FAIL,
    RECOVER_PASSWORD_AUTH_SUCCESS
} from 'actions/auth'

let initialState = {
    loggedIn: isLoggedIn()
}
export function auth(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            {
                let loggedIn = isLoggedIn();
                if (action.payload === '/auth') {
                    return {
                        ...state
                    }
                }
                if (loggedIn) {
                    console.log('USER IS LOGGED IN')
                    return {
                        ...state,
                        loggedIn: true
                    }
                } else {
                    console.log('USER IS NOT LOGGED IN')
                    return {
                        ...state,
                        loggedIn: false
                    }
                }

            }

        case LOGOUT_AUTH_SUCCESS:
        console.log('LOGOUT')
            {
                return {
                    ...state,
                    loggedIn: false
                }
            }

        case LOGIN_AUTH_FAIL:
            {
                return {
                    ...state,
                    loggedIn: false
                }
            }
        case LOGIN_AUTH_SUCCESS:
            {
                return {
                    ...state,
                    loggedIn: true
                }
            }

        case REGISTER_AUTH_FAIL:
            {
                return {
                    ...state,
                    loggedIn: true
                }
            }
        case REGISTER_AUTH_SUCCESS:
            {
                return {
                    ...state,

                    loggedIn: true
                }
            }

        case RECOVER_PASSWORD_AUTH_FAIL:
            {
                return {
                    ...state,
                    loggedIn: true
                }
            }
        case RECOVER_PASSWORD_AUTH_SUCCESS:
            {
                return {
                    ...state,
                    loggedIn: true
                }
            }
        default:
            return state
    }
}
