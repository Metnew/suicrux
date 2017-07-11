import styled from 'styled-components'
import {media} from 'styles/utils'

export const StyledFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryTextColor};
  height: 90px;
  box-shadow: inset 0 0 0 0 ${props => props.theme.primaryColorDark},
    0 2px 1px 0 ${props => props.theme.primaryColorDark};
  ${media.lg`
		margin-top: 30px;
	`};
`

export const StyledFooterInner = styled.div`padding: 15px 1rem;`
