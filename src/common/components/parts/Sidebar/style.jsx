import {Menu, Sidebar, Image as ImageComponent} from 'semantic-ui-react'
import styled from 'styled-components'
import {media} from 'styles/utils'

// ${'combine sidebar with dimmer, when sidebar is visible on mobile'}
//   color: ${props => props.theme.primaryColorText}!important;
// ${'' /* background-color: ${props => props.theme.accentColor}!important; */}
export const StyledSidebar = styled(Sidebar)`
  z-index: 111 !important;
  display: flex !important;
  border: none !important;
`
//
export const SidebarLogo = styled(ImageComponent)`
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
`
//
export const SidebarLogoContainer = styled.a`
  background-color: ${props => props.theme.primaryColorDark};
  padding: 25px;
  text-align: center;
  ${media.md`
    padding: 25px;
  `};
	${media.lg`
    padding: 20px;
  `};
`
// Color: ${props => props.theme.primaryColorText}!important;
export const SidebarItem = styled(Menu.Item)``
//
export const SidebarLogoutItem = SidebarItem.extend`
  cursor: pointer;
  border-top: 1px solid rgba(34, 36, 38, 0.15) !important;
`
