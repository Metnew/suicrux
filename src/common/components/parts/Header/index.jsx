/**
 * @flow
 */
import React from 'react'
import {Icon} from 'semantic-ui-react'
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

const Header = ({title, toggleSidebar, isLoggedIn, isMobile}: Props) => {
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

export default Header
