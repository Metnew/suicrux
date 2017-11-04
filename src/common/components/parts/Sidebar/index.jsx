// @flow
import React, {Component} from 'react'
import {Menu, Icon} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
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
	routing: Array<RouteItem>,
	isMobile: boolean
}

class SidebarComponent extends Component {
	props: Props

	render () {
		const {open, logout, routing, isMobile} = this.props

		const sidebarProps = {
			visible: open || !isMobile,
			as: Menu,
			vertical: true,
			icon: 'labeled',
			animation: 'push',
			width: 'thin'
		}

		const routes = routing.map((route, i) => {
			const {external, path, icon, name, strict, exact} = route
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

export default SidebarComponent
