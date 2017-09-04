/**
 * @flow
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Popup} from 'semantic-ui-react'
import {isEqual} from 'lodash'
import {
	StyledHeader,
	HeaderInner,
	Navicon,
	PageTitle,
	HeaderButton
} from './style'
import {Spacer} from 'styles/base'

type Props = {
	title: string,
	toggleSidebar: () => void,
	isLoggedIn: boolean,
	isMobile: boolean
}

class Header extends React.Component {
	props: Props
	shouldComponentUpdate (nextProps: Props) {
		return !isEqual(nextProps, this.props)
	}

	render () {
		const {title, toggleSidebar, isLoggedIn, isMobile} = this.props

		return (
			<StyledHeader>
				<HeaderInner>
					{isLoggedIn &&
						isMobile &&
						<Navicon onClick={toggleSidebar}>
							<Icon name="content" />
						</Navicon>}
					<PageTitle>
						{title}
					</PageTitle>
					<Spacer />
					<Popup
						trigger={
							<HeaderButton
								id="header-button"
								icon
								as={'a'}
								aria-label="github-header-link-button"
								href="https://github.com/Metnew/react-semantic.ui-starter"
								basic
								circular
							>
								<Icon name="github" size="large" link fitted />
							</HeaderButton>
						}
						content={`RSUIS on @Github`}
						inverted
					/>
				</HeaderInner>
			</StyledHeader>
		)
	}
}

export default Header
