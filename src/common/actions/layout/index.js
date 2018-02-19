// @flow
export const UI_TOGGLE_SIDEBAR = 'UI_TOGGLE_SIDEBAR'
export const UI_WINDOW_RESIZE = 'UI_WINDOW_RESIZE'

export const TOGGLE_SIDEBAR = ({
	type: UI_TOGGLE_SIDEBAR
})

export const WINDOW_RESIZE = (innerWidth: number) => ({
	type: UI_WINDOW_RESIZE,
	payload: {
		innerWidth
	}
})
