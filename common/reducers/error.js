import {
    SEND_ERROR_TO_SERVER_FAIL,
    SEND_ERROR_TO_SERVER_SUCCESS
} from 'actions/error';

let initialState = {}

export function error(state = initialState, action) {
    switch (action.type) {
        case SEND_ERROR_TO_SERVER_FAIL: {
            return {...state}
        }
        case SEND_ERROR_TO_SERVER_SUCCESS: {
            return {...state}
        }
    }
}
