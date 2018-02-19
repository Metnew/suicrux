// @flow
export const UI_TOGGLE_SIDEBAR = 'UI_TOGGLE_SIDEBAR'
export const UI_WINDOW_RESIZE = 'UI_WINDOW_RESIZE'

<<<<<<< HEAD
export const TOGGLE_SIDEBAR = () => ({
=======
export const TOGGLE_SIDEBAR = ({
>>>>>>> feat/3.0-release
	type: UI_TOGGLE_SIDEBAR
})

export const WINDOW_RESIZE = (innerWidth: number) => ({
	type: UI_WINDOW_RESIZE,
	payload: {
		innerWidth
	}
})
<<<<<<< HEAD

export type UI_TOGGLE_SIDEBAR_TYPE = {type: 'UI_TOGGLE_SIDEBAR'}
export type UI_WINDOW_RESIZE_TYPE = {
	type: 'UI_WINDOW_RESIZE',
	payload: {innerWidth: number}
}
=======
>>>>>>> feat/3.0-release
