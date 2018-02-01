/**
 * @flow
 */
import React from 'react'
import {connect} from 'react-redux'
import {Icon} from 'semantic-ui-react'
import {withRouter, matchPath} from 'react-router'
import _ from 'lodash'
import {TOGGLE_SIDEBAR} from 'actions/layout'
import {StyledHeader} from './style'
import {Spacer} from 'styles/base'
import {getMetaRoutes} from 'routing'
import {getAuthState, getLayoutMobileStatuses} from 'selectors'
import Headroom from 'react-headroom'

type Props = {
	title: string,
	toggleSidebar: () => void,
	isLoggedIn: boolean,
	isMobile: boolean
}

const Header = ({title, toggleSidebar, isLoggedIn, isMobile}: Props) => {
	return (
		<Headroom>
			<StyledHeader>
				<div className="header-inner">
					{isLoggedIn &&
						isMobile && (
							<span className="navicon" role="button" onClick={toggleSidebar}>
								<Icon name="content" />
							</span>
						)}
					<span className="page-title">{title}</span>
					<Spacer />
				</div>
			</StyledHeader>
		</Headroom>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const currentRoute =
		_.find(getMetaRoutes(), a => matchPath(pathname, a)) || {}
	const title = currentRoute.meta.name
	const {isLoggedIn} = getAuthState(state)
	const {isMobile} = getLayoutMobileStatuses(state)
	return {
		title,
		isLoggedIn,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR())
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
