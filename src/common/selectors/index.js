// @flow
import type {State as AuthState} from 'reducers/auth'
import type {State as LayoutState} from 'reducers/layout'
import type {State as EntitiesLinksState} from 'reducers/links'
import type {GlobalState} from 'reducers'

export const getAuthState = (state: GlobalState): AuthState => state.me.auth
export const getLayoutState = (state: GlobalState): LayoutState => state.layout
export const getEntitiesLinksState = (state: GlobalState): EntitiesLinksState => state.entities.links

const defaultWindowInnerWidth = 1025
export const getWindowInnerWidth = (window: Object): number => {
	return window && window.innerWidth
		? window.innerWidth
		: defaultWindowInnerWidth
}
