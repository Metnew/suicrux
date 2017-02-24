import {GET_STATISTICS_SUCCESS, GET_STATISTICS_FAIL} from 'actions/dashboard'

const initial_state = {
    statistics: []
}

export function dashboard(state = initial_state, action) {
    switch (action.type) {
        case GET_STATISTICS_SUCCESS:
            return {
                ...state,
                statistics: action.result
            }
        case GET_STATISTICS_FAIL:
            return state
        default:
            return state
    }
}
