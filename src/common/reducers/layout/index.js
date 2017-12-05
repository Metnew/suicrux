// @flow
import {
	UI_TOGGLE_SIDEBAR,
	UI_WINDOW_RESIZE
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
import type {LOCATION_CHANGE_TYPE} from 'actions/common'
import type {
	UI_TOGGLE_SIDEBAR_TYPE,
	UI_WINDOW_RESIZE_TYPE
} from 'actions/layout'

export type State = {
	sidebarOpened: boolean,
	innerWidth?: number
}

type Action =
	| UI_TOGGLE_SIDEBAR_TYPE
	| UI_WINDOW_RESIZE_TYPE
	| LOCATION_CHANGE_TYPE

export const initialState: State = {
	sidebarOpened: false
}

export function layout (state: State = initialState, action: Action): State {
	switch (action.type) {
	case UI_WINDOW_RESIZE: {
		const {innerWidth} = action.payload
		return {
			...state,
			innerWidth
		}
	}
	case UI_TOGGLE_SIDEBAR:
		return {
			...state,
			sidebarOpened: !state.sidebarOpened
		}
	case LOCATION_CHANGE:
		return {
			...state,
			sidebarOpened: false
		}
	default:
		return state
	}
}
