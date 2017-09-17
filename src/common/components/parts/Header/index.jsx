/**
 * @flow
 */
import React, {Component} from 'react'
import {Icon, Dropdown, Flag} from 'semantic-ui-react'
import {isEqual} from 'lodash'
// import {FormattedMessage} from 'react-intl'
import {
	StyledHeader,
	HeaderInner,
	Navicon,
	PageTitle,
	HeaderButton
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
		const options = [{key: 1, text: 'EN'}, {key: 2, text: 'RU'}]
		const selectedLanguage = {
			text: 'ru',
			icon: 'ru'
		}

		return (
			<Headroom>
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
						<Dropdown
							text={selectedLanguage.text}
							icon={<Flag name="ru" />}
							floating
							labeled
							button
							className="icon"
						>
							<Dropdown.Menu>
								<Dropdown.Header icon="globe" content="Select Language" />
								<Dropdown.Divider />
								<Dropdown.Item flag="us" text="EN" />
								<Dropdown.Item flag="ru" text="RU" />
							</Dropdown.Menu>
						</Dropdown>
						{/* <Flag name="" /> */}
					</HeaderInner>
				</StyledHeader>
			</Headroom>
		)
	}
}

export default Header
