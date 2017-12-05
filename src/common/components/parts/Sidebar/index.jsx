// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Icon} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {LOGOUT_AUTH} from 'actions/auth'
import {getSidebarRoutes} from 'routing'
import {getLayoutState, getLayoutMobileStatuses} from 'selectors'
import {
	StyledSidebar,
	SidebarLogo,
	SidebarLogoContainer,
	SidebarItem,
	SidebarLogoutItem
} from './style'
import {Spacer} from 'styles/base'
import type {RouteItem} from 'types'

type Props = {
	open: boolean,
	logout: () => void,
	isMobile: boolean
}

class SidebarComponent extends Component<Props> {
	props: Props

	render () {
		const {open, logout, isMobile} = this.props
		const routing: RouteItem[] = getSidebarRoutes()

		const sidebarProps = {
			visible: open || !isMobile,
			as: Menu,
			vertical: true,
			icon: 'labeled',
			animation: 'push',
			width: 'thin'
		}

		const routes = routing.map((route, i) => {
			const {external, path, strict, exact, meta} = route
			const {icon, name} = meta
			// Props that are common for both "<a>" and "RR Link"
			const basicProps = {
				as: external ? 'a' : NavLink,
				link: true,
				[external ? 'href' : 'to']: path
			}

			// Is it's RR Link, then it needs additional props
			const externalProps = external
				? {}
				: {
					strict,
					exact,
					activeClassName: 'active'
				}

			// Summarize
			const propsMenuItem = {
				...externalProps,
				...basicProps
			}

			return (
				<SidebarItem key={i} {...propsMenuItem} icon>
					<Icon name={icon} /> {name}
				</SidebarItem>
			)
		})

		return (
			<StyledSidebar {...sidebarProps}>
				<SidebarLogoContainer href="https://github.com/Metnew/suicrux">
					<SidebarLogo alt="logo" shape="circular" centered />
				</SidebarLogoContainer>
				{routes}
				<Spacer />
				<SidebarLogoutItem onClick={logout}>
					<Icon name="sign out" />
					Logout
				</SidebarLogoutItem>
			</StyledSidebar>
		)
	}
}

const mapStateToProps = state => {
	const {sidebarOpened} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		open: sidebarOpened,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	logout () {
		dispatch(LOGOUT_AUTH())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)
