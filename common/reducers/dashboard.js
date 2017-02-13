import {GET_NOTIFICATIONS_SUCCESS, GET_NOTIFICATIONS_FAIL, GET_STATISTICS_SUCCESS, GET_STATISTICS_FAIL} from '../actions/dashboard'

const initial_state = {
    notifications: [],
    statistics: []
}

export function dashboard(state = initial_state, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.result
            }
        case GET_NOTIFICATIONS_FAIL:
            return {
                ...state,
                notifications: action.result
            }
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                statistics: action.result
            }
        case GET_STATISTICS_FAIL:
            return {
                ...state,
                statistics: action.result
            }
        default:
            return state
    }
}
