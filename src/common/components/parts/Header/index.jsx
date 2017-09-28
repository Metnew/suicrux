/**
 * @flow
 */
import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import {isEqual} from 'lodash'
// import {FormattedMessage} from 'react-intl'
import {
	StyledHeader,
	HeaderInner,
	Navicon,
	PageTitle
	// HeaderButton
} from './style'
import {Spacer} from 'styles/base'
import Headroom from 'react-headroom'

type Props = {
	title: string,
	toggleSidebar: () => void,
	isLoggedIn: boolean,
	isMobile: boolean
}

class Header extends Component {
	props: Props
	shouldComponentUpdate (nextProps: Props) {
		return !isEqual(nextProps, this.props)
	}

	render () {
		const {title, toggleSidebar, isLoggedIn, isMobile} = this.props

		return (
			<Headroom>
				<StyledHeader>
					<HeaderInner>
						{isLoggedIn &&
							isMobile && (
								<Navicon onClick={toggleSidebar}>
									<Icon name="content" />
								</Navicon>
							)}
						<PageTitle>{title}</PageTitle>
						<Spacer />
					</HeaderInner>
				</StyledHeader>
			</Headroom>
		)
	}
}

export default Header
