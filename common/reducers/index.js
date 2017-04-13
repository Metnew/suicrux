export * as layout from './layout';
export * as inbox from './inbox'
export * as auth from './auth'
export * as loginCR from './login_component_reducer'
export * as dashboard from './dashboard'

import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
export const rootReducer = combineReducers({
    ...layout,
    ...inbox,
    ...auth,
    ...dashboard,
    ...loginCR,
    routing: routerReducer
})
