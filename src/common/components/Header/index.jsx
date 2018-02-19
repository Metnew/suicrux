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
import {getMetaRoutes} from 'routing'
import Headroom from 'react-headroom'

type Props = {
	title: string,
	toggleSidebar: () => void
}

const Header = ({title, toggleSidebar}: Props) => {
	return (
		<Headroom>
			<StyledHeader>
				<div className="header-inner">
					<span className="navicon" role="button" onClick={toggleSidebar}>
						<Icon name="content" />
					</span>
					<span className="page-title">{title}</span>
				</div>
			</StyledHeader>
		</Headroom>
	)
}

const mapStateToProps = (state, props) => {
	const {location: {pathname}} = props
	const {name: title} =
		_.find(getMetaRoutes(), a => matchPath(pathname, a))
	return {
		title
	}
}

const mapDispatchToProps = dispatch => ({
	toggleSidebar () {
		dispatch(TOGGLE_SIDEBAR)
	}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
