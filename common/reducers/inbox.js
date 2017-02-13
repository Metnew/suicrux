import {GET_INBOX_SUCCESS, GET_INBOX_FAIL} from 'actions/inbox'
import {LOCATION_CHANGE} from 'actions/common'

const initialState = {
    isDataLoading: true,
    errorLoadingConversations: false,
    conversations: []
}

export function inbox(state = initialState, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
        // look at Header Inbox icon
            if (action.payload.pathname === '/inbox') {
                return {...state}
            }
            return initialState
        case GET_INBOX_SUCCESS:
            return {
                ...state,
                conversations: action.result
            }
        case GET_INBOX_FAIL:
            return {
                ...state,
                errorLoadingConversations: true,
                conversations: []
            }
        default:
            return state
    }
}
