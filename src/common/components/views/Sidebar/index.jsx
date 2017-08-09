import React, {Component} from 'react'
import PropTypes from 'prop-types'
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

export default class SidebarComponent extends Component {
	static propTypes = {
		open: PropTypes.bool.isRequired,
		logout: PropTypes.func.isRequired,
		routing: PropTypes.array.isRequired,
		isMobile: PropTypes.bool.isRequired
	}

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
			// Props that are applicable for both "plain link, i.e. <a>" and "RR Link"
			const basicProps = {
				as: external ? 'a' : NavLink,
				link: true,
				[external ? 'href' : 'to']: path
			}

			// Is it's RR Link, then it has more props
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

		// const logoImg = process.env.BROWSER
		// 	? require('images/logo.png')
		// 	: require('images/logo.png').preSrc
		//
		const logoImg = require('images/logo.png')

		return (
			<StyledSidebar {...sidebarProps}>
				<SidebarLogoContainer href="https://github.com/Metnew/react-semantic.ui-starter">
					<SidebarLogo src={logoImg} alt="logo" shape="circular" centered />
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
