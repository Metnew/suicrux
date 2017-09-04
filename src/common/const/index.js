// @flow
// Your const values live here.
const defaultWindowInnerWidth = 1025
export const getWindowInnerWidth = (window: Object): number => {
	return window && window.innerWidth
		? window.innerWidth
		: defaultWindowInnerWidth
}
