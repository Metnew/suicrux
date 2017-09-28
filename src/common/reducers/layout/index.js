// @flow
import {
	UI_OPEN_SIDEBAR,
	UI_CLOSE_SIDEBAR,
	UI_WINDOW_RESIZE
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
//
import type {LOCATION_CHANGE_TYPE} from 'actions/common'
import type {
	UI_OPEN_SIDEBAR_TYPE,
	UI_CLOSE_SIDEBAR_TYPE,
	UI_WINDOW_RESIZE_TYPE
} from 'actions/layout'

export type State = {
	sidebarOpened: boolean,
	isMobile: boolean,
	isMobileXS: boolean,
	isMobileSM: boolean
}

type Action =
	| UI_OPEN_SIDEBAR_TYPE
	| UI_CLOSE_SIDEBAR_TYPE
	| UI_WINDOW_RESIZE_TYPE
	| LOCATION_CHANGE_TYPE

export const initialState: State = {
	sidebarOpened: false,
	isMobile: false,
	isMobileXS: false,
	isMobileSM: false
}

export function layout (state: State = initialState, action: Action): State {
	const computeMobileStatuses = (innerWidth: number) => {
		const isMobile: boolean = innerWidth < 1025 // 1024px - is the main breakpoint in ui
		const isMobileXS: boolean = innerWidth < 481
		const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
		return {isMobileSM, isMobileXS, isMobile}
	}
	switch (action.type) {
	case UI_WINDOW_RESIZE: {
		const {innerWidth} = action.payload
		const mobileStates = computeMobileStatuses(innerWidth)
		return {
			...state,
			...mobileStates
		}
	}
	case UI_OPEN_SIDEBAR:
		return {
			...state,
			sidebarOpened: true
		}
	case LOCATION_CHANGE:
	case UI_CLOSE_SIDEBAR:
		return {
			...state,
			sidebarOpened: false
		}
	default:
		return state
	}
}
