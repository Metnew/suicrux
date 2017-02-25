import {LOCATION_CHANGE} from 'actions/common';
import {isLoggedIn} from 'api/AuthSvc';
import {
    LOGIN_AUTH_FAIL,
    LOGIN_AUTH_SUCCESS,
    LOGOUT_AUTH_SUCCESS
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
                    return {
                        ...state,
                        loggedIn: true
                    }
                } else {
                    return {
                        ...state,
                        loggedIn: false
                    }
                }

            }

        case LOGOUT_AUTH_SUCCESS:
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
        default:
            return state
    }
}
