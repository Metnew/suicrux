// @flow
import {
	UI_TOGGLE_SIDEBAR,
	UI_WINDOW_RESIZE
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
import {computeLayoutMobileStatuses} from 'selectors'

export type State = {
	sidebarOpened: boolean,
	innerWidth?: number
}

// NOTE: sidebar is opened by default and rendered as visible on server
export const initialState: State = {
	sidebarOpened: true,
	innerWidth: 993
}

export function layout (state: State = initialState, action): State {
	switch (action.type) {
	case UI_WINDOW_RESIZE: {
		const {innerWidth} = action.payload
		const {isMobile} = computeLayoutMobileStatuses({innerWidth})

		return {
			innerWidth,
			sidebarOpened: !isMobile
		}
	}
	case UI_TOGGLE_SIDEBAR:
		return {
			...state,
			sidebarOpened: !state.sidebarOpened
		}
	case LOCATION_CHANGE:
		const {isMobile} = computeLayoutMobileStatuses(state)
		return {
			...state,
			sidebarOpened: !isMobile
		}
	default:
		return state
	}
}
