// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Icon, Image} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {LOGOUT_AUTH} from 'actions/auth'
import {getSidebarRoutes} from 'routing'
import {getLayoutState, getLayoutMobileStatuses} from 'selectors'
import {StyledSidebar} from './style'
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
				<Menu.Item key={i} {...propsMenuItem} icon>
					<Icon name={icon} /> {name}
				</Menu.Item>
			)
		})

		return (
			<StyledSidebar {...sidebarProps}>
				<a className="logo-container" href="https://github.com/Metnew/suicrux">
					<Image src={require('public/Logo.png')} alt="logo" shape="circular" centered />
				</a>
				{routes}
				<Spacer />
				<Menu.Item className="logout-item" onClick={logout}>
					<Icon name="sign out" />
					Logout
				</Menu.Item>
			</StyledSidebar>
		)
	}
}

const mapStateToProps = state => {
	const {sidebarOpened: open} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		open,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({
	logout () {
		dispatch(LOGOUT_AUTH())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)
