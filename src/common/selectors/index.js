// @flow
import {createSelector} from 'reselect'

export const isLoaded = state => state.fetchStatus === 'loaded'
export const getLayoutState = state => state.layout
export const getEntitiesLinksState = state => state.entities.links

export const getWindowInnerWidth = (window: Object): number => {
	const defaultWindowInnerWidth = 1025
	return window && window.innerWidth
		? window.innerWidth
		: defaultWindowInnerWidth
}

export const getLayoutMobileStatuses = createSelector(
	getLayoutState,
	({innerWidth}) => {
		const isMobile: boolean = innerWidth < 1025 // 1024px - breakpoint
		const isMobileXS: boolean = innerWidth < 481
		const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
		return {isMobileSM, isMobileXS, isMobile}
	}
)
