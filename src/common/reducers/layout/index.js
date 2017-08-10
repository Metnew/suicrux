import {
	UI_OPEN_SIDEBAR,
	UI_CLOSE_SIDEBAR,
	UI_WINDOW_RESIZE,
	LOCATION_CHANGE,
	APPLICATION_INIT
} from 'actions'

export const initialState = {
	sidebarOpened: false,
	isMobile: false,
	isMobileXS: false,
	isMobileSM: false
}

export function layout (state = initialState, action) {
	const computeMobileStatuses = () => {
		const innerWidth = process.env.BROWSER ? window.innerWidth : 1024
		const isMobile = innerWidth < 1025 // 1024px - is the main breakpoint in UI
		const isMobileXS = innerWidth < 481
		const isMobileSM = innerWidth > 480 && innerWidth < 767
		return {isMobileSM, isMobileXS, isMobile}
	}
	switch (action.type) {
	case APPLICATION_INIT:
	case UI_WINDOW_RESIZE: {
		const {isMobile, isMobileSM, isMobileXS} = computeMobileStatuses()
		return {
			...state,
			isMobile,
			isMobileSM,
			isMobileXS
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
