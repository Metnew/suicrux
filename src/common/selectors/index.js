// @flow
import {createSelector} from 'reselect'

export const isLoaded = state => state.fetchStatus === 'loaded'
export const getLayoutState = state => state.layout
export const getEntitiesLinksState = state => state.entities.links

export const computeLayoutMobileStatuses = ({innerWidth}) => {
	const isMobile: boolean = innerWidth < 993
	const isMobileXS: boolean = innerWidth < 481
	const isMobileSM: boolean = innerWidth > 480 && innerWidth < 767
	return {isMobileSM, isMobileXS, isMobile}
}

export const getLayoutMobileStatuses = createSelector(
	getLayoutState, computeLayoutMobileStatuses
)
