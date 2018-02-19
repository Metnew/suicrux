// @flow
import {
	UI_TOGGLE_SIDEBAR,
	UI_WINDOW_RESIZE
} from 'actions/layout'
import {LOCATION_CHANGE} from 'actions/common'
<<<<<<< HEAD
import type {LOCATION_CHANGE_TYPE} from 'actions/common'
import type {
	UI_TOGGLE_SIDEBAR_TYPE,
	UI_WINDOW_RESIZE_TYPE
} from 'actions/layout'
=======
import {computeLayoutMobileStatuses} from 'selectors'
>>>>>>> feat/3.0-release

export type State = {
	sidebarOpened: boolean,
	innerWidth?: number
}

<<<<<<< HEAD
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
=======
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
>>>>>>> feat/3.0-release
		}
	}
	case UI_TOGGLE_SIDEBAR:
		return {
			...state,
			sidebarOpened: !state.sidebarOpened
		}
	case LOCATION_CHANGE:
<<<<<<< HEAD
=======
		const {isMobile} = computeLayoutMobileStatuses(state)
>>>>>>> feat/3.0-release
		return {
			...state,
			sidebarOpened: !isMobile
		}
	default:
		return state
	}
}
