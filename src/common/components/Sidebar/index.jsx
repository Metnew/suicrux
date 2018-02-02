// @flow
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Menu, Icon, Image} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'
import {getLayoutState, getLayoutMobileStatuses} from 'selectors'
import {StyledSidebar} from './style'

type Props = {
	open: boolean,
	isMobile: boolean
}

class SidebarComponent extends Component<Props> {
	props: Props

	render () {
		const {open, isMobile} = this.props
		const routing: any[] = [
			{
				path: '/',
				name: 'Dashboard',
				icon: 'newspaper'
			},
			{
				path: '/links',
				name: 'Links',
				icon: 'bookmark'
			},
			{
				path: 'https://github.com/Metnew/suicrux',
				name: 'Github',
				icon: 'github'
			}
		]

		const sidebarProps = {
			visible: open || !isMobile,
			as: Menu,
			vertical: true,
			icon: 'labeled',
			animation: 'push',
			width: 'thin'
		}

		const routes = routing.map((route, i) => {
			const {path, icon, name} = route
			// external links cannot use <Link> componen
			const external = path.split('://').length > 1
			const linkProps = external
				? {href: path, rel: 'noopener', as: 'a'}
				: {activeClassName: 'active', to: path, as: NavLink}

			return (
				<Menu.Item key={i} {...linkProps} icon link>
					<Icon name={icon} /> {name}
				</Menu.Item>
			)
		})

		return (
			<StyledSidebar {...sidebarProps}>
				<a className="logo-container" href="https://github.com/Metnew/suicrux">
					<Image
						src={require('public/Logo.png')}
						alt="logo"
						shape="circular"
						centered
					/>
				</a>
				{routes}
			</StyledSidebar>
		)
	}
}

const mapStateToProps = state => {
	// import location to update sidebar active link on location change
	const {location} = state.routing
	const {sidebarOpened: open} = getLayoutState(state)
	const {isMobile} = getLayoutMobileStatuses(state)

	return {
		open,
		location,
		isMobile
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)
