import {Menu, Sidebar} from 'semantic-ui-react'
import styled from 'styled-components'
import {media} from 'styles/utils'
import Logo from 'components/elements/Logo'

// ${'combine sidebar with dimmer, when sidebar is visible on mobile'}
//   color: ${props => props.theme.primaryColorText}!important;
// ${'' /* background-color: ${props => props.theme.accentColor}!important; */}
export const StyledSidebar = styled(Sidebar)`
	z-index: 111 !important;
	display: flex !important;
	border: none !important;
	position: fixed !important;
`
//
export const SidebarLogo = styled(Logo)`margin: 5px;`
//
export const SidebarLogoContainer = styled.a`
	background-color: ${props => props.theme.accentColor};
	color: ${props => props.theme.accentColor};
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
	padding: 25px;
	text-align: center;
	${media.md`
    padding: 25px;
  `};
	${media.lg`
    padding: 20px;
  `};
`
export const SidebarItem = styled(Menu.Item)``
export const SidebarLogoutItem = styled(SidebarItem)`
	cursor: pointer;
	border-top: 1px solid rgba(34, 36, 38, 0.15) !important;
`
