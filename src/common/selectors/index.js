// @flow
import {createSelector} from 'reselect'
import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesLinksState} from 'reducers/links'
import type {GlobalState} from 'reducers'

export const getAuthState = (state: GlobalState): AuthState => state.auth
export const getLayoutState = (state: GlobalState): LayoutState => state.layout
export const getEntitiesLinksState = (state: GlobalState): EntitiesLinksState =>
	state.entities.links

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
